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

const requiredFields = [
  "first_name",
  "last_name",
  "email",
  "linkedin",
  "job_title",
  "company",
  "experience",
  "idea_description",
  "idea_age",
  "unfair_advantage",
  "blocker",
  "outcome",
  "hours_per_week",
  "tier",
  "prior_experience",
  "referral_source",
] as const;

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
    const payload = await req.json();
    const missingField = requiredFields.find((field) => !payload[field]);

    if (missingField || !payload.commitment_confirmed) {
      return jsonResponse({ error: "Please complete all required application fields" }, 400);
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
      .from("application_responses")
      .insert({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        linkedin: payload.linkedin,
        job_title: payload.job_title,
        company: payload.company,
        experience: payload.experience,
        idea_description: payload.idea_description,
        idea_age: payload.idea_age,
        unfair_advantage: payload.unfair_advantage,
        blocker: payload.blocker,
        outcome: payload.outcome,
        hours_per_week: payload.hours_per_week,
        tier: payload.tier,
        prior_experience: payload.prior_experience,
        anything_else: payload.anything_else || null,
        referral_source: payload.referral_source,
        commitment_confirmed: Boolean(payload.commitment_confirmed),
      })
      .select("id,review_status,created_at")
      .single();

    if (error) throw error;

    return jsonResponse({ message: "Application submitted successfully", data }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    console.error("Application function error:", error);
    return jsonResponse({ error: "Failed to submit application" }, 500);
  }
});
