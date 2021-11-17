import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { Row } from '../Flex';
import Button from '../Button/Button';
import { selectedTheme as theme} from '../../common/themes/theme';
import ProgressBar from '../ProgressBar/ProgressBar';
import PositionableElement from '../Positionable';
import soundlevels from '../../common/img/playerlevels.png';
import playicon from '../../common/img/playicon.png';
import pauseicon from '../../common/img/pauseicon.png';
import volumeicon from '../../common/img/volumeicon.png';
import backwardicon from '../../common/svg/media-skip-backward.svg';
import forwardicon from '../../common/svg/media-skip-forward.svg';

const AudioContainer=styled.div`
    width: ${props => props.totalwidth};
    position: relative;
    border-radius: 10%;
    box-shadow: 2px;
`

const TrackNameContainer=styled.div`
    font-size: 14px;
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

const AudioSkipControl=styled(SVG)`
    width: 16px;
    cursor: pointer;
`

const AudioTimeText=styled.span`
    font-size: 8px;
    font-family: monospace;
    display: flex;
    align-items: center;
    height: 100%;
`

function AudioPlayer({pixelwidth, track, ...props}) {
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
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const changeRange = (e) => {
        //e.preventDefault();
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
            <audio ref={audioPlayer} src={track.audioSrc} preload="metadata"></audio>
            <div>
                <PlayPauseButton src={isPlaying? pauseicon :playicon}
                width={pixelwidth/4} onClick={togglePlayPause}/>
                <SoundLevel width={pixelwidth} src={soundlevels}/>
                <TrackNameContainer paddingl={pixelwidth/4 +"px"}>
                    {track.title} - {track.artist}
                </TrackNameContainer>
            </div>
            <Row height="25px">
                <PositionableElement
                width={pixelwidth/4 + "px"}
                position="relative"
                left="-10px"
                className="col-12 col-3 h-100">
                    <Row justify="center" center className="h-100">
                        <AudioSkipControl src={backwardicon} className="me-1"></AudioSkipControl>
                        <AudioSkipControl src={forwardicon} className="ms-1"></AudioSkipControl>               
                    </Row>
                </PositionableElement>

                <Row
                width={pixelwidth*3/4}
                name="audio-timer-controls"
                className="col-9 align-items-center h-100">
                    {/* current time */}
                    <AudioTimeText className="me-1">
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
                    <AudioTimeText className="ms-1">
                        {duration  && !isNaN(duration)? calculateTime(duration) : "-"}
                    </AudioTimeText>
                </Row>
            </Row>
        </AudioContainer>
    )
}

export { AudioPlayer };
export default AudioPlayer;