import styled from "styled-components";
import SVG from "react-inlinesvg";
import Image from "./Image/Image";

//Possible Issues if src came from different directory (path error)
function PositionableSVG({src ,...props}){
  return(
  <PositionableElement {...props}>
    <SVG src={src}/>
  </PositionableElement>
  );
}

function PositionableIMG({src, ...props}){
  return(
      <PositionableElement {...props}>
          <Image src={src}/>
      </PositionableElement>
  )
}

const PositionableElement = styled.div`
  position: ${props=> props.position? props.position: "absolute"};
  float: ${props => props.float? props.float: "none"};
  height: ${props => props.height? props.height: "auto"};
  width: ${props => props.width? props.width: "auto"};
  left: ${props => props.left? props.left: "auto" };
  right: ${props => props.right? props.right: "auto" };
  top: ${props => props.top? props.top: "auto"};
  bottom: ${props => props.bottom? props.bottom: "auto"};
  transform: scale(${props => props.scaleX? props.scaleX: 1},${props=>props.scaleY? props.scaleY: 1})
    rotate(${props =>props.rotation? props.rotation: 0}deg);
  z-index:${props => props.zi? props.zi : 0};
`
export { PositionableSVG, PositionableIMG, PositionableElement}
export default PositionableElement;