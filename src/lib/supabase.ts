import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://qfxuazrzijksmfhccduz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmeHVhenJ6aWprc21maGNjZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTc5OTIsImV4cCI6MjA2ODM5Mzk5Mn0.lnqsAfJTw4890E_-RjyZuLRbnNzRjGLKcDS7QJTUsYE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };