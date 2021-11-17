import { forwardRef, useRef, useState } from "react";
import styled from "styled-components";
import { selectedTheme as theme } from "../../common/themes/theme";
import PropTypes from "prop-types";
import { Row } from "../../components/Flex";
import { useSyncedRef } from "../../common/lib_extensions/react";

const _ProgressBar = styled.input`
    /* Chrome */
    appearance: none;
    background: ${theme.audioplayer.slider.color.barbackground};
    border-radius: 10px;
    position: relative;
    height: ${props => props.barheight};
    outline: none;
    z-index: 1;

    /* Firefox */
    &::-moz-range-track {
        background: ${theme.audioplayer.slider.color.barbackground};
        border-radius: 10px;
        position: relative;
        height: ${props => props.barheight};
        outline:none;
    }

    &::-moz-focus-outer {
        border: 0;
    }

    /* Chrome and Safari*/
    &::before{
        content:'';
        height: ${props => props.barheight};
        width: ${props => props.seekbeforewidth };
        background-color: ${theme.audioplayer.slider.color.seekbefore};
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        position:absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
    }

    /* progress bar firefox */
    &::moz-range-progress {
        background-color: ${theme.audioplayer.slider.color.seekbefore};
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        height: ${props => props.barheight};
    }

    /* knobby -chrome and safari  NOT WORKING! */
    &::webkit-slider-thumb {
        height: 15px;
        width: 25px;
        border-radius: 50%;
        border: none;
        background-color: red !important;
        cursor: pointer;
        z-index: 3;
    }
    &.thumb {
        height: 15px;
        width: 25px;
        border-radius: 50%;
        border: none;
        background-color: red !important;
        cursor: pointer;
        z-index: 3;
    }

    &::active::-webkit-slider-thumb{
        transform: scale(1.2);
        background: ${theme.audioplayer.slider.color.knobbyselected};
    }

    /* knobby firefox */
    &::moz-range-thumb{
        height: 15px;
        width: 15px;
        border-radius: 50%;
        border: none;
        background-color: ${theme.audioplayer.slider.color.knobby};
        cursor: pointer;
        position: relative;
        z-index: 3;
    }

    &:active::moz-range-thumb{
        transform: scale(1.2);
        background: ${theme.audioplayer.slider.color.knobbyselected}
    }
`

const ProgressBar = forwardRef(({defaultValue, onChange, animate , barheight,  max, increment, ...props}, ref) =>
 {
    // const barRef = useSyncedRef(ref);
    const [seekBeforeWidth, setSeekBeforeWidth] = useState(0);
    

    const onValueChange = (e) => {
        const newPercentageValue = (e.target.value*100)/max;
        setSeekBeforeWidth( `${newPercentageValue}%`);
        //run the externally passed on change event second.
        onChange(e);
    }
    
    return (
        <div>
            <_ProgressBar type="range"
            defaultValue={defaultValue}
            ref={ref}
            onChange={onValueChange}
            seekbeforewidth={seekBeforeWidth}
            barheight={barheight}/>
        </div>
    )
});

ProgressBar.defaultProps= {
    barheight: "8px"
}
  
ProgressBar.propTypes = {
    barheight: PropTypes.string
}

export { ProgressBar }
export default ProgressBar
