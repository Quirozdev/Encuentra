import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { getNotificationsPreferencesFromUser } from "../services/notifications";
import { INotificationsPreferences } from "../types/notifications.types";
import { PostgrestError } from "@supabase/supabase-js";

export default function useNotificationPreferences() {
  const { session } = useContext(AuthContext);
  const [preferences, setPreferences] =
    useState<INotificationsPreferences>(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError>(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  function fetchPreferences() {
    setPreferences(null);
    setIsLoading(true);
    getNotificationsPreferencesFromUser(session.user.id).then(
      ({ preferencias, error }) => {
        setPreferences(preferencias);
        setError(error);
        setIsLoading(false);
      }
    );
  }

  return { preferences, setPreferences, fetchPreferences, loading, error };
}
