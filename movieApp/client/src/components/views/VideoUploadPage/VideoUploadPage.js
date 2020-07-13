import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';


const { TextArea } = Input;
const { Title } = Typography;
const PrivateOption = [
    { value : 0, label: "Private" },
    { value : 1, label: "Public" },
]

const CategoryOption = [
    { value: 0, label:"Film & Animation" },
    { value: 1, label:"Autos & Vehicles" },
    { value: 2, label:"Music" },
    { value: 3, label:"Pets & Animals" },
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const [FilePath, setFilePath] = useState("")
    const [FileDuration, setFileDuration] = useState("")
    const [FileName, setFileName] = useState("")
    const [ThubnailPath, setThubnailPath] = useState("")


    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url : response.data.url,
                        fileName : response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if(response.data.success) {
                                console.log(response.data)

                                setFileDuration(response.data.fileDuration)
                                setThubnailPath(response.data.url)
                                setFileName(response.data.FileName)




                            } else {
                               alert('썸네일 생성에 실패했습니다.') 
                            }
                        })


                } else {
                    alert('비디로 업로드를 실패 했습니다.')
                }
            })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: FileDuration, 
            thumbnail: ThubnailPath,
        }
        Axios.post('/api/video/uploadVideo', variable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    message.success('성공적으로 업로드 했습니다.')

                    setTimeout(() => {
                        props.history.push('/video')
                    }, 3000);
                } else {
                    alert('비디오 DB INSERT를 실패 했습니다.')
                }
            })
    }


    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                 <Title level={2}>Uplaod Video</Title>
            </div>
            <Form onSubmi={onSubmit}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* 컨텐츠마무ㅡ리 */}

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width:'300px', height:'240px', border:'1px solid lightgray',
                            alignItems:'center', justifyContent:'center', display:'flex'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize:'3rem'}} />
                            </div>
                        )}

                    </Dropzone>

                    { ThubnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThubnailPath}`} alt={'thumbnail'}/>
                        </div>
                    }
                </div>


                <br/>
                <br/>
                <label>Title</label>
                <Input 
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange} >

                    {PrivateOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
                <br />
                <br />

                <select onChange={onCategoryChange}>

                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
