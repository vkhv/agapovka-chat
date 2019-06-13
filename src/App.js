import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import './App.css';
var config = {
    apiKey: "AIzaSyCVvijZimUxlVaB_lRA3ewKv2C0jwsSK7Y",
    authDomain: "agapovka-ccb77.firebaseapp.com",
    databaseURL: "https://agapovka-ccb77.firebaseio.com",
    projectId: "agapovka-ccb77",
    storageBucket: "agapovka-ccb77.appspot.com",
    messagingSenderId: "523006834768"
};

class App extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            messages: []
        }
    }
    componentDidMount() {

        firebase.initializeApp(config);
        const database = firebase.database();

        database.ref('chat').on('value', (snapshot) => {
            const messages = snapshot.val();
            this.setState({messages: Object.values(messages)})
        })
    }

    render() {

       return this.state.messages.map((message, i) => <div className='wrapper' key={i}>
           <div className='incomingMessage message'>{message}</div>

           <div className="outCommingMessage message">Как тебя зовут?</div>
           <input placeholder='Введите текст' type="text"/>
       </div>)
   }
}

export default App;
