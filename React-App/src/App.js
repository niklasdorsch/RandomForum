import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Toolbar from './Toolbar.js'
import LoginPage from './LoginPage.js'
import NotFound from './NotFound.js'
import Home from './Home.js'
import LoginSwitch from './LoginSwitch.js'
import UploadImagePage from './UploadImagePage.js'
import 'bulma/css/bulma.css'

const RedirectHome = class extends Component {
  render() {
    return <Redirect to='/'  />;
  }
}



class App extends Component {
  constructor(...args) {
    super(...args);
    this.handelLogin = this.handelLogin.bind(this);

    this.state = {
      id: "",
      name: "",
      requestFailed : false,
      loggedIn : false

    };
  }

  componentDidMount() {

  }

  handelLogin(info) {
    this.setState(
      { loggedIn : info.login,
        id       : info.id,
        name     : info.name}
    )
  }
  handelLogout = () => {
    this.setState(
      {loggedIn : false,
       id       : null}
    )
  }
  

  render() {
    var elements = null;
    let userInfo = {id : this.state.id,
                    name : this.state.name}
    if (this.state.loggedIn) {
      elements = (
          <div>
            <Toolbar handleLogout={this.handelLogout} userName={this.state.name} userID={this.state.id}/>
            <Switch>
              <Route exact path="/" render={(props) => (
                <Home {...props} userInfo={userInfo}/>)} />
              <Route path="/login" component={RedirectHome}/>
              <Route path="/upload" render={(props) => (
                <UploadImagePage userID={this.state.id}/>  )} />
              
              <Route path="*" component={NotFound}/>
            </Switch>
          </div>
            );
              
    } else {
      elements =  <Switch>
                    <Route exact path="/login" render={(props) => (
                        <LoginPage {...props} method={this.handelLogin} />)} />
                    <Route component={LoginSwitch}/>
                  </Switch>;
    }

    return (
      <BrowserRouter>

        <div className="App">
            {elements}
            
        
        </div>
     </BrowserRouter>

    );
  }
}

export default App;
