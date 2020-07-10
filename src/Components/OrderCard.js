import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BasicContainer, Container, SubContainer } from '../Components/Containers'
import { Text } from '../Components/Texts';
import { Context } from '../Store/store'

/*
   Date   : 2020-07-08 16:41:30
   Author : GGGODLIN
   Content: 可傳入props
                icon={<Logo />} : 顯示在上半部的icon
                onClick={() => console.log("123")}
                labelFirst="test" : 上方標籤的內容
                labelSecond="2" : 下方標籤的內容
            對外開放樣式 theme = {  }
*/

export const OrderCard = (props) => {
    const { Theme } = useContext(Context);
    const { orderCard } = Theme;
    const [isShown, setIsShown] = useState(false);
    //console.log("IN OrderCard", props);
    //...(isOn ? { backgroundColor: '#2f3e51' } : { backgroundColor: '#FFFFFF' })
    return (
        <>

            <BasicContainer
                theme={isShown ? (props?.theme?.orderCardContainerHover ?? orderCard?.orderCardContainerHover) : (props?.theme?.orderCardContainer ?? orderCard?.orderCardContainer)}
                onClick={props?.onClick ?? (() => console.log("click OrderCard without onClick!", props))}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                {props?.icon && <Container theme={{ justify: 'center', alignItems: 'center', height: '50%' }}>
                    {isShown && React.cloneElement(props?.icon, { style: { fill: 'white' } })}
                    {!isShown && React.cloneElement(props?.icon, { style: { fill: '#555555' } })}
                </Container>}
                <Container theme={{ direction: 'column', height: '50%' }}>
                    <Text theme={{ color: `${isShown ? "white" : "#555555"}`, fontSize: "1.75rem", textAlign: "center", display: "block", fontWeight: 'bold', lineHeight: '2.0625rem' }}>{props.labelFirst ?? "labelFirst"}</Text>
                    <Text theme={{ color: `${isShown ? "white" : "#555555"}`, fontSize: "0.875rem", textAlign: "center", display: "block" }}>{props.labelSecond ?? "labelSecond"}</Text>
                </Container>
            </BasicContainer>


        </>
    )
}

export const OrderCardMobile = (props) => {
    const { Theme } = useContext(Context);
    const { orderCard } = Theme;
    const [isShown, setIsShown] = useState(false);
    //console.log("IN OrderCard", props);
    //...(isOn ? { backgroundColor: '#2f3e51' } : { backgroundColor: '#FFFFFF' })
    return (
        <>

            <BasicContainer
                theme={isShown ? (props?.theme?.orderCardMobileContainerHover ?? orderCard?.orderCardMobileContainerHover) : (props?.theme?.orderCardMobileContainer ?? orderCard?.orderCardMobileContainer)}
                onClick={props?.onClick ?? (() => console.log("click OrderCard without onClick!", props))}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                {props?.icon && <Container theme={{ justify: 'center', alignItems: 'center', height: '50%' }}>
                    {isShown && React.cloneElement(props?.icon, { style: { fill: 'white', height: "3rem", width: "3rem" } })}
                    {!isShown && React.cloneElement(props?.icon, { style: { fill: '#555555', height: "3rem", width: "3rem" } })}
                </Container>}
                <Container theme={{ direction: 'column', height: '50%' }}>
                    <Text theme={{ color: `${isShown ? "white" : "#555555"}`, fontSize: "24px", textAlign: "center", display: "block", fontWeight: 'bold', lineHeight: '24px' }}>{props.labelFirst ?? "labelFirst"}</Text>
                    <Text theme={{ color: `${isShown ? "white" : "#555555"}`, fontSize: "14px", textAlign: "center", display: "block" }}>{props.labelSecond ?? "labelSecond"}</Text>
                </Container>
            </BasicContainer>


        </>
    )
}


