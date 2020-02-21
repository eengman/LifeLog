/* eslint-disable prettier/prettier */
import React from 'react';
import Navigator from './routes/drawer';
import tag from './screens/components/tag';


export default function App() {
    
    global.tags = [
        { tagg: new tag("Water", 0), key: "Water"},
        { tagg: new tag("LifeLog", 10), key: "LifeLog" },
        { tagg: new tag("Cool", 5), key: "Cool"},
    ];
    global.recently = "Default";
    
    const addTracker = (name) => {
      console.log('hello from app.js');
      const obj = {tagg: new tag(name, 0), key: name,};
            global.tags = [...global.tags, obj];
            console.log(this.state.tags);
            console.log("Detected new tracker");
    }

    //const worker = {
      //addTracker,
    //};

    module.exports = addTracker;

  return (
    <Navigator />
    );
}


