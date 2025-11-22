import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wtplkozjxffwsrayfabd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0cGxrb3pqeGZmd3NyYXlmYWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODYxNTEsImV4cCI6MjA3OTI2MjE1MX0.0EVJlPKOElffS4mRQz2Ux4YzZyxNpCK4-4qkt7hLxlg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
