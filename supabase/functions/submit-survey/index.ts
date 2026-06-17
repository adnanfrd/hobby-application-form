import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function getSupabaseAdminKey() {
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (serviceRoleKey) return serviceRoleKey;

  const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (!secretKeys) return null;

  try {
    return JSON.parse(secretKeys).default as string | undefined;
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { email, name, company, role, ideaStage, biggestChallenge, heardFrom, additionalNotes } = await req.json();

    if (!email || !name) {
      return jsonResponse({ error: "Email and name are required" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAdminKey = getSupabaseAdminKey();

    if (!supabaseUrl || !supabaseAdminKey) {
      return jsonResponse({ error: "Supabase admin credentials are not configured" }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseAdminKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("survey_responses")
      .insert({
        email,
        name,
        company: company || null,
        role: role || null,
        idea_stage: ideaStage || null,
        biggest_challenge: biggestChallenge || null,
        heard_from: heardFrom || null,
        additional_notes: additionalNotes || null,
      })
      .select("id,review_status,created_at")
      .single();

    if (error) throw error;

    await supabase
      .from("newsletter_subscribers")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

    return jsonResponse({ message: "Survey submitted successfully", data }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    console.error("Survey function error:", error);
    return jsonResponse({ error: "Failed to submit survey" }, 500);
  }
});
