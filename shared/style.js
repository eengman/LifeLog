/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Button, StyleSheet  } from 'react-native';
import React from 'react';

'use strict';

let headerColor = 'white';

function changeHeaderColor(color) {
    headerColor = color;
    console.log("Header color changed");
}

const worker = {
    worker1: function(color){
        headerColor = color;
        console.log("Header color changed");
    },
    headerColor,
};

export default worker;