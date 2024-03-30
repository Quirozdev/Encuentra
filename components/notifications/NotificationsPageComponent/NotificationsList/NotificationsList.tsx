import { Text, TouchableOpacity, View } from "react-native";
import { Notification } from "../../../../src/types/notifications.types";
import {
  convertTimeTo12HourFormat,
  formatDateAndYearWithTextualMonth,
} from "../../../../src/lib/dates";
import NotificationComponent from "./NotificationComponent/NotificationComponent";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styles from "./notificationsList.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../src/app/store";
import { markAllNotificationsAsRead } from "../../../../src/slices/notificationsSlice";
import { useContext } from "react";
import { AuthContext } from "../../../../src/providers/AuthProvider";

interface NotificationsListProps {
  notificaciones: Notification[];
}

function groupNotificationsByDate(notifications: Notification[]) {
  const groupedNotifications: {
    [key: string]: Notification[];
  } = {};
  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];
    const date = notification["fecha"];
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [notification];
    } else {
      groupedNotifications[date].push(notification);
    }
  }
  return groupedNotifications;
}

export default function NotificationsList({
  notificaciones,
}: NotificationsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useContext(AuthContext);

  const groupedNotifications = groupNotificationsByDate(notificaciones);
  return (
    <FlatList
      data={Object.keys(groupedNotifications)}
      renderItem={({ item }) => {
        return (
          <FlatList
            data={groupedNotifications[item]}
            renderItem={({ item }) => {
              return <NotificationComponent notification={item} />;
            }}
            keyExtractor={(item) => "" + item.id}
            ListHeaderComponent={() => {
              return (
                <Text style={styles.notificationDateText}>
                  {formatDateAndYearWithTextualMonth(item)}
                </Text>
              );
            }}
            key={item}
            contentContainerStyle={styles.notificationsDateContainer}
          />
        );
      }}
      ListHeaderComponent={() => {
        return (
          <View style={styles.markAllAsReadContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(markAllNotificationsAsRead(session.user.id));
              }}
            >
              <Text style={styles.markAllAsReadText}>
                Marcar todas como leídas
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      contentContainerStyle={styles.notificationsContainer}
    />
  );
}
