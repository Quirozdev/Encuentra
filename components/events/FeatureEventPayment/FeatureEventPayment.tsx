import React, { useEffect, useState, useRef } from "react";
import {Text, View,SafeAreaView, Animated, TouchableOpacity, ScrollView} from "react-native";
import MyCalendar from "../../common/Calendar/Calendar";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import styles from './FeatureEventPayment.style';
import TimePicker from "../../common/TimePicker/TimePicker";
import dayjs from 'dayjs';
import DesgloceCostos from "../../common/DesgloceCostosOpener/DesgloceCostosOpener";
import NavButton from "../../common/NavButton/NavButton";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import CheckoutResultModal from "../../common/CheckoutResultModal/CheckoutResultModal";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";



const FeatureEventPayment :React.FC = () => {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalVisible2, setIsModalVisible2] = useState(false)
    const [modalType, setModalType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    var modalMessage = "¿Estás seguro que deseas pagar por destacar este evento?";
    const params = useLocalSearchParams();
    const rangosFechasCobrados = JSON.parse(params.rangosFechasCobrados as string);
    console.log(rangosFechasCobrados);
    const horasPorDia = dayjs(params.lastHour as string).diff(dayjs(params.firstHour as string),'hour');
    console.log('first hour',params.firstHour);
    console.log('horas por dia',horasPorDia);
    // rangosFechasCobrados: {
    //     "3meses": any[];
    //     "2meses": any[];
    //     "1mes": any[];
    //     "3dias": any[];
    //     diaevento: any[];
    // };
    return (
        <SafeAreaView style={styles.parentContainer}>
            <Stack.Screen
                options={{
                headerShown: true,
                headerStyle: {backgroundColor: "#FFFFFF"},
                headerShadowVisible: false,
                headerLeft: () => <ReturnButton />,
                headerTitle: "Pago",
                headerTitleStyle: styles.headerTitle
                }}
            />
        <ScrollView style={{flex:1}}>
            <View style={styles.infoPagoContainer}>
                <Text style={styles.infoPagoTitle}>Información de pago</Text>
                {/* de aqui abajo empieza el cagadero */}
                {rangosFechasCobrados['3meses'].length > 0 &&
                <View>{/* View pitero */}
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Horas por día</Text>
                            <Text style={styles.infoText}>(3 meses de anticipación)</Text>
                        </View>
                        <Text style={styles.cantidades}>{horasPorDia} Hrs</Text>
                    </View>
                    <Text style={styles.descripcion}>{horasPorDia} x $1.00 = ${horasPorDia}/día</Text>
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}> Días en destacado</Text>
                            <Text style={styles.infoText}>(3 meses de anticipación)</Text>
                        </View>
                    <Text style={styles.cantidades}>{rangosFechasCobrados['3meses'].length} Días</Text>
                    </View>
                    <Text style={styles.descripcion}>{rangosFechasCobrados['3meses'].length} Días x ${horasPorDia*1}.00 = ${horasPorDia*1*rangosFechasCobrados['3meses'].length}.00</Text>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={styles.subTotalCantidad}>$210.00</Text>
                    </View>
                    {rangosFechasCobrados['2meses'].length !==0 && <View><View style={styles.separatorGreenWide2}/></View>}
                </View>
                }
                { rangosFechasCobrados['2meses'].length > 0 &&
                <View>{/* View pitero */}
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Horas por día</Text>
                            <Text style={styles.infoText}>(2 meses de anticipación)</Text>
                        </View>
                        <Text style={styles.cantidades}>{horasPorDia} Hrs</Text>
                    </View>
                    <Text style={styles.descripcion}>{horasPorDia} x $2.00 = ${horasPorDia*2}/día</Text>
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}> Días en destacado</Text>
                            <Text style={styles.infoText}>(2 meses de anticipación)</Text>
                        </View>
                    <Text style={styles.cantidades}>{rangosFechasCobrados['2meses'].length} Días</Text>
                    </View>
                    <Text style={styles.descripcion}>{rangosFechasCobrados['2meses'].length} Días x ${horasPorDia*2}.00 = ${horasPorDia*2*rangosFechasCobrados['2meses'].length}.00</Text>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={styles.subTotalCantidad}>$210.00</Text>
                    </View>
                    {rangosFechasCobrados['1mes'].length !==0 && <View><View style={styles.separatorGreenWide2}/></View>}
                </View>
                }
                { rangosFechasCobrados['1mes'].length > 0 &&
                <View>{/* View pitero */}
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Horas por día</Text>
                            <Text style={styles.infoText}>(1 mes de anticipación)</Text>
                        </View>
                        <Text style={styles.cantidades}>{horasPorDia} Hrs</Text>
                    </View>
                    <Text style={styles.descripcion}>{horasPorDia} x $5.00 = ${horasPorDia*5}/día</Text>
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}> Días en destacado</Text>
                            <Text style={styles.infoText}>(1 mes de anticipación)</Text>
                        </View>
                    <Text style={styles.cantidades}>{rangosFechasCobrados['1mes'].length} Días</Text>
                    </View>
                    <Text style={styles.descripcion}>{rangosFechasCobrados['1mes'].length} Días x ${horasPorDia*5}.00 = ${horasPorDia*5*rangosFechasCobrados['1mes'].length}.00</Text>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={styles.subTotalCantidad}>$210.00</Text>
                    </View>
                    {rangosFechasCobrados['3dias'].length !==0 && <View><View style={styles.separatorGreenWide2}/></View>}
                </View>
                }
                { rangosFechasCobrados['3dias'].length > 0 &&
                <View>{/* View pitero */}
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Horas por día</Text>
                            <Text style={styles.infoText}>(3 días de anticipación)</Text>
                        </View>
                        <Text style={styles.cantidades}>{horasPorDia} Hrs</Text>
                    </View>
                    <Text style={styles.descripcion}>{horasPorDia} x $10.00 = ${horasPorDia*10}/día</Text>
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}> Días en destacado</Text>
                            <Text style={styles.infoText}>(3 días de anticipación)</Text>
                        </View>
                    <Text style={styles.cantidades}>{rangosFechasCobrados['3dias'].length} Días</Text>
                    </View>
                    <Text style={styles.descripcion}>{rangosFechasCobrados['3dias'].length} Días x ${horasPorDia*10}.00 = ${horasPorDia*10*rangosFechasCobrados['3dias'].length}.00</Text>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={styles.subTotalCantidad}>$210.00</Text>
                    </View>
                    {rangosFechasCobrados['diaevento'].length !==0 && <View><View style={styles.separatorGreenWide2}/></View>}
                </View>
                }
                { rangosFechasCobrados['diaevento'].length > 0 &&
                <View>{/* View pitero */}
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}>Horas por día</Text>
                            <Text style={styles.infoText}>(Día del evento)</Text>
                        </View>
                        <Text style={styles.cantidades}>{horasPorDia} Hrs</Text>
                    </View>
                    <Text style={styles.descripcion}>{horasPorDia} x $20.00 = ${horasPorDia*20}/día</Text>
                    <View style={styles.containerTituloHoras}>
                        <View style={styles.info}>
                            <Text style={styles.infoTitle}> Días en destacado</Text>
                            <Text style={styles.infoText}>(Día del evento)</Text>
                        </View>
                    <Text style={styles.cantidades}>{rangosFechasCobrados['diaevento'].length} Días</Text>
                    </View>
                    <Text style={styles.descripcion}>{rangosFechasCobrados['diaevento'].length} Días x ${horasPorDia*20}.00 = ${horasPorDia*20*rangosFechasCobrados['diaevento'].length}.00</Text>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalTitle}>Subtotal</Text>
                        <Text style={styles.subTotalCantidad}>$210.00</Text>
                    </View>
                </View>
                }
                
                

                <View style={styles.separatorGreen}/>{/* esto es el bloque del total */}
                <View style={styles.subTotalContainer}>
                    <Text style={styles.subTotalTitle}>Total</Text>
                    <Text></Text>
                    <Text style={styles.totalCantidad}>$420.00</Text>
                </View>
            </View>
        </ScrollView>
            

        <View>
            <View style={styles.nextButtonContainer}>
                <NavButton type={"destacar"} handlePress={() => {setIsModalVisible(true)}}/>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.cancelText}> Cancelar </Text>
            </TouchableOpacity>
        </View>    

        <ConfirmationModal
            isVisible={isModalVisible}
            message={modalMessage}
            onPress={() => {
              setModalType("exito")
              setIsModalVisible(false)
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false);
                setIsModalVisible2(true);
              }, 1000);
              
              
            }}
            exitButtonPress={() => {
                setModalType("cancelado")
                setIsModalVisible(false)
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false);
                  setIsModalVisible2(true);
                }, 1000);
            }}
        />

        <CheckoutResultModal
            isVisible={isModalVisible2}
            type={modalType}
        />

        {isLoading && 
            <LoadingScreen/>
        }

        </SafeAreaView>
    );
}

export default FeatureEventPayment