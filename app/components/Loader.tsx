import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../utils/color";
import { LoaderProps } from "../types/propTypes";

const { height, width } = Dimensions.get("screen");

export default function Loader({ status, isSheet = false }: LoaderProps) {
  return (
    <View style={[!isSheet ? styles.container : styles.sheetContainer]}>
      <View style={!isSheet ? styles.card : styles.sheetCard}>
        <ActivityIndicator size="large" color={colors.primary} />
        {status && <Text style={styles.status}>{status}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0 ,0, 0.5)",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    color: "black",
  },
  card: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sheetCard: {
    backgroundColor: colors.lightPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  image: { height: height * 0.1, width: width * 0.2, alignSelf: "center" },
});
