import React, { useEffect, useRef } from 'react';
import {Text, TouchableOpacity, View, Animated } from 'react-native'
import OpenCostsIcon from '../../../assets/images/open_costs.svg';
import styles from './DesgloceCostosOpener.style';


const DesgloceCostos = ({isFlipped}) => {
    const flipAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            flipAnim,
            {
                toValue: isFlipped ? 1 : 0,
                duration: 200,
                useNativeDriver: true
            }
        ).start();
    }, [isFlipped])

    const flipInterpolate = flipAnim.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '180deg']
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Desgloce de costos</Text>
            <Animated.View style={[styles.iconContainer, isFlipped ? {transform: [{rotate:flipInterpolate}]}: {}]}>
                <OpenCostsIcon/>
            </Animated.View>
        </View>
    );
}

export default DesgloceCostos