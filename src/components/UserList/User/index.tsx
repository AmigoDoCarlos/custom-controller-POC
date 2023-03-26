import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { SvgXml } from "react-native-svg";      
import { colors } from "../../../colors";
import { Plus } from 'react-native-feather';
import { useGlobalContext } from "../../../contexts/GlobalContext";

interface userProps {
    name: string | undefined,
    avatarSeed: string | undefined,
}

export default function User({name, avatarSeed}: userProps){
    const { language } = useGlobalContext();
    const avatar = createAvatar(lorelei, {seed: avatarSeed}).toString();
    
    const icon = (avatarSeed)
    ? <SvgXml xml={avatar} width="100%" height="100%"/>
    : <Plus width={50} height={50} stroke={colors.darkWhite}/>;

    const text = (name)
    ? name
    : language.addUser;

    return (
        <TouchableOpacity>
            <View style={styles.background}>
                <View style={styles.avatar}>
                    {icon}
                </View>
                <View style={styles.usernameView}>
                    <Text style={styles.username}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.greyishBlue,
        borderRadius: 20,
        borderColor: colors.acqua,
        borderWidth: 2,
        width: 120,
        height: 120,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 100,
        height: 90,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameView: {
        backgroundColor: colors.acqua,
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,    
    },
    username: {
        color: colors.darkWhite,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});