/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Tag extends Component {
    constructor(name, c) {
        super()
        this.state = {
            tag_name: name,
            key: name,
            count: c,
        }
    }

} export default Tag