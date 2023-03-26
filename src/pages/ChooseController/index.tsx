import { colors } from "../../colors";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { View, StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import LayoutList from "../../components/LayoutList";


export default function ChooseController(){

    const { language } = useGlobalContext();

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.darkBlue}/>
            <View style={styles.background}>
                <Text style={styles.welcome}>
                    {language.welcome}
                </Text>
                <Text style={styles.title}>
                    {language.chooseLayout}
                </Text>
                <LayoutList />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.darkBlue,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 22,
        marginTop: 76,
        color: colors.blue,
    },
    title: {
        marginTop: 0,
        marginBottom: 20,
        fontSize: 20,
        color: colors.darkWhite,
        margin: 10,
    }
});