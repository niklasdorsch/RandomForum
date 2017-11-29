import React, { Component } from 'react';
import Moment from 'react-moment';
import TextForm from "./TextForm.js"
import Comment from "./Comment.js"
import ProfileAvatar from "./ProfileAvatar.js"

const Home = class extends Component {
	constructor(...args) {
    	super(...args);
      this.state = {
        showComments : false,
        newCommentContent : "",
        showEdit : false,
        newEditContent : ""
      };

  	}
  updateCommentContent = (event) => {
    this.setState({
          newCommentContent : event.target.value
      });
  }

  toggleComment = () => {
    this.setState((prevState, props) => {
          return {showComments : !prevState.showComments};
        }
    )
  } 
  addComment = () => {
    let info = {
      content : this.state.newCommentContent,
      postID : this.props.post._id
    };
    this.props.addComment(info);
    this.setState({newCommentContent:"",
                    showComments: false})
  }
  toggleEdit = () => {
    this.setState((prevState, props) => {
        return {showEdit : !prevState.showEdit,
              newEditContent : ""
        };
      }
    )
  }
  updateEditContent = (event) => {
    this.setState({
          newEditContent : event.target.value
      });
  }
  editPost = () => {
    let info = {
      content : this.state.newEditContent,
      postID : this.props.post._id
    };
    this.props.editPost(info);
    this.toggleEdit();
  }

 


	render() {
    let commentSection = <div></div>;
    if(this.state.showComments){ 
      commentSection = <div><br/>
                      <TextForm updateContent={this.updateCommentContent}
                        submitButton={this.addComment}
                        cancelButton={this.toggleComment}
                      >Submit Comment</TextForm></div>;
                    
    }

    let editButton = null;
    if (this.props.post.canUpdate) {
      editButton = <span> · <a onClick={this.toggleEdit}>Edit</a></span>;
    }
    let postContent = <p>{this.props.post.content}</p>;
    if(this.state.showEdit) {
      postContent = <TextForm updateContent={this.updateEditContent}
                        submitButton={this.editPost}
                        cancelButton={this.toggleEdit}
                        postContent={this.props.post.content}
                        >Submit Edit</TextForm>
    }

		return <div className="has-shadow box">
<article className="media">
  <figure className="media-left">
    <ProfileAvatar userID={this.props.post.authorID}/>
  </figure>
  <div className="media-content">

    <div className="content">
      <p>
        <strong>{this.props.post.author}</strong>
      </p>
          {postContent}
      <p>
        <small><a onClick={this.toggleComment}>Comment</a>{editButton} · Posted <Moment fromNow={true}>{this.props.post.createdAt}</Moment></small>
      </p>
    </div>

    {this.props.post.comments.map((comment,i) => {
          return <Comment comment={comment} edit={this.props.editComment} postID={this.props.post._id} key={i}/>;      
      })}

  </div>
</article>

{commentSection}

    <br/>
    </div>

	}

}
export default Home;
