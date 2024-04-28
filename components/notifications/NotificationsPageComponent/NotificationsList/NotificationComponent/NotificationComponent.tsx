import { Image, Pressable, Text, View } from "react-native";
import { Notification } from "../../../../../src/types/notifications.types";
import { convertTimeTo12HourFormat } from "../../../../../src/lib/dates";
import styles from "./notificationComponent.style";
import NotificationLikeIcon from "../../../../../assets/images/notifications/like_notification_icon.svg";
import NotificationDislikeIcon from "../../../../../assets/images/notifications/dislike_notification_icon.svg";
import NotificationAssistIcon from "../../../../../assets/images/notifications/assist_notification_icon.svg";
import NotificationCommentIcon from "../../../../../assets/images/notifications/comment_notification_icon.svg";
import NotificationInterestEventIcon from "../../../../../assets/images/notifications/interest_event_notification_icon.svg";
import NotificationBlockedEventAssistantsIcon from "../../../../../assets/images/notifications/blocked_event_assistants.svg";
import NotificationBlockedEventPropietaryIcon from "../../../../../assets/images/notifications/blocked_event_propietary.svg";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../src/app/store";
import { useContext } from "react";
import { AuthContext } from "../../../../../src/providers/AuthProvider";
import { markNotificationAsRead } from "../../../../../src/slices/notificationsSlice";
import { supabase } from "../../../../../src/supabase";

function getNotificationImageSrc(
  notificationImgUrl: string | null,
  notificationType: Notification["tipo"]
) {
  // si la notificacion tiene una imagen asociada
  if (notificationImgUrl) {
    return { uri: notificationImgUrl };
  }
  // si no la tiene, poner imagenes por defecto
  // solo en este caso se debe poner la imagen del evento y no la de un usuario
  if (notificationType === "Evento Interés") {
    return require("../../../../../assets/images/notifications/default_event_img.png");
  } else {
    return require("../../../../../assets/images/notifications/default_user_profile_img.png");
  }
}

function NotificationIconType({
  tipoNotification,
}: {
  tipoNotification: Notification["tipo"];
}) {
  if (tipoNotification === "Me gusta") {
    return <NotificationLikeIcon />;
  } else if (tipoNotification === "No me gusta") {
    return <NotificationDislikeIcon />;
  } else if (tipoNotification === "Asistiré") {
    return <NotificationAssistIcon />;
  } else if (tipoNotification === "Comentario") {
    return <NotificationCommentIcon />;
  } else if (tipoNotification == "Evento Interés") {
    return <NotificationInterestEventIcon />;
  } else if (tipoNotification == "Evento_Bloqueado_Asistentes") {
    return <NotificationBlockedEventAssistantsIcon />;
  } else if (tipoNotification == "Evento_Bloqueado_Propietario") {
    return <NotificationBlockedEventPropietaryIcon />;
  } else {
    console.error(
      "Nunca debi haber llegado aqui!, error de tipo de notificacion"
    );
  }
}

interface NotificationComponentProps {
  notification: Notification;
}

export default function NotificationComponent({
  notification,
}: NotificationComponentProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Pressable
      onPress={() => {
        // si la notificacion no ha sido "vista" y se presiona,
        // se procede a marcarla
        if (!notification.vista) {
          dispatch(markNotificationAsRead(notification.id));
        }
        router.navigate(`events/details/${notification.id_evento}`);
      }}
    >
      <View
        style={[
          styles.container,
          !notification.vista && { backgroundColor: "#E8ECF4" },
        ]}
      >
        <View style={styles.imgContainer}>
          <Image
            source={getNotificationImageSrc(
              notification.url_imagen,
              notification.tipo
            )}
            width={75}
            height={75}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 75 }}
          />
          <View style={styles.notificationTypeIconContainer}>
            <NotificationIconType tipoNotification={notification.tipo} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.notificationText}>{notification.texto}</Text>
          {notification.tipo === "Evento_Bloqueado_Propietario" && (
            <Text style={styles.moreInfoText}>Clic para más información.</Text>
          )}
          <Text style={styles.notificationHour}>
            {convertTimeTo12HourFormat(notification.hora)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
