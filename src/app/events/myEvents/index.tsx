import React from "react";
import 'react-native-url-polyfill/auto';
import MyEvents from "../../../../components/events/myEvents/MyEvents";
import { PortalProvider } from "@gorhom/portal";
import { FilterProvider } from "../../../providers/FilterProvider";
import { CategoriesProvider } from "../../../providers/CategoryProvider";
import { EventsProvider } from "../../../providers/EventsProvider";

export default function myEvent(){
    return (
        <EventsProvider>
        <CategoriesProvider>
        <FilterProvider>
        <PortalProvider>
        <MyEvents />
        </PortalProvider>
        </FilterProvider>
        </CategoriesProvider>
        </EventsProvider>
    );
}