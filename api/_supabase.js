import { createClient } from "@supabase/supabase-js";

// SUPABASE_SERVICE_ROLE_KEY is a powerful "master key" — it must NEVER be
// sent to the browser. It only lives here, in server-side code.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// TEMPORARY DEBUG LINE — remove this once the issue is fixed
console.log("DEBUG supabaseUrl:", JSON.stringify(supabaseUrl));

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase environment variables are not set.");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}