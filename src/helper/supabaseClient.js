import {createClient} from "@supabase/supabase-js";

const supabaseUrl =" https://vvldlolevpnqybrrnaxo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2bGRsb2xldnBucXlicnJuYXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDYxNjIsImV4cCI6MjA2Nzg4MjE2Mn0.8LFqNCaUNiakmBz2OOnQBc7zwvoiffUkey4xCO6kREY";

const supabase = createClient(supabaseUrl,supabaseAnonKey);

export default supabase