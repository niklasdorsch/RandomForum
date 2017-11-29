import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

const LoginSwitch = class extends Component {
  render() {
    return  <Redirect to='/login'  />
  }
}

export default LoginSwitch;