import React from 'react';
import Home from './screens/home';
import Navigator from './routes/drawer';
import tag from './screens/components/tag';

export default function App() {

    global.tags = [
        { tagg: new tag("Water", 0), key: "Water"},
        { tagg: new tag("LifeLog", 10), key: "LifeLog" },
        { tagg: new tag("Cool", 5), key: "Cool"},
    ];
    global.recently = "Default";

  return (
    <Navigator />
    );
}

