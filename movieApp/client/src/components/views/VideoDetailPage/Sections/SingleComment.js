import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import Axios from 'axios'

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const varibales = {
            content : CommentValue,
            writer : user.userData._id,
            postId : props.postId,
            responseTo : props.comment._id
        }
        Axios.post('/api/comment/saveComment', varibales)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                    setCommentValue("")
                } else {
                    alert('커맨드를 저장하지 못했습니다.')
                }
            })

    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply</span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p> {props.comment.content} </p>}
            />

            { OpenReply && 
                <form style={{ display: 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코맨트를 작성해 주세요"
                    >

                    </textarea>
                    <br />
                    <button style={{ width:'20%', height: '52%' }} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
