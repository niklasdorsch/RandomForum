import React, { Component } from 'react';

const NameForm = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.props.method(name,value)
  }


  render() {
    return (
      <form>
        



        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input"
            name="name"
            type="textbox"
            value={this.state.name}
            onChange={this.handleInputChange} />          
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input"
            name="pass"
            type="textbox"
            value={this.state.pass}
            onChange={this.handleInputChange} />          
          </div>
        </div>
      </form>

    );
  }
}

export default NameForm;

