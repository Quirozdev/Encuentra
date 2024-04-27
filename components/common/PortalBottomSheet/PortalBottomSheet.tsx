import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, View,Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetRefProps } from "../BottomSheet/BottomSheet";
import { Portal } from "@gorhom/portal";
import ChangeLocationForm from "../../events/ChangeLocationForm/ChangeLocationForm";
import FilterEvent from "../../events/FilterEvent/FilterEvent";
import FilterActivity from "../../events/FilterActivity/FilterActivity";
import { ActivityFilterProvider } from "../../../src/providers/ActivityFilterProvider";
import { COLORS, FONTS } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ModalType {
  type: "filter" | "location" | "activity_filter" |"text"|"";
}

interface PortalBottomSheetProps {
  // Define optional string parameters
  text?: string;
  btn?: string;
  icon?: string;
  color?:string;
}


export type PortalBottomSheetRefProps = {
  open: (type: "filter" | "location" | "activity_filter" | "text"|"") => void;
};

const PortalBottomSheet = React.forwardRef<PortalBottomSheetRefProps,PortalBottomSheetProps>(
  ({text,btn,icon,color},ref) => {
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

  const open = useCallback((type:"filter" | "location" | "text" | "") => {
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

  return (
    <Portal>
    <BottomSheet ref={bottomSheetref}>
      <View ref={viewRef} collapsable={false}>
        {openModal.type == "text" ?
        <View style={{marginBottom:80,paddingTop:30,paddingHorizontal:40,gap:20}}>
          {icon && color && <AntDesign name={icon} size={30} color={color} />
}
          <Text style={{fontFamily:FONTS.RubikRegular,fontSize:18,color:'#404040'}}>{text}</Text>
          <TouchableOpacity onPress={() => bottomSheetref?.current?.scrollTo(SCREEN_HEIGHT)} style={{
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 15,
    paddingHorizontal:50,
    borderRadius: 10,
    alignSelf:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
    elevation: 10,
  }}><Text style={{
    textAlign: "center",
    color: COLORS.white,
    fontFamily:FONTS.RubikSemiBold,
    fontSize: 18,
  }}>{btn}</Text></TouchableOpacity>

        </View>
        :
        openModal.type == "filter" ? (
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

