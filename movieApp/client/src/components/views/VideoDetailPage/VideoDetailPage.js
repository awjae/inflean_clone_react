import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [Comment, setComment] = useState("")
    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable) 
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오길 잘한거야')
                }
            })

    }, [])

    if(VideoDetail.writer) {
        
        const subscribeBurron = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>

                <div style={{width: '100%', padding: '3rem 4rem'}}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />

                    <List.Item 
                        actions={[subscribeBurron]}

                        >
                        <List.Item.Meta
                            avatar= {<Avatar src={VideoDetail.writer.image}/> } 
                            title= {VideoDetail.writer.name}
                            description = {VideoDetail.description}
                            >


                        </List.Item.Meta>

                    </List.Item>
                    <Comment />
                </div>

            </Col>
            <Col lg={6} xs={24}>
                
                <SideVideo></SideVideo>

            </Col>
        </Row>
        )
    } else {
        return (
            <div>...Loading</div>
        )
    }
}

export default VideoDetailPage