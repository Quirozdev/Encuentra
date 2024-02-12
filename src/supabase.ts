import "react-native-url-polyfill/auto";
import { SUPABASE_URL, SUPABASE_API_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database.types";

console.log(SUPABASE_URL);

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});