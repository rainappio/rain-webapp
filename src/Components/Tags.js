import React, { useState } from 'react';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelIcon from '@material-ui/icons/Cancel';
import { StyledIconButton } from './Buttons';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const TagBase = (props) => {
    //console.log("IN TAG", props);

    return (
        <>
            <span className={props.className} >
                {props.children}
            </span>
        </>
    )
}


export const Tag = styled(TagBase).attrs((props) => ({}))`

    position: ${props => props?.theme?.position ?? 'relative'}; 
    border: ${props => props?.theme?.border ?? 'initial'}; 
    color: ${props => props?.theme?.color ?? 'initial'}; 
    background-color: ${props => props?.theme?.backgroundColor ?? 'initial'}; 
    font-size: ${props => props?.theme?.fontSize ?? 'initial'}; 
    height: ${props => props?.theme?.height ?? 'initial'}; 
    line-height: ${props => props?.theme?.height ?? 'initial'}; 
    width: ${props => props?.theme?.width ?? "3rem"};
    display: ${props => props?.theme?.display ?? 'initial'}; 
    text-align: ${props => props?.theme?.textAlign ?? 'initial'}; 
    margin: ${props => props?.theme?.margin ?? 'initial'}; 
    border-color: ${props => props?.theme?.borderColor ?? 'initial'};
    border-radius: ${props => props?.theme?.borderRadius ?? 'initial'};
    padding: ${props => props?.theme?.padding ?? 'initial'};
    font-family: ${props => props?.theme?.fontFamily ?? 'initial'};
    box-sizing: ${props => props?.theme?.boxSizing ?? 'initial'};
    white-space: ${props => props?.theme?.whiteSpace ?? 'initial'};

`

//#region Tab包含關閉功能
const TagCloseBase = (props) => {

    return (
        <>
            <span className={props.className} >
                {props.children}
                <CancelIcon
                    className={"icon"}
                    onClick={props.close}
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "0.8rem",
                        color: "#828282",
                    }}></CancelIcon>
            </span>
        </>
    )
}


export const TagClose = styled(TagCloseBase).attrs((props) => ({}))`

    position: ${props => props?.theme?.position ?? 'relative'}; 
    border: ${props => props?.theme?.border ?? 'initial'}; 
    color: ${props => props?.theme?.color ?? 'initial'}; 
    background-color: ${props => props?.theme?.backgroundColor ?? 'initial'}; 
    font-size: ${props => props?.theme?.fontSize ?? 'initial'}; 
    height: ${props => props?.theme?.height ?? 'initial'}; 
    line-height: ${props => props?.theme?.height ?? 'initial'}; 
    width: ${props => props?.theme?.width ?? "3rem"};
    display: ${props => props?.theme?.display ?? 'initial'}; 
    text-align: ${props => props?.theme?.textAlign ?? 'initial'}; 
    margin: ${props => props?.theme?.margin ?? 'initial'}; 
    border-color: ${props => props?.theme?.borderColor ?? 'initial'};
    border-radius: ${props => props?.theme?.borderRadius ?? 'initial'};
    padding: ${props => props?.theme?.padding ?? 'initial'};
    font-family: ${props => props?.theme?.fontFamily ?? 'initial'};
    box-sizing: ${props => props?.theme?.boxSizing ?? 'initial'};
    white-space: ${props => props?.theme?.whiteSpace ?? 'initial'};

    .icon :hover {
        color: #f56c6c
    }

`
//#endregion