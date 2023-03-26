import { FlatList, StyleSheet } from "react-native";
import Layout from "./Layout";


type layoutThumbnail = {
    id: number,
    title: string | undefined,
    color: string | undefined,
    icon: number | undefined,
}

const layoutThumbnails: layoutThumbnail[] =[
    {
        id: 0,
        title: undefined,
        color: undefined,
        icon: 0,
    }
]

export default function LayoutList(){
    return (
        <FlatList
            keyExtractor={item => `${item.id}`}
            horizontal={false}
            style={styles.list}
            data={layoutThumbnails}
            renderItem={list => 
                <Layout 
                    background={list.item.color}
                    title={list.item.title}
                    icon={list.item.icon}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    list:{
        flexGrow: 0,
    },
})