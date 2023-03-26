import { useRef } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../colors";
import { Plus } from "react-native-feather";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import icon0 from '../../../assets/robot-icons/icon0.png';

interface layoutProps {
    background: string | undefined,
    title: string | undefined,
    icon: number | undefined,
}

export default function Layout({background, title, icon} : layoutProps){
    
    const { language } = useGlobalContext();

    const backgroundStyle = {
        ...styles.background,
        backgroundColor: (background)? background : colors.darkBlue,
    }

    const initialIcon = (icon === undefined)
    ? <Image style={styles.icon} source={icon0} />
    : <Plus color={colors.darkWhite} width={55} height={55}/>;

    const layoutIcon = useRef(initialIcon);

    const layoutTitle = <Text style={styles.title}>
        {(title)? title : language.addLayout}
    </Text>;

    return (
        <TouchableOpacity>
            <View style={backgroundStyle}>
                {layoutIcon.current}
                {layoutTitle}
            </View>    
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 126,
        height: 150,
        borderWidth: 2,
        borderRadius: 23,
        borderColor: colors.darkWhite,
    },
    icon: {
        width: 69,
        height: 69,
    },
    title: {
        fontFamily: 'Nunito',
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
    }
});