
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import '../common/fonts/intro-rust/intro Regular/@font-face/stylesheet.css';

import { Row } from './Flex';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import AudioUploader from './AudioUploader/AudioUploader';
import headphones from '../common/img/headphones.png';

const TracksHeader=styled.h2`
    font-family: Intro;
`

function Tracks() {
    const track =  {
        title: "Symphony No.6",
        artist: "Beethoven",
        audioSrc: "https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3"
    }
    return (
        <>
            <img width="60px"
                src={headphones}
                className="d-inline-block"/>
            <TracksHeader className="d-inline-block">Tracks</TracksHeader>
            <Row justify="center">
                <AudioPlayer pixelwidth="280" track={track}/>
            </Row>
            <Row justify="center">
                <AudioUploader/> 
            </Row>
        </>
    );
}

export default Tracks;
