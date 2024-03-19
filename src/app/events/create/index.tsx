import React, { useContext, useEffect, useState } from "react";
import CreateEventForm from "../../../../components/events/create/CreateEventForm";
import { AuthContext } from "../../../providers/AuthProvider";
import { COLORS } from "../../../../constants/theme";
import GuestLoginRequired from "../../../../components/common/GuestLoginRequired/GuestLoginRequired";

export default function CreateEvent() {
  const { session } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(!session);

  if (!session) {
    return <GuestLoginRequired />;
  }

  return <CreateEventForm />;
}
