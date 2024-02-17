import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useState, useEffect } from "react";
import { supabase } from "../supabase";
import React from "react";
import { useRouter } from "expo-router";
export const AuthContext = createContext<{ session: Session }>({ session: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ session, setSession ] = useState<Session | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        // restores session on app start
        restoreSession();

        // listener for auth changes
        supabase.auth.onAuthStateChange(async (_, session) => {
            if (session === null) {
                setSession(null);
                router.replace('/')
            } else {
                setSession(session);
            }

        //     // triggers logic to update graphql client header with new token
        //     updateGraphqlClient();
});
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