import { FlatList, StyleSheet } from "react-native";
import { colors } from "../../colors";
import User from "./User";

type user = {
    id: number;
    name: string | undefined,
    avatarSeed: string | undefined,
}

const users: user[] =[
    {
        id: 1,
        name: 'Flint',
        avatarSeed: 'flint',
    },
    {
        id: 2,
        name: 'Vane',
        avatarSeed: 'Vane',
    },
    {
        id: 3,
        name: 'Jack',
        avatarSeed: 'Jack',
    },
    {
        id: 4,
        name: undefined,
        avatarSeed: undefined,
    }
]

export default function UserList(){
    return (
        <FlatList
            keyExtractor={item => `${item.id}`}
            numColumns={2}
            contentContainerStyle={styles.center}
            horizontal={false}
            style={styles.list}
            data={users}
            renderItem={userList => 
                <User 
                    name={userList.item.name}
                    avatarSeed={userList.item.avatarSeed}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    list:{
        flexGrow: 0,
    },
    center: {
        alignItems: 'center',
    }
});