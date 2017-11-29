import React, { Component } from 'react';
import Post from "./Post.js"
import TextForm from "./TextForm.js"

const Home = class extends Component {
	constructor(...args) {
    	super(...args);
    	this.state = {
    		posts : [],
      		showNewPost : false,
      		newPostContent : ""
    	};
  	}
  	toggleNewPost = () => {
	    this.setState((prevState, props) => {
	          return {showNewPost : !prevState.showNewPost,
	          		  newPostContent : ""
	          };
	        }
	    )
	}
	updatePostContent = (event) => {
		this.setState({
      		newPostContent : event.target.value
    	});
	}
	addNewPost = () => {
		if(this.state.newPostContent.length < 1) return;
		fetch("/api/post", {
        method: "POST",
        headers: new Headers({
	      'Content-Type': 'application/json',
	      Accept: 'application/json',
	    }),
        body: JSON.stringify({
        	authorID : this.props.userInfo.id,
        	author: this.props.userInfo.name,
        	content : this.state.newPostContent
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
	    	this.toggleNewPost();
	    	this.loadPosts();
	    })
	    .catch((e) => {
	          console.log("Error occused while posting:"+ e);
	        }
	     );
	}
	loadPosts = () => {
		fetch("/api/post/"+ this.props.userInfo.id , {
        method: "GET"
     	})
	    .then( response => {
	        if(!response.ok) {
	          throw Error("API call failed");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	this.setState(
	    		{posts : response}
	    	);	
	    })
	    .catch((e) => {
	          console.log("Error occused while getting Posts:"+ e);
	        }
	    );
	}
	addComment = (info) => {
		info.name = this.props.userInfo.name;
		info.authorID = this.props.userInfo.id;
		if(info.content.length < 1) return;
		fetch("/api/comment/"+info.postID, {
	        method: "PUT",
	        headers: new Headers({
		      'Content-Type': 'application/json',
		      Accept: 'application/json',
		    }),
	        body: JSON.stringify({
	        	authorID : info.authorID,
	        	author: info.name,
	        	content : info.content
	        	})
	     	})
	    .then( response => {
	        if(!response.ok) {
	          throw Error("API call failed during comment post. See addComment method");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	this.loadPosts();
	    })
	    .catch((e) => {
	          console.log("Error occured while commenting:"+ e);
	        }
	     );
	}
	editPost = (info) => {
		console.log(info);
		fetch("/api/post", {
	        method: "PUT",
	        headers: new Headers({
		      'Content-Type': 'application/json',
		      Accept: 'application/json',
		    }),
	        body: JSON.stringify({
	        	id : info.postID,
	        	updatedContent : info.content,
	        	})
	     	})
	    .then( response => {
	    	console.log(response);
	        if(!response.ok) {
	          throw Error("API call failed during comment post. See addComment method");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	console.log(response);

	    	this.loadPosts();
	    })
	    .catch((e) => {
	          console.log("Error occured while updating Post:"+ e);
	        }
	     );
	}
	editComent = (info) => {
		console.log(info);
		fetch("/api/post/comment", {
	        method: "PUT",
	        headers: new Headers({
		      'Content-Type': 'application/json',
		      Accept: 'application/json',
		    }),
	        body: JSON.stringify({
	        	postID : info.postID,
	        	commentID : info.commentID,
	        	content : info.content
	        	})
	     	})
	    .then( response => {
	    	console.log(response);
	        if(!response.ok) {
	          throw Error("API call failed during comment edit. See editComment method");
	        }
	        return response;
	    })
	    .then(r => r.json())
	    .then(response => {
	    	console.log(response);
	    	this.loadPosts();
	    })
	    .catch((e) => {
	          console.log("Error occured while updating Post:"+ e);
	        }
	     );
	}
	componentDidMount() {
		this.loadPosts();
	}





	render() {
		let commentSection = <div className="field">
	                            <p className="control">
	                                <button onClick={this.toggleNewPost} className="button is-info">New Post</button>
	                            </p>
	                          </div>;
	    if(this.state.showNewPost) { 
	      commentSection =  <TextForm updateContent={this.updatePostContent}
	      								submitButton={this.addNewPost}
	      								cancelButton={this.toggleNewPost}
	      								>Submit Post</TextForm>;
	    }


		return <div>
				<div className="section">
					<div className="container">
						{commentSection}
					</div>
	                <br/>
	                
					{this.state.posts.map((post,i) => {
                    	return <div key={i} className="container">
                    			<Post editPost={this.editPost} editComment={this.editComent} addComment={this.addComment} post={post}/>
                    		<br/>
                    		</div>;
                  	})}

				</div>
			</div>

	}

}
export default Home;
