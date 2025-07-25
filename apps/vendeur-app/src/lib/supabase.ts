import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://awyxgnsddrzkvwczewwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eXhnbnNkZHJ6a3Z3Y3pld3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTgxNjIsImV4cCI6MjA2ODM5NDE2Mn0.cdDHUpHJTbA-CJWqfL9VuXq6NG2Sbu7O6alGGUS5nto';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };