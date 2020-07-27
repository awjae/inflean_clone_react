import React from 'react'
import { Tooltip, Icon } from 'antd'

function LikeDislikes() {
    return (
        <div>
            <span ket ="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme="liked"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> 1</span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme="disliked"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto' }}> 1 </span>
            </span>
        </div>
    )
}

export default LikeDislikes
