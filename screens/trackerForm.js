/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import mytrackers from './mytrackers';


export default function TrackerForm( {addTracker }) {

    return(
        <View>
            <Formik
                styles={styles.form}
                initialValues={{ title: '', num: 0}}
                onSubmit={(values) => {
                    addTracker(values);
                    console.log(values);
                }}
            >
                
                {(props) => (
                    <View style={styles.contain}>
                        <TextInput 
                            //style={globalStyles.input}
                            style={styles.input}
                            placeholder='Tracker title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />
                        <TextInput
                            multiline 
                            style={styles.input}
                            //style={globalStyles.input}
                            placeholder='Tracker description'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                        />
                        <TouchableOpacity>
                            <Text style={styles.input}>Click here to scan tracker....</Text>

                        </TouchableOpacity>

                        <Button 
                        title='submit' 
                        color='coral' 
                        onPress={props.handleSubmit}
                        />
                    </View>
                )}

            </Formik>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    contain: {
        padding: 24,
    },
    input: {
        padding: 20,
        fontSize: 20,
    },
    form: {
        
    }
    
    
});