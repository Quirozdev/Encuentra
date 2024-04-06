import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import BottomSheet, { BottomSheetRefProps } from "../BottomSheet/BottomSheet";
import { Portal } from "@gorhom/portal";
import ChangeLocationForm from "../../events/ChangeLocationForm/ChangeLocationForm";
import FilterEvent from "../../events/FilterEvent/FilterEvent";
import FilterActivity from "../../events/FilterActivity/FilterActivity";
import { ActivityFilterProvider } from "../../../src/providers/ActivityFilterProvider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ModalType {
  type: "filter" | "location" | "activity_filter" |"";
}

export type PortalBottomSheetRefProps = {
  open: (type: "filter" | "location" | "activity_filter" | "") => void;
};

const PortalBottomSheet = React.forwardRef<PortalBottomSheetRefProps>(
  ({},ref) => {
  const [openModal, setOpenModal] = useState<ModalType>({ type: "" });
  const bottomSheetref = useRef<BottomSheetRefProps>(null);
  const viewRef = useRef(null);

  
  function handleBottomSheet(height: number) {


    const isActive = bottomSheetref?.current?.isActive();
    if (isActive) {
      bottomSheetref?.current?.scrollTo(SCREEN_HEIGHT);
    } else {
      bottomSheetref?.current?.scrollTo(height);
    }
  }

  const open = useCallback((type:"filter" | "location" | "") => {
    "worklet";
    setOpenModal({type:type});
  }, []);
  useImperativeHandle(ref, () => ({ open }), [
    open,
  ]);
  useEffect(() => {
    if (viewRef.current) {
      setTimeout(() => {
        viewRef.current.measure((_x, _y, _width, height) => {
          handleBottomSheet(-height);
        });
      }, 100);
    }
  }, [openModal]);

  function openLocationModal() {
    setOpenModal({ type: "location" });
  }

  function openFilterModal() {
    setOpenModal({ type: "filter" });
  }

  return (
    <Portal>
    <BottomSheet ref={bottomSheetref}>
      <View ref={viewRef} collapsable={false}>
        {openModal.type == "filter" ? (
          <FilterEvent scrollTo={bottomSheetref?.current?.scrollTo} />
        ) : (
          openModal.type == "location" ?
          <ChangeLocationForm scrollTo={bottomSheetref?.current?.scrollTo} />
          :
          <FilterActivity scrollTo={bottomSheetref?.current?.scrollTo} />
        )}
      </View>
    </BottomSheet>
  </Portal>
  );
});

export default PortalBottomSheet;

