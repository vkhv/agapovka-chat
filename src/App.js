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
const ENTER_KEYCODE = 13;
class App extends React.Component {
    constructor(p) {
        super(p);
        firebase.initializeApp(config);
        this.state = {
            messages: [],
            outcommingMessage: ''
        };
        this.database = firebase.database();
    }
    componentDidMount() {

        const database = this.database;

        database.ref('chat').on('value', (snapshot) => {
            const messages = snapshot.val();
            this.setState({messages: Object.values(messages || [])}, () => window.scrollTo(0 ,document.body.scrollHeight))
        })
    }

    putData() {
        if(!this.state.outcommingMessage) {
            return;
        }
        this.database.ref('chat').update({[Date.now()]: this.state.outcommingMessage});

        window.scrollTo(0 ,document.body.scrollHeight);

        this.setState({outcommingMessage: ''})
    }

    showTooltip() {
        console.log(localStorage.getItem('newbie') === null)

        if(localStorage.getItem('newbie') !== null) {
            return
        }
        localStorage.setItem('newbie', false);
        return <div className="outCommingMessage message">Анонимный чат</div>
    }

    render() {

       return <div className='wrapper'>
           {
               this.state.messages.map((message, i) => <div className='incomingMessage message' key={i}>{message}</div>)
           }
           {
               this.showTooltip()
           }
           <input
               value={this.state.outcommingMessage}
               onChange={(e) => this.setState({outcommingMessage: e.target.value})}
               onKeyDown={event => {
                   event.keyCode === ENTER_KEYCODE && this.putData(this.state.outcommingMessage)
               }}
               placeholder='Введите текст'
               type="text"
           />
               <button onClick={() => this.putData(this.state.outcommingMessage)}>
                   <a className="arrow arrow-right" title="Next"></a>
               </button>
       </div>
   }
}

export default App;
