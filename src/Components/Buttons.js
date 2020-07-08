import React, { useContext } from 'react';
import styled from 'styled-components';
import { mediaQuery } from './MediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { BasicContainer } from './Containers';
import { Text } from './Texts';
//import { Ul, Li } from './List';



//#region 簡單按鈕

export const EasyButton = (props) => {
    return (
        <BasicContainer onClick={props.onClick} theme={props?.theme} className={props.className}>
            <Text theme={{ fontWeight: props?.theme?.fontWeight, color: props?.theme?.color, cursor: "pointer", userSelect: "none" }}>{props?.text ?? "按鈕"}</Text>
        </BasicContainer>
    )
}
//#endregion


const IconBtn = (props) => {

    return (
        <IconButton onClick={props.onClick}
            onMouseLeave={props.onMouseLeave}
            onMouseEnter={props.onMouseEnter} className={props.className}>
            {props.children}
        </IconButton>
    )
}

export const StyledIconButton = styled(IconBtn)`
    && {
        color: ${props => props?.theme?.color ?? '#fff'};
        margin: ${props => props?.theme?.margin ?? 'noSet'};
        padding: ${props => props?.theme?.padding ?? 'noSet'};
        border-radius: ${props => props?.theme?.borderRadius ?? 'initial'};
        border: ${props => props?.theme?.border ?? 'initial'};
        width: ${props => props?.theme?.width ?? 'initial'};
        height: ${props => props?.theme?.height ?? 'initial'};
        justify-content: ${props => props?.theme?.justify ?? 'initial'};
        position: ${props => props?.theme?.position ?? 'noSet'};
        top: ${props => props?.theme?.top ?? 'initial'};
        left: ${props => props?.theme?.left ?? 'initial'};
        right: ${props => props?.theme?.right ?? 'initial'};
        background-color: ${props => props?.theme?.backgroundColor ?? 'initial'};
        font-size: ${props => props?.theme?.fontSize ?? 'initial'};
        justify-content: ${props => props?.theme?.justify ?? 'initial'};
        z-index: ${props => props?.theme?.zIndex ?? 'initial'};

        .MuiIconButton-label {
            font-family: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'
        }
        
        //常用屬性

        @media ${mediaQuery.tablet} { 
            margin: ${props => props?.theme?.tablet?.margin ? props.theme.tablet.margin : (props?.theme?.margin ?? 'initial')};   

        }
    }
    
    &&:hover {
        background-color: ${props => props?.theme?.hoverBackgroundColor ?? 'initial'};
        border: ${props => props?.theme?.hoverBorder ? props.theme.hoverBorder : props?.theme?.border ?? '#fff'};
        color: ${props => props?.theme?.hoverColor ? props.theme.hoverColor : props?.theme?.color ?? '#fff'};
    }
`;


/* 
   Date   : 2020-06-05 14:22:03
   Author : Arhua Ho
   Content: 方形擴展特效按紐
*/
// export const MenuButton = (props) => {
//     return (
//         <>
//             <Button>
//                 {props.children}
//             </Button>
//             {props.item && (
//                 <Ul theme={{ position: "fixed", top: "6rem", right: "1rem", zIndex: 3000 }}>
//                     {props.item.map((item, index) => {
//                         return (
//                             <StyledIconButton
//                                 onClick={item.onClick}
//                             >
//                                 <Li  >{item.text}</Li>

//                             </StyledIconButton>
//                         )
//                     })}

//                 </Ul>

//             )}

//         </>
//     )
// }





/* 
   Date   : 2020-06-05 14:21:34
   Author : Arhua Ho
   Content: 仿Material按鈕
*/
export const C = styled.button.attrs((props) => ({}))`

    // 順序 : link--visited--hover--focus--active

	letter-spacing: 1px;
	font-size: 12px;
	display: inline-block;
	position: relative;
	border-radius: 2px;
	overflow: hidden;
	-webkit-transition: 0.2s ease-out;
	transition: 0.2s ease-out;
	font-family: sans-serif;
	cursor:pointer;
	border: none;
	padding: 12px 20px 12px 20px;
	margin: 155px 5px;
	background-color: transparent;
	text-align: center;
    color: #444;
    z-index: 3;
    
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35), 0 1px 1px 0 rgba(0, 0, 0, 0.59);
	background-color: rgba(255, 255, 255, 0.3);
    outline: none;

    &:hover {
    	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.22), 0 4px 4px 0 rgba(0, 0, 0, 0.35);
    	color: #222;
    	text-decoration: none;
    	background-color: rgba(255, 255, 255, 0.6);
    }

    &:active {
        //按下還沒有鬆開
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.44), 0 1px 1px 0 rgba(0, 0, 0, 0.68);

    }


    &:focus::before {
        //按下後鬆開，對before執行

    	// display: block;
    	// height: 150px;
    	// width: 150px;
    	// top: -58px;
    	// left: -30px;
    	// opacity: 0;
    	// content: "";
    	// background: #AAA;
    	// border-radius: 30px;
    	// position: absolute;
    	// animation-name: fadeOut;
    	// animation-timing-function: ease-out;
        // animation-duration: .5s;
        // animation-fill-mode: forwards;
        // z-index: 1;
        

        display: block;
    	height: 150px;
    	width: 150px;
    	top: -58px;
    	left: -30px;
    	opacity: 0;
    	content: "";
    	background: #AAA;
    	border-radius: 30px;
    	position: absolute;
    	animation-name: fadeOut;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        animation-duration: .5s;
        z-index: 1;
    }

    &:active::before {
        // 按下還沒有鬆開，對before執行
        // 執行FadeIn動畫
        // display: block;
    	// height: 150px;
    	// width: 150px;
    	// top: -58px;
    	// left: -30px;
    	// opacity: 0;
    	// content: "";
    	// background: #AAA;
    	// border-radius: 30px;
    	// position: absolute;
    	// animation-name: fadeIn;
        // animation-timing-function: ease-out;
        // animation-fill-mode: forwards;
        // animation-duration: .5s;
        // z-index: 1;
        

        display: block;
    	height: 150px;
    	width: 150px;
    	top: -58px;
    	left: -30px;
    	opacity: 0;
    	content: "";
    	background: #AAA;
    	border-radius: 30px;
    	position: absolute;
    	animation-name: fadeIn;
    	animation-timing-function: ease-out;
        animation-duration: .5s;
        animation-fill-mode: forwards;
    	z-index: 1;
     }

    @keyframes fadeIn {
    	0% {opacity: .8; transform: scale(0);}
    	100% {opacity: .8; transform: scale(1);}
    }

    @keyframes fadeOut {
    	0% {opacity: .8; transform: scale(1);}
        100% {opacity: 0;}
    }
`