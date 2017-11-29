import React, { Component } from 'react';

const RegisterModal = class extends Component {
	constructor(...args) {
    	super(...args);
      this.state = {
        name : "",
        pass : ""
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
	 }
	submitUser = () => {
		if(this.state.name.length < 1 || this.state.pass.length < 1) return;
		fetch("/api/user", {
        method: "POST",
        headers: new Headers({
	      'Content-Type': 'application/json',
	      Accept: 'application/json',
	    }),
        body: JSON.stringify({
        	name : this.state.name,
        	pass : this.state.pass
        	})
     	})
	    .then( response => {
	        if(!response.ok) {
	          throw Error("API call failed");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	this.props.toggleRegister();
	    })
	    .catch((e) => {
	          console.log("Error occused while creating a user:"+ e);
	        }
	     );
	}
  	render() {
  		let activeClass = "modal";
  		if (this.props.active) activeClass = "modal is-active";
 	return <div className={activeClass}>
		<div className="modal-background">
		</div>
		<div className="modal-card">
		    <header className="modal-card-head">
		      <p className="modal-card-title">Register New User</p>
		    </header>
		    <section className="modal-card-body">
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


		    </section>
		    <footer className="modal-card-foot">
		      <button onClick={this.submitUser} className="button is-success">Register</button>
		      <button onClick={this.props.toggleRegister} className="button">Cancel</button>
		    </footer>
		</div>
		<button onClick={this.props.toggleRegister} className="modal-close is-large" aria-label="close"></button>
	</div>;
  	}

}

export default RegisterModal;