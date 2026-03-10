import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rmaplhibfptvxigoaocb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYXBsaGliZnB0dnhpZ29hb2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDU4ODAsImV4cCI6MjA4ODcyMTg4MH0.rgqcYhgScTakqxmPsHzwUZAMb7uL23hHkWYoGZuXo9A";

export const supabase = createClient(supabaseUrl, supabaseKey);