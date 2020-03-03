/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
export default function Header({ navigation, title }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return(
        <View style={styles.header}>
            <Button color='#074e67' title='||||' onPress={openMenu} />
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'white',
        letterSpacing: 3,
        padding: 24
    },
});