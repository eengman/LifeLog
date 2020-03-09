/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
//import { Icon } from 'react-native-elements';
export default function Header({ navigation, title }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return(
        <View style={styles.header}>
            
            <TouchableOpacity style={{color: '#5c5a5a', borderWidth: 1, borderColor: 'white'}} onPress={openMenu}>
                <Text style={{fontSize: 20}}>||||</Text>
            </TouchableOpacity> 
            
            <View>
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        </View>
    );
}
// old header color "#074e67"

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#5c5a5a',
        fontFamily: 'monospace',
        //letterSpacing: 3,
        padding: 24
    },
});