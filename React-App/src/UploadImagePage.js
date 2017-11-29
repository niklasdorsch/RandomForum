import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ProfileAvatar from "./ProfileAvatar.js"


const CLOUDINARY_UPLOAD_PRESET = 'vv80tt5x';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dktndynzj/upload';


const UploadImagePage = class extends Component {
	constructor(props) {
		super(props);
		 this.state = {
	      uploadedFileCloudinaryUrl: ''
	    };
	}
	componentDidMount() {
		this.getImage();
	}

	onImageDrop(files) {
	    this.setState({
	        uploadedFile: files[0]
	    });

	    this.handleImageUpload(files[0]);
	}
	handleImageUpload(file) {
		console.log(file);
	    let upload = request.post(CLOUDINARY_UPLOAD_URL)
	                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
	                        .field('file', file);

	    upload.end((err, response) => {
	      if (err) {
	        console.error(err);
	      }

	      if (response.body.secure_url !== '') {
	        this.setState({
	          uploadedFileCloudinaryUrl: response.body.secure_url
	        });
	        this.setUserPic(response.body.secure_url);
	      }
	    });
	  }
	setUserPic(url) {
		fetch("/api/user/pic", {
	        method: "PUT",
	        headers: new Headers({
		      'Content-Type': 'application/json',
		      Accept: 'application/json',
		    }),
	        body: JSON.stringify({
	        	newUrl : url,
	        	id : this.props.userID
	        	})
	     	})
	    .then( response => {
	    	console.log(response);
	        if(!response.ok) {
	          throw Error("API call failed during pic url upload post. See setUserPic method");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	console.log(response);
	    })
	    .catch((e) => {
	          console.log("Error occured while updating Pic:"+ e);
	        }
	     );
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
	    		uploadedFileCloudinaryUrl : response.profilePicUrl
	    	});
	    })
	    .catch((e) => {
	          console.log("Error occused while grabbing image:"+ e);
	        }
	     );
  	}
 

	render() {
		return <div> 

		<div className="section">
			<div className="container">
				<div className="columns">
					<div className="column">

						<div className="hero">
							<h1 className="subtitle">Upload Image</h1>
						</div>
						<br/>
						<Dropzone
					      multiple={false}
					      accept="image/*"
					      onDrop={this.onImageDrop.bind(this)}>
					      <div className="box no-shadow">Drop an image or click to select a file to upload.</div>
					    </Dropzone>
					</div>
					<div className="column">

						<div className="hero">
							<h1 className="subtitle">Current Image</h1>
						</div>
						<br/>
						<figure class="image is-square">
							<img src={this.state.uploadedFileCloudinaryUrl} />
						</figure>
					</div>
				</div>
			</div>
		</div>   


			    </div>
	}
}

export default UploadImagePage;