import React, { useState, useEffect, useContext } from "react";
import {
  initStripe,
  useStripe,
  PaymentSheet,
  PaymentSheetError,
} from "@stripe/stripe-react-native";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Pressable } from "react-native";
import { supabase } from "../../src/supabase";
import { AuthContext } from "../../src/providers/AuthProvider";

interface FunctionResponse {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  stripe_pk: string;
}

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string>();
  const { session } = useContext(AuthContext);

  useEffect(() => {
    async function initialize() {
      initialisePaymentSheet();
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentSheetParams = async () => {
    // Create payment session for our customer
    const { data, error } = await supabase.functions.invoke<FunctionResponse>(
      "payment"
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
      console.log("payment option:", paymentOption);
      Alert.alert("Success", "The payment was confirmed successfully");
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet present failed with error code: ${error.code}`,
        error.message
      );
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet present was canceled with code: ${error.code}`,
        error.message
      );
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

    const address: PaymentSheet.Address = {
      city: "San Francisco",
      country: "AT",
      line1: "510 Townsend St.",
      line2: "123 Street",
      postalCode: "94102",
      state: "California",
    };
    const billingDetails: PaymentSheet.BillingDetails = {
      name: "Jane Doe",
      email: "foo@bar.com",
      phone: "555-555-555",
      address: address,
    };

    const { error, paymentOption } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: "Encuentra",
      //   merchantCountryCode: "US",
      //   style: "alwaysLight",
      //   testEnv: true,
      //   primaryButtonColor: "#635BFF", // Blurple
      returnURL: "stripe-example://stripe-redirect",
      defaultBillingDetails: billingDetails,
      allowsDelayedPaymentMethods: true,
      appearance: {
        // colors: {
        //   background: "#FFFFFF",
        //   //   componentBackground: "#FFFFFF",
        // },
      },
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
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Pressable
          //   loading={loading}
          disabled={!paymentSheetEnabled}
          onPress={openPaymentSheet}
        >
          <Text>Checkout</Text>
        </Pressable>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Pressable
          //   loading={loading}
          disabled={paymentSheetEnabled}
          onPress={initialisePaymentSheet}
        >
          <Text>Restart Demo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 100,
  },
});
