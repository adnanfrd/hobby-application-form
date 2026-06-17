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
    const { name, email, role, answers, score, readinessLabel } = await req.json();

    if (!name || !email || typeof score !== "number" || !readinessLabel) {
      return jsonResponse({ error: "Name, email, score, and readiness label are required" }, 400);
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
      .from("quiz_responses")
      .insert({
        name,
        email,
        role: role || null,
        answers: answers || {},
        score,
        readiness_label: readinessLabel,
      })
      .select("id,review_status,created_at")
      .single();

    if (error) throw error;

    return jsonResponse({ message: "Quiz response saved successfully", data }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    console.error("Quiz function error:", error);
    return jsonResponse({ error: "Failed to save quiz response" }, 500);
  }
});
