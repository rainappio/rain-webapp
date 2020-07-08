import React, { useContext } from 'react';
import styled from 'styled-components';
import { mediaQuery } from './MediaQuery';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



export const Ul = styled.ul.attrs((props) => ({}))`

    //基本屬性
    display: ${props => props?.theme?.display ?? 'block'};
    list-style-type: ${props => props?.theme?.listStyleType ?? 'initial'};
    margin-block-start: ${props => props?.theme?.marginBlockStart ?? 'initial'};
    margin-block-end: ${props => props?.theme?.marginBlockEnd ?? 'initial'};
    margin-inline-start: ${props => props?.theme?.marginInlineStart ?? 'initial'};
    margin-inline-end: ${props => props?.theme?.marginInlineEnd ?? 'initial'};
    padding-inline-start: ${props => props?.theme?.paddingInlineStart ?? 'initial'};
    padding-inline-end: ${props => props?.theme?.paddingInlineEnd ?? 'initial'};
    margin: ${props => props?.theme?.margin ?? 'initial'};

    position: ${props => props?.theme?.position ?? 'relative'}; 
    top: ${props => props?.theme?.top ?? 'initial'};
    background-color: ${props => props?.theme?.backgroundColor ?? 'initial'};
    left: ${props => props?.theme?.left ?? 'initial'};
    right: ${props => props?.theme?.right ?? 'initial'};
    z-index: ${props => props?.theme?.zIndex ?? 'initial'};
    width: ${props => props?.theme?.width ?? 'initial'};
    border-radius: ${props => props?.theme?.borderRadius ?? 'initial'};
    border: ${props => props?.theme?.border ?? 'initial'};
    box-shadow: ${props => props?.theme?.boxShadow ?? 'initial'};
    overflow: ${props => props?.theme?.overflow ?? 'initial'};

    & li:nth-child(${props => props?.theme?.active}) {
        background-color: ${props => props?.theme?.activeBackground ?? "#ebf5ff"};
    }

    @media ${mediaQuery.tablet} { 
        display: ${props => props?.theme?.tablet?.display ? props.theme.tablet.display : (props?.theme?.display ?? 'block')};
        list-style-type: ${props => props?.theme?.tablet?.listStyleType ? props.theme.tablet.listStyleType : (props?.theme?.listStyleType ?? 'initial')};
        margin-block-start: ${props => props?.theme?.tablet?.marginBlockStart ? props.theme.tablet.marginBlockStart : (props?.theme?.marginBlockStart ?? 'initial')};
        margin-block-end: ${props => props?.theme?.tablet?.marginBlockEnd ? props.theme.tablet.marginBlockEnd : (props?.theme?.marginBlockEnd ?? 'initial')};
        margin-inline-start: ${props => props?.theme?.tablet?.marginInlineStart ? props.theme.tablet.marginInlineStart : (props?.theme?.marginInlineStart ?? 'initial')};
        margin-inline-end: ${props => props?.theme?.tablet?.marginInlineEnd ? props.theme.tablet.marginInlineEnd : (props?.theme?.marginInlineEnd ?? 'initial')};
        padding-inline-start: ${props => props?.theme?.tablet?.paddingInlineStart ? props.theme.tablet.paddingInlineStart : (props?.theme?.paddingInlineStart ?? 'initial')};
        width: ${props => props?.theme?.tablet?.width ? props.theme.tablet.width : (props?.theme?.width ?? 'initial')};
        margin: ${props => props?.theme?.tablet?.margin ? props.theme.tablet.margin : (props?.theme?.margin ?? 'initial')};
      
        position: ${props => props?.theme?.tablet?.position ? props.theme.tablet.position : (props?.theme?.position ?? 'initial')};
        top: ${props => props?.theme?.tablet?.top ? props.theme.tablet.top : (props?.theme?.top ?? 'initial')};
        background-color: ${props => props?.theme?.tablet?.backgroundColor ? props.theme.tablet.backgroundColor : (props?.theme?.backgroundColor ?? 'initial')};
        left: ${props => props?.theme?.tablet?.left ? props.theme.tablet.left : (props?.theme?.left ?? 'initial')};
        right: ${props => props?.theme?.tablet?.right ? props.theme.tablet.right : (props?.theme?.right ?? 'initial')};
        z-index: ${props => props?.theme?.tablet?.zIndex ? props.theme.tablet.zIndex : (props?.theme?.zIndex ?? 'initial')};
        border-radius: ${props => props?.theme?.tablet?.borderRadius ? props.theme.tablet.borderRadius : (props?.theme?.borderRadius ?? 'initial')};
        border: ${props => props?.theme?.tablet?.border ? props.theme.tablet.border : (props?.theme?.border ?? 'initial')};
        box-shadow: ${props => props?.theme?.tablet?.boxShadow ? props.theme.tablet.boxShadow : (props?.theme?.boxShadow ?? 'initial')};
    }


`

export const Li = styled.li.attrs((props) => ({}))`

    padding-left:  ${props => props?.theme?.paddingLeft ?? 'initial'};
    font-size:  ${props => props?.theme?.fontSize ?? 'initial'};
    color: ${props => props?.theme?.color ?? 'initial'};
    position: ${props => props?.theme?.position ?? 'relative'}; 
    cursor: pointer;
    background-color: ${props => props?.theme?.backgroundColor ?? 'initial'};
    display: ${props => props?.theme?.display};
    align-items: ${props => props?.theme?.alignItems};
    height: ${props => props?.theme?.height};
    border-right: ${props => props?.theme?.borderRight};

    &:hover {
        color: ${props => props?.theme?.hoverColor ?? 'initial'};
        background-color: ${props => props?.theme?.hoverBackgroundColor ?? 'initial'};
    }

    @media ${mediaQuery.tablet} { 
        padding-left:  ${props => props?.theme?.tablet?.paddingLeft ? props.theme.tablet.paddingLeft : (props?.theme?.paddingLeft ?? 'initial')};
        font-size:  ${props => props?.theme?.tablet?.fontSize ? props.theme.tablet.fontSize : (props?.theme?.fontSize ?? 'initial')};  
        color: ${props => props?.theme?.tablet?.color ? props.theme.tablet.color : (props?.theme?.color ?? 'initial')};   
        background-color: ${props => props?.theme?.tablet?.backgroundColor ? props.theme.tablet.backgroundColor : (props?.theme?.backgroundColor ?? 'initial')};   


        &:hover {
            color: ${props => props?.theme?.tablet?.hoverColor ? props.theme.tablet.hoverColor : (props?.theme?.hoverColor ?? 'initial')};   
            background-color: ${props => props?.theme?.tablet?.hoverBackgroundColor ? props.theme.tablet.hoverBackgroundColor : (props?.theme?.hoverBackgroundColor ?? 'initial')};  
        }
    }
`




