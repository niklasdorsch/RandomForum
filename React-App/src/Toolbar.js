import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ToolbarButton from "./ToolbarButton.js"


const Toolbar = withRouter(class extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      path: '/leagues',
    };
  }



  render() {
    const paths =  [
            {path:"/",name:"Home"},
            {path:"upload",name:"Upload Profile Picture"}
            ];
    return <div> 
              <div className="hero is-primary ">
                <div className="container">

                  <div className="columns">
                    <div className="column">
                      <div className="title">RandomForum</div>
                    </div>
                    <div className="column">
                      <div className="subtitle is-pulled-right">

                        You are signed in as {this.props.userName}

                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <nav className=" navbar has-shadow tabs is-centered">
                <div className="container">
                  <ul>
                    {paths.map(({path,name},i) => {
                      return <ToolbarButton key={i} path={path}>{name}</ToolbarButton>
                    })}
                    <div>
                      <a className="navbar-item is-tab" onClick={this.props.handleLogout}>Logout </a>
                    </div>
                  </ul>
                </div>
              </nav>

          </div>
  }
});

export default Toolbar