import React, { Component } from 'react';


const ProfileAvatar = class extends Component {

	constructor(...args) {
    	super(...args);
    	this.state = {
      		url : ""
    	};
  	}
  	componentDidMount() {
  		this.getImage();
  	}

  	getImage = () => {
  		fetch("/api/user/pic/"+this.props.userID, {
        method: "GET"
     	})
	    .then( response => {
	        if(!response.ok) {
	          throw Error("API call failed while getting image");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	this.setState({
	    		url : response.profilePicUrl
	    	});
	    })
	    .catch((e) => {
	          console.log("Error occused while grabbing image:"+ e);
	        }
	     );
  	}



	render() {
		return <div>
				<figure class="image is-64x64">
					<img src={this.state.url}/>
				</figure>
		</div>
	}
}
export default ProfileAvatar;