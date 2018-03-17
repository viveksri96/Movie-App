import React, { Component } from 'react';
import { store } from './redux/store';
import {Provider} from 'react-redux'
import List from './List'
import { persistStore } from 'redux-persist'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Movie from './Movie';


class App extends Component{

  render() {
    let persistor = persistStore(store)
    return(
      <Provider store={store} persistor={persistor}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/movie/:id" render={(routeProps) => <Movie {...routeProps}/>}/>
              <Route exact path="/" render={(routeProps) => <List {...routeProps}/>}/>
              <Route path="/"
                render={() => (
                  <h1 style={{alignItems: 'center', color: 'white', display: 'flex', height: '100vh', justifyContent: 'center'}}>404 NOT FOUND</h1>
              )}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
