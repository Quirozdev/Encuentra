import React, { useState, useEffect, useContext } from "react";
import {
  initStripe,
  useStripe,
  PaymentSheet,
  PaymentSheetError,
} from "@stripe/stripe-react-native";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  TouchableOpacity,
  TextProps,
} from "react-native";
import { Pressable } from "react-native";
import { supabase } from "../../src/supabase";
import { COLORS } from "../../constants/theme";

interface FunctionResponse {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  stripe_pk: string;
}

interface CheckoutButtonProps {
  payDetails: {
    amount: number;
  };
  onSuccess: () => void;
  buttonStyle: TouchableOpacityProps["style"];
  text: string;
  textStyle: TextProps["style"];
}

export default function CheckoutButton({
  onSuccess,
  payDetails,
  buttonStyle,
  text,
  textStyle,
}: CheckoutButtonProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    async function initialize() {
      initialisePaymentSheet();
    }
    // gratis
    if (payDetails.amount <= 0) {
      return;
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentSheetParams = async () => {
    // Create payment session for our customer
    const { data, error } = await supabase.functions.invoke<FunctionResponse>(
      "payment",
      {
        body: { price: payDetails.amount },
      }
    );
    console.log(data, error);
    if (!data || error) {
      Alert.alert(`Error: ${error?.message ?? "no data"}`);
      return {};
    }
    const { paymentIntent, ephemeralKey, customer, stripe_pk } = data;
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
      stripe_pk,
    };
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    const { error, paymentOption } = await presentPaymentSheet();

    if (!error) {
      onSuccess();
      // Alert.alert("Success", "The payment was confirmed successfully");
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet present failed with error code: ${error.code}`,
        error.message
      );
    } else if (error.code === PaymentSheetError.Canceled) {
      // Alert.alert(
      //   `PaymentSheet present was canceled with code: ${error.code}`,
      //   error.message
      // );
    }
    setPaymentSheetEnabled(false);
    setLoading(false);
  };

  const initialisePaymentSheet = async () => {
    setLoading(true);
    const { paymentIntent, ephemeralKey, customer, stripe_pk } =
      await fetchPaymentSheetParams();

    if (!stripe_pk || !paymentIntent) return setLoading(false);

    await initStripe({
      publishableKey: stripe_pk,
      merchantIdentifier: "merchant.com.stripe.react.native",
      urlScheme: "supabase-stripe-example",
      setReturnUrlSchemeOnAndroid: true,
    });

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: "Encuentra",
      returnURL: "stripe-example://stripe-redirect",
      defaultBillingDetails: {
        address: {
          country: "MXN",
        },
      },
      allowsDelayedPaymentMethods: false,
      // style: "alwaysLight",
      // appearance: {
      //   colors: {
      //     background: "#FFFFFF",
      //     // componentBackground: "#FFFFFF",
      //     primary: COLORS.darkPurple,
      //     secondaryText: "#a0a1a4",
      //     primaryText: "#000000",
      //     componentBackground: "#FFFFFF",
      //     icon: "#78787d",
      //     placeholderText: "#9d9ea1",
      //     componentText: "#000000",

      //     // primaryText: "#000000",
      //     // placeholderText: "#000000",
      //   },
      // },
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet init failed with error code: ${error.code}`,
        error.message
      );
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet init was canceled with code: ${error.code}`,
        error.message
      );
    }
    setLoading(false);
  };

  return (
    <>
      {payDetails.amount <= 0 ? (
        <TouchableOpacity
          // disabled={loading}
          style={buttonStyle}
          onPress={onSuccess}
        >
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          // disabled={loading}
          style={buttonStyle}
          onPress={openPaymentSheet}
        >
          {loading ? (
            <ActivityIndicator size={24} />
          ) : (
            <Text style={textStyle}>{text}</Text>
          )}
        </TouchableOpacity>
      )}
    </>
  );
}
