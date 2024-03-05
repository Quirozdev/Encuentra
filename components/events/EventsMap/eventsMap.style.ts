import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 300,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    bottom: 0,
    height: 50,
  },
  eventCard: {
    padding: 6,
  },
});

export default styles;
