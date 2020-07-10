import React from 'react'
import { Container, SubContainer, BasicContainer } from './Containers'
import { Text } from './Texts'

//之後要再將樣式拆分至Theme檔案裡

const container = {
    direction: "row",
    justify: "space-between",
    padding: "0 40px 0 40px ",
    width: '100%',
    margin: '0 0 32px 0',
    //height: '3rem',
}

const text = { color: "#444", fontSize: "1.375em", fontWeight: 700, padding: " 0.2rem 0 12px 0", }

const subContainer = {}

const upperBlock = {
    width: "100%",
    height: '1px',
    backgroundColor: "#ddd",
    margin: '12px 0 0 0',

}

/*
   Date   : 2020-07-09 17:05:30
   Author : GGGODLIN
   Content: 可傳入props
                title (string) : title
            對外開放樣式 container subContainer text upperBlock
*/
export const PageSubTitle = (props) => {
    return (
        <Container theme={props.container ?? container}>
            <SubContainer theme={props.subContainer ?? subContainer}>
                <Text theme={props.text ?? text}>
                    {props.title}
                </Text>
            </SubContainer>
            <BasicContainer theme={props.upperBlock ?? upperBlock}></BasicContainer>

        </Container>
    )
}

const containerMobile = {
    direction: "row",
    justify: "space-between",
    padding: "0 16px 0 16px ",
    width: '100%',
    margin: '16px 0 16px 0',
    //height: '3rem',
}

const textMobile = { color: "#444", fontSize: "18px", fontWeight: 700, }

const subContainerMobile = {}

const upperBlockMobile = {
    width: "100%",
    height: '1px',
    backgroundColor: "#ddd",
    margin: '12px 0 0 0',

}

/*
   Date   : 2020-07-09 17:05:30
   Author : GGGODLIN
   Content: 可傳入props
                title (string) : title
            對外開放樣式 container subContainer text upperBlock
*/
export const PageSubTitleMobile = (props) => {
    return (
        <Container theme={props.containerMobile ?? containerMobile}>
            <SubContainer theme={props.subContainerMobile ?? subContainerMobile}>
                <Text theme={props.textMobile ?? textMobile}>
                    {props.title}
                </Text>
            </SubContainer>


        </Container>
    )
}