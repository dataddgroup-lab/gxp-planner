-- Add company_name to facilities table
ALTER TABLE public.facilities ADD COLUMN IF NOT EXISTS company_name text;
NOTIFY pgrst, 'reload schema';
