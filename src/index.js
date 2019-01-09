import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingList from './ShoppingList';
import * as serviceWorker from './serviceWorker';
import Game from "./tic-tac-toe";

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<ShoppingList />, document.getElementById('root'));
ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
