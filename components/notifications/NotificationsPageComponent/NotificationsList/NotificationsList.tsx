import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Notification } from "../../../../src/types/notifications.types";
import {
  convertTimeTo12HourFormat,
  formatDateAndYearWithTextualMonth,
} from "../../../../src/lib/dates";
import NotificationComponent from "./NotificationComponent/NotificationComponent";
import styles from "./notificationsList.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../src/app/store";
import {
  fetchNotifications,
  markAllNotificationsAsRead,
} from "../../../../src/slices/notificationsSlice";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../src/providers/AuthProvider";
import Animated, { SlideInDown } from "react-native-reanimated";

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

function sortByHourDescending(notificaciones: Notification[]) {
  return [...notificaciones].sort((a, b) => b.hora.localeCompare(a.hora));
}

export default function NotificationsList({
  notificaciones,
}: NotificationsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchNotifications(session.user.id)).then(() => {
      setRefreshing(false);
    });
  }, []);

  const groupedNotifications = groupNotificationsByDate(notificaciones);

  const sortedDateKeys = Object.keys(groupedNotifications).sort((a, b) => {
    return Date.parse(b) - Date.parse(a);
  });

  return (
    <FlatList
      data={sortedDateKeys}
      renderItem={({ item }) => {
        return (
          <Animated.View key={item} entering={SlideInDown}>
            <FlatList
              data={sortByHourDescending(groupedNotifications[item])}
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
              contentContainerStyle={styles.notificationsDateContainer}
            />
          </Animated.View>
        );
      }}
      ListHeaderComponent={() => {
        return (
          <View style={styles.markAllAsReadContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(markAllNotificationsAsRead(session.user.id));
              }}
              style={styles.markAllAsReadBtn}
            >
              <Text style={styles.markAllAsReadText}>
                Marcar todas como leídas
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      contentContainerStyle={styles.notificationsContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
