import React, { Component } from 'react';
import Moment from 'react-moment';
import TextForm from "./TextForm.js"
import ProfileAvatar from "./ProfileAvatar.js"


const Comment = class extends Component {
	constructor(props) {
    super(props);

    this.state = { 
    	showEdit :false,
    	newEditContent : ""
    };
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
  	console.log(event.target.value);
    this.setState({
          newEditContent : event.target.value
      });
  }
  editComment = () => {
    let info = {
      postID : this.props.postID,
      content : this.state.newEditContent,
      commentID : this.props.comment._id
    };
    console.log(info);
    this.props.edit(info);
    this.toggleEdit();
  }

  render() {
  	let editButton = null;
    if (this.props.comment.canUpdate) {
      editButton = <span><a onClick={this.toggleEdit}>Edit</a> · </span>;
    }
    let commentContent = <p>{this.props.comment.content}</p>;
    if(this.state.showEdit) {
      commentContent = <TextForm updateContent={this.updateEditContent}
                        submitButton={this.editComment}
                        cancelButton={this.toggleEdit}
                        postContent={this.props.comment.content}
                        >Submit Edit</TextForm>
    }
      return ( <article className="media">
                <figure className="media-left">
                  <ProfileAvatar userID={this.props.comment.authorID}/>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{this.props.comment.author}</strong>
                    </p>
          				{commentContent}
      				<p>
                      <small>{editButton}Commented <Moment fromNow={true}>{this.props.comment.createdAt}</Moment></small>
                    </p>
                  </div>
                </div>
              </article>);
      



  }
}
export default Comment;
