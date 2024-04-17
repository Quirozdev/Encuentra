import { createClient } from "npm:@supabase/supabase-js@2.42.0";
import { Database } from "./schema.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

export default supabase;
