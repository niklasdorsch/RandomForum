import React, { Component } from 'react';

const TextForm = class extends Component {
	constructor(...args) {
	    super(...args);
	    this.state = {
			text: this.props.postContent
	    };
    }
    updateVal= (event) => {
    	let val = event.target.value;
    	this.setState(
    		{text: val}
    	);
    	this.props.updateContent(event);
    }


	render() {
		return <div>
			<article className="media">
			  <div className="media-content">
			    <div className="field">
			      <p className="control">
			        <textarea type="text" value={this.state.text} onChange={this.updateVal} className="textarea" placeholder="Add a comment...">{this.props.postContent}</textarea>
			      </p>
			    </div>
			    <div className="field is-grouped">
			      <p className="control">
			        <button onClick={this.props.submitButton}className="button is-success">{this.props.children}</button>
			      </p>
			      <p className="control">
			        <button onClick={this.props.cancelButton} className="button">Cancel</button>
			      </p>
			    </div>
			  </div>
			</article>
		</div>;
	}
}

export default TextForm;