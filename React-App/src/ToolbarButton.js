import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

const ToolbarButton = withRouter(class extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      path: this.props.path
    };
  }
  pushNewHistroy = () => {
    console.log(this.props)
    console.log(this.state.path);
    console.log(this.props.history.location.pathname);
    if (this.props.history.location.pathname
      !== this.state.path) 
    {
      this.props.history.push(
      this.state.path);
    }
  }
  

  render() {
    var className = "navbar-item is-tab";
    if (this.state.path === this.props.history.location.pathname) className = " navbar-item is-tab is-active";
    return <div>
              <a  className={className} onClick={this.pushNewHistroy}>{this.props.children}</a>
           </div>
  }
});

export default ToolbarButton