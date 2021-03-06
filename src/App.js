import React from 'react';
import {initializeApp, database} from 'firebase';
import 'loaders.css';
import './App.css';
import config from './config';
const ENTER_KEYCODE = 13;
const loader = <div className='spiner-center-wrapper'>
    <div class="ball-scale-ripple"><div></div></div>
</div>

class App extends React.Component {
    constructor(p) {
        super(p);
        initializeApp(config);
        this.state = {
            messages: [],
            outcommingMessage: ''
        };
        this.database = database();
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

        if(localStorage.getItem('newbie') !== null) {
            return
        }
        localStorage.setItem('newbie', false);
        return <div className="outCommingMessage message">Вы можете оставить свое объявление. Для этого используйте форму снизу</div>
    }

    render() {

       return this.state.messages.length ?
            <div className='wrapper'>
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
                        <span className="arrow arrow-right" title="Next"></span>
                    </button>
            </div>
        : loader;
   }
}

export default App;
