import bcrypt from "bcryptjs";
import { getSupabaseClient } from "./_supabase.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  try {
    const supabase = getSupabaseClient();

    // Check if the email is already registered
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    // Scramble the password before storing it — never save it as plain text
    const passwordHash = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .insert({ email: normalizedEmail, password_hash: passwordHash });

    if (error) throw error;

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong creating your account." });
  }
}