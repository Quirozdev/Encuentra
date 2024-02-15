import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
        container: {
          
        },
        input: {
            padding: 18,
            borderWidth: 1,
            borderRadius: 8,
            borderStyle: "solid",
            backgroundColor:COLORS.darkWhite,
            color:COLORS.dark,

            borderColor: COLORS.lightGrey,
        }
});

export default styles;