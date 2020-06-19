import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../../common/GridCard';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
                
            })

    }, [])


    return (
        <div>
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}>    
            </MainImage>
            <div style={{ width:'85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}></Favorite>
                </div>

                <MovieInfo
                    movie={Movie}>
                </MovieInfo>
                <br></br>
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle && 
                    <Row gutter={[16, 16]}>
                        
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}>
                                        
                                </GridCard>

                            </React.Fragment>

                        ))}

                    </Row>
                }
                

            </div>
            
        </div>
    )
}

export default MovieDetail
