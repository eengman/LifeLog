/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons'; 
export default function Header({ navigation, title }) {

    const openMenu = () => {
        navigation.openDrawer();
    }
    let screenIcon = "md-home";
    if(title === "Completed"){
        screenIcon = "md-checkmark-circle-outline";
    }

    return(
        <View style={styles.header}>
            
            <TouchableOpacity style={{color: '#5c5a5a'}} onPress={openMenu}>
            <Icon
                name="md-menu"
                size={35}
                        />
            </TouchableOpacity> 

            <View style={{paddingLeft: 25}}>
                <Icon
                name= {screenIcon}
                size={35}
                        />
            </View>

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
        letterSpacing: 2,
        padding: 24
    },
});