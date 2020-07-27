import React,{ useEffect, useState } from 'react'
import SingleComment from "./SingleComment";

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if(comment.reponseTo === props.parentCommentId) {
                commentNumber++
            }
        })

    }, [])

    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <React.Fragment>
            {
                comment.reponseTo === parentCommentId &&
               <div style={{ width:'80%', marginLeft:'40px'}}>
                   <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId}/>
                   <ReplyComment commentLists={props.commentLists}/>
               </div>
            }
            </React.Fragment>
        ))
    }

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
