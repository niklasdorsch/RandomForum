import React, { Component } from 'react';
import NameForm from './NameForm.js';


const LoginControl = class extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {  isLoggedIn: false,
                    loginFailed: false,
                    name: "niklas",
                    pass: "hello",
                    id: ""};
  }
  request = function(user,password) {
      return fetch("/api/user/" + user + "/" + password, {
        method: "GET",
      })
      .then( response => {
        if(!response.ok) {
          throw Error("API call failed");
        }
        return response;
      })
      .then(r => r.json())
      .then(response => {
        if(!response.login) {
          throw Error("Wrong Password");
        }
        return response;
      })
      .catch((e) => {
          console.log("Error occused while logging in:"+ e);
        }
      );
  }

  handleLoginClick() {
    const scope = this;
    this.setState({isLoggedIn: true});
    this.request(this.state.name,this.state.pass).then(
      (r) => {
        if (r && r.login) {
          this.setState({
            isLoggedIn: true,
            loginFailed : false,
            id: r.id
          })
          scope.props.method(r);
        } else {
          this.setState({
            loginFailed : true
          });
          
        }
      }
    )
  }



  handleFormSubmit(name,value) {
    if (name === "name") this.setState( {name:value});
    if (name === "pass") this.setState( {pass:value});
  }

  render() {
    let failedText = null
    if (this.state.loginFailed) failedText = <div className="has-text-danger is-size-4 has-text-weight-bold">Login Failed</div>;

    return (
      <div>
        <h1 className="title">Please sign in.</h1>
        <NameForm method={this.handleFormSubmit} />
        <br/>
        <div className="field is-grouped">
          <p className="control">
            <button  onClick={this.handleLoginClick} className="button is-success">Login</button>
          </p>
          <p className="control">
            <button onClick={this.props.toggleRegister} className="button is-link">Register</button>
          </p>
        </div>
         {failedText}
      </div>
    );
  }
}




export default LoginControl;
