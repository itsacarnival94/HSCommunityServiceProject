import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("DEBUG supabaseUrl:", JSON.stringify(supabaseUrl));

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase environment variables are not set.");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}