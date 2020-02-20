import React from 'react';
import Home from './screens/home';
import Navigator from './routes/drawer';
import tag from './screens/components/tag';
import Login from './screens/login';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { C, createAppContainer } from 'react-navigation';

global.tags = [
    { tagg: new tag("Water", 0), key: "Water" },
    { tagg: new tag("LifeLog", 10), key: "LifeLog" },
    { tagg: new tag("Cool", 5), key: "Cool" },
];
global.recently = "Default";


export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this._loadClient = this._loadClient.bind(this);
    }

    componentDidMount() {
        this._loadClient;
    }

    _loadClient() {

    }

    render() {
        if (true) {
            return (
                <Navigator />
            );
        } else {
            return (
                <Login />
            );
        }
    }
}

