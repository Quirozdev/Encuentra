import React from "react";
import 'react-native-url-polyfill/auto';
import MyEvents from "../../../../components/events/myEvents/MyEvents";
import { PortalProvider } from "@gorhom/portal";
import { MyFilterProvider } from "../../../providers/MyFilterProvider";
import { CategoriesProvider } from "../../../providers/CategoryProvider";
import { EventsProvider } from "../../../providers/EventsProvider";

export default function myEvent(){
    return (
        <EventsProvider>
        <CategoriesProvider>
        <MyFilterProvider>
        <PortalProvider>
        <MyEvents />
        </PortalProvider>
        </MyFilterProvider>
        </CategoriesProvider>
        </EventsProvider>
    );
}