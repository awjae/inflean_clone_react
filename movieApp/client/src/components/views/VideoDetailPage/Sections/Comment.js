import React from 'react'

function Comment() {
    return (
        <div>
            <br />
            <p> Replies </p>
            <br />


            <form style={{ display: 'flex'}} onSubmit>
                <textarea
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange
                    value
                    placeholder="코맨트를 작성해 주세요"
                >

                </textarea>
                <br />
                <button style={{ width:'20%', height: '52%' }} onClick>Submit</button>
            </form>

        </div>
    )
}

export default Comment
