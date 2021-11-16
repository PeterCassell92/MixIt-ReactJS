import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { Row } from '../Flex';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import PositionableElement from '../Positionable';
import soundlevels from '../../common/img/playerlevels.png';
import headphones from '../../common/img/headphones.png';
import playicon from '../../common/img/playicon.png';
import pauseicon from '../../common/img/pauseicon.png';
import volumeicon from '../../common/img/volumeicon.png';
import backwardicon from '../../common/svg/media-skip-backward.svg';
import forwardicon from '../../common/svg/media-skip-forward.svg';

const AudioContainer=styled.div`
    width: ${props => props.totalwidth};
    position: relative;
`

const TrackNameContainer=styled.div`
    padding-left: ${props => props.paddingl? props.paddingl: 0 };
`

const PlayPauseButton=styled.img`
    position: absolute;
    left: -10px;
    top: 24px;
    z-index: 2;
    cursor: pointer;
`

const SoundLevel=styled.img`
position: relative;
left: 0px;
z-index: 1;
`

const AudioTimeText=styled.span`
    font-size: 10px;
    font-family: monospace;
`

function AudioPlayer({pixelwidth, audioSrc, ...props}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    
    //references
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();   

    useEffect(() => {
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
        }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);


    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60);
        const returnedMinutes= minutes < 10 ? `0${minutes}`:`${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds =  seconds < 10 ? `0${seconds}`:`${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const changeRange = (e) => {
        audioPlayer.current.currentTime = progressBar.current.value;
        setCurrentTime(progressBar.current.value);
    }


    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value - 30);
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        //useState is async so we use a proxy value;
        setIsPlaying(!prevValue);
        
        //from paused to play state
        if(!prevValue){
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            console.log(audioPlayer.current);
            console.log("aud current time " + audioPlayer.current.currentTime);
        }
        //from play to paused state
        else{
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        setCurrentTime(progressBar.current.value);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }
    return (
        <AudioContainer totalwidth={pixelwidth + "px"}>
            <audio ref={audioPlayer} src={audioSrc} preload="metadata"></audio>
            <div>
                <PlayPauseButton src={isPlaying? pauseicon :playicon}
                width={pixelwidth/4} onClick={togglePlayPause}/>
                <SoundLevel width={pixelwidth} src={soundlevels}/>
                <TrackNameContainer paddingl={pixelwidth/4 +"px"}>
                    TRACKNAME
                </TrackNameContainer>
            </div>
            <Row>
                <PositionableElement
                width={pixelwidth/4 + "px"}
                position="relative"
                left="-10px"
                className="col-12 col-3">
                    <Row justify="center">
                        <SVG src={backwardicon} width="20px" className="mx-1"></SVG>
                        <SVG width="20px" src={forwardicon} className="mx-1"></SVG>               
                    </Row>
                </PositionableElement>

                <Row
                width={pixelwidth*3/4}
                name="audio-timer-controls"
                className="col-9 align-items-center">
                    {/* current time */}
                    <AudioTimeText className="mx-1">
                        {calculateTime(currentTime)}
                    </AudioTimeText>
                    {/* Progress bar */}
                    <ProgressBar
                        type="range"
                        defaultValue={0}
                        ref={progressBar}
                        onChange={changeRange}
                        max={duration}
                        increment={isPlaying}
                        />
                    {/* duration */}
                    <AudioTimeText className="mx-1">
                        {duration  && !isNaN(duration)? calculateTime(duration) : "-"}
                    </AudioTimeText>
                </Row>
            </Row>
        </AudioContainer>
    )
}

export { AudioPlayer };
export default AudioPlayer;