import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Coments.style";
import Profile from "../../../assets/images/navigation/profile.svg";
import { ComentsContext } from "../../../src/providers/ComentsProvider";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { getAutor, getAllComentsFromEvent } from "../../../src/services/coments";
import { formatDate } from "date-fns";
import { User } from "../../../src/types/users.types";
import {EventWithReactions} from "../../../src/types/events.types";

interface EventDetailsProps {
  event: EventWithReactions; 
}

export default function ComentsList({ event }: EventDetailsProps) {
  const [coments, setComents] = useState<any[]>([]);
  const { loading } = useContext(ComentsContext);
  const [autores, setAutores] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getAllComentsFromEvent(event.id.toString());
      if (error) {
        // Manejar el error
        console.error("Error al obtener los comentarios:", error.message);
        return;
      }
      setComents(data);
      if (data.length > 0) {
        const autores = await getAutores(data);
        setAutores(autores);
      }
    };

    fetchData();
  }, [event]);

  const getAutores = async (comentarios) => {
    const autoresPromises = comentarios.map((comentario) => {
      return getAutor(comentario.id_usuario);
    });
    const autores = await Promise.all(autoresPromises);
    return autores;
  };

  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      {loading ? (
        <ActivityIndicator />
      ) : coments.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONTS.RubikSemiBold,
            color: COLORS.grey,
            fontSize: SIZES.medium,
          }}
        >
          No se encontraron comentarios
        </Text>
      ) : (
        coments.map((coment, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Profile
              style={{
                color: "rgba(6, 187, 142, 1)",
                transform: [{ scale: 1.4 }],
                marginLeft: 5,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>{autores[index] ? `${autores[index].nombres} ${autores[index].apellidos}` : "Nombre de usuario"}</Text>
              <Text
                style={{
                  fontFamily: FONTS.RubikRegular,
                  fontSize: 15,
                  color: "#ADAFBB",
                }}
              >
                {formatDate(coment.fecha, "dd MMM yy")}
              </Text>
              <Text style={styles.description}>{coment.comentario}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}
