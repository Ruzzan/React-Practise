import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './css/style.css';
import HomePage from './components/home';
import Poke from './components/poke';
import Weather from './components/weather';
import Todo from './components/todo';

const App = () => {
    return (
        <main>
        <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/pokemon" component={Poke}/>
        <Route path="/weather" component={Weather} />
        <Route path="/todo" component={Todo}/>
        </Switch>
        </main>
    )
}

export default App;