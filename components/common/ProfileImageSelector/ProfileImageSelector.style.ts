import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    profilePictureContainer: {
        alignItems: "center"
      },
      gradientContainer: {
        width: 152,
        height: 152,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        overflow: "hidden"
      },
      profilePicture: {
        width: '98%',
        height: '98%',
        borderRadius: 100,
        
      },
      noProfilePicture: {
        width: "98%",
        height: "98%",
        borderColor: 'black',
      },
      imagePickerContainer: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin:-1
      }
});

export default styles;