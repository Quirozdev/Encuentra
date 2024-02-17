import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useState, useEffect } from "react";
import { supabase } from "../supabase";
import React from "react";
export const AuthContext = createContext<{ session: Session }>({ session: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ session, setSession ] = useState<Session | null>(null);

    useEffect(() => {
        // restores session on app start
        restoreSession();

        // listener for auth changes
        // supabase.auth.onAuthStateChange(async (_, session) => {
        //     if (session === null) {
        //         await SecureStore.deleteItemAsync(`supabase-token`);
        //         setSession(null);
        //     } else {
        //         await SecureStore.setItemAsync(`supabase-token`, session.access_token);
        //         setSession(session);
        //     }

        //     // triggers logic to update graphql client header with new token
        //     updateGraphqlClient();
//});
    }, []);

    const restoreSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data) {
            setSession(data.session);
            //updateGraphqlClient();
        }
    };

    return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};