const SUPABASE_URL = "https://yiqmbjauiksjpmebealq.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcW1iamF1aWtzanBtZWJlYWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzczOTksImV4cCI6MjA5OTAxMzM5OX0.J2UKuQv5utxxsg8e9X7xLZslu8WqUtwEU7MeHh2jYe0";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);