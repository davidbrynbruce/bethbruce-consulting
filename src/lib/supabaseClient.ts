import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabaseConfig";

// Shared client for the admin area (auth, content, customers, storage).
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
