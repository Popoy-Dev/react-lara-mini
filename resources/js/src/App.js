import React, { Component } from 'react'
import ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import View from "./components/View"
import Find from "./components/Find"

import Type from './components/Type'

const App = () => {
    return (
        <Router className="App_Container">
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/view/:band_name">
                    <View/>
                </Route>
                <Route path="/add">
                    <Add/>
                </Route>
                <Route path="/edit/:id">
                    <Edit/>
                </Route>
                <Route path="/find">
                    <Find/>
                </Route>
                <Route>
                    <Type/>
                </Route>
               
               
                
            </Switch>
        </Router>
    );
};


ReactDom.render(<App/>, document.getElementById('app'));