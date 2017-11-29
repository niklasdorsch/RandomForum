import React, { Component } from 'react';
import LoginControl from './LoginControl.js'
import RegisterModal from './RegisterModal.js'


const LoginPage = class extends Component {

	constructor(...args) {
	    super(...args); 
	    this.state = {
	        modalIsActive: false
	      };
	}
	toggleModal = () => {
		console.log("here");
		this.setState(
			(prevState, props) => {
          		return {modalIsActive : !prevState.modalIsActive};
        	}
    	)
	} 
	render() {
	    return <div className="section">
	    			<div className="container">
	    				<LoginControl method={this.props.method} toggleRegister={this.toggleModal}/>
	    			</div>
	    			<RegisterModal active={this.state.modalIsActive} toggleRegister={this.toggleModal}/>
	    		</div>;

	}
}
export default LoginPage;