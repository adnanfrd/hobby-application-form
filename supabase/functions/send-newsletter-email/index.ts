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

interface NewsletterRequest {
  email?: string;
  name?: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function normalizeEmail(email: unknown) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSupabaseAdminKey() {
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (serviceRoleKey) {
    return serviceRoleKey;
  }

  const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");

  if (!secretKeys) {
    return null;
  }

  try {
    return JSON.parse(secretKeys).default as string | undefined;
  } catch {
    return null;
  }
}

const emailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Hobby Accelerator</title>
</head>
<body style="margin:0;background:#0a0e27;color:#e8e8e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#121636;border:1px solid #2a2d4a;border-radius:12px;overflow:hidden;">
    <div style="background:#ffa500;padding:40px 20px;text-align:center;">
      <h1 style="font-size:32px;font-weight:700;color:#0a0e27;margin:0;font-family:'Courier New',monospace;">Hobby</h1>
    </div>
    <div style="padding:40px 30px;">
      <p style="font-size:18px;margin:0 0 20px;color:#e8e8e8;">Hey <strong style="color:#ffa500;">${name}</strong>,</p>
      <p style="font-size:14px;line-height:1.8;margin:0 0 24px;color:#b4b4c8;">
        Welcome to the Hobby Brief, your monthly dispatch on idea validation, cohort insights, and building on the side.
      </p>
      <div style="background:rgba(255,165,0,0.1);border-left:3px solid #ffa500;padding:20px;margin:20px 0;border-radius:4px;">
        <strong style="color:#ffa500;display:block;margin-bottom:10px;">What you'll get:</strong>
        <ul style="margin:0;padding-left:18px;color:#b4b4c8;font-size:13px;">
          <li>Real frameworks from founders who've shipped</li>
          <li>Cohort updates and alumni wins</li>
          <li>Tactical advice on customer discovery</li>
          <li>Invitations to exclusive workshops</li>
        </ul>
      </div>
      <p style="color:#b4b4c8;font-size:14px;line-height:1.8;margin:24px 0 0;">
        No fluff. No hype. Just the stuff that actually moves the needle.
      </p>
      <div style="height:1px;background:#2a2d4a;margin:24px 0;"></div>
      <p style="color:#b4b4c8;font-size:13px;margin:0;">
        Have questions? Reply to this email or
        <a href="mailto:hello@hobbyaccelerator.com" style="color:#ffa500;text-decoration:none;">reach out directly</a>.
      </p>
    </div>
    <div style="background:#0a0e27;padding:20px 30px;text-align:center;border-top:1px solid #2a2d4a;font-size:12px;color:#8a8da6;">
      <p style="margin:0;">2026 Hobby - A Falcon Accelerator Company</p>
      <p style="margin:8px 0 0;">Built for executives who are done saying "one day."</p>
      <p style="margin:12px 0 0;">
        <a href="https://hobbyaccelerator.com" style="color:#ffa500;text-decoration:none;">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { email: rawEmail, name } = (await req.json()) as NewsletterRequest;
    const email = normalizeEmail(rawEmail);

    if (!isValidEmail(email)) {
      return jsonResponse({ error: "Valid email is required" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAdminKey = getSupabaseAdminKey();

    if (!supabaseUrl || !supabaseAdminKey) {
      return jsonResponse({ error: "Supabase admin credentials are not configured" }, 500);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return jsonResponse({ error: "RESEND_API_KEY is not configured" }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseAdminKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: subscriber, error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, subscribed: true })
      .select("id,email,created_at,subscribed")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return jsonResponse({ error: "This email is already subscribed" }, 409);
      }

      console.error("Newsletter insert error:", insertError);
      return jsonResponse({ error: "Failed to subscribe to newsletter" }, 500);
    }

    const displayName = typeof name === "string" && name.trim()
      ? name.trim()
      : email.split("@")[0];

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Hobby Accelerator <noreply@hobbyaccelerator.com>",
        to: email,
        subject: "Welcome to the Hobby Brief",
        html: emailTemplate(escapeHtml(displayName)),
      }),
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("Resend API error:", details);
      return jsonResponse({ error: "Subscription saved, but welcome email failed to send" }, 502);
    }

    const emailResult = await emailResponse.json();

    return jsonResponse({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriber,
      emailId: emailResult.id,
    }, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    console.error("Newsletter function error:", error);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
});
