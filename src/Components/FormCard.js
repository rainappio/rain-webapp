import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Context } from '../Store/store'
import { Container, BasicContainer, SubContainer } from './Containers';
import { Text } from './Texts';
import { EasyButton } from './Buttons';

//#region 表單卡片基底
const FormCardBase = (props) => {

    const { Theme } = useContext(Context);
    const { formCard } = Theme;

    return (
        <>
            {/* 背景 */}
            < Container className={props.className} theme={formCard.formCardContainer}
                onClick={() => {
                    (props.backgroundCanClose ?? true) && (props?.close && props.close())
                }}
            >
                {/* 彈窗容器 */}
                <BasicContainer onClick={(e) => { e.stopPropagation(); }}
                    theme={props?.theme?.formCard ?? formCard.formCard}>
                    <Container theme={formCard.titleBar}>
                        <SubContainer>
                            <Text theme={formCard.titleText}>{props.title}</Text>
                        </SubContainer>
                        <SubContainer theme={{}}>
                            <EasyButton theme={props?.theme?.yesButton ?? formCard.yesButton} text={props.yesText} onClick={() => { props?.yes && props.yes() }} />
                            <EasyButton theme={props?.theme?.noButton ?? formCard.noButton} text={props.noText} onClick={() => { props?.no && props.no() }} />
                        </SubContainer>
                    </Container>

                    {props.children}
                </BasicContainer>
            </Container >
        </>
    )
}
//#endregion

//#region 表單卡片組件
/* 
   Date   : 2020-06-24 23:04:27
   Author : Arhua Ho
   Content: 表單卡片組件
            可傳入props : 
                close : 點擊背景區所要執行的函數
                backgroundCanClose : Boolean 決定點擊背景區是否可以關閉視窗，預設為true，即可關閉 
                yes : 確認按鈕函數
                yesText : 確認按鈕文字
                no : 取消按鈕函數
                noText : 取消按鈕文字
                theme : {
                  formCard : {}, //彈窗樣式 (BasicContainer)
                  yesButton : {}, //確認按鈕樣式
                  noButton : {}, //取消按鈕樣式
                }
*/
export const FormCard = styled(FormCardBase).attrs((props) => ({}))`

`
//#endregion

