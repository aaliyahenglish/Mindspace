import { createClient } from '@supabase/supabase-js';

const supaUrl = "https://qoblabbwrqyieiqxsevy.supabase.co"
const supaAPI = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYmxhYmJ3cnF5aWVpcXhzZXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzIwMjAsImV4cCI6MjA2MTIwODAyMH0.Cf1iqueFayLMd3msU1zVLm2IGiFh3ANc646MpVCaZJg'

export const supabase = createClient(supaUrl, supaAPI);