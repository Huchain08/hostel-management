import { createClient } from '@supabase/supabase-js';

// These variables come from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);