import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../Store/store'
import { Container, BasicContainer } from './Containers';

//#region 彈跳視窗容器
//#region 彈跳視窗容器基底
const JumpDialogBase = (props) => {
    const { Theme } = useContext(Context);
    const { jumpDialog } = Theme;
    const [Open, setOpen] = props.switch;
    const [ControllAnimation, setControllAnimation] = useState(true);

    //#region 控制開啟關閉動畫
    const closeJumpDialog = () => {
        setControllAnimation(false);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                setOpen(false);
            }, 900, 'done');
        });
    }
    //#endregion

    return (
        <>
            <Container className={props.className} theme={jumpDialog.jumpDialogContainer}
                onClick={() => { closeJumpDialog(); }}
            >
                <BasicContainer onClick={(e) => { e.stopPropagation(); }} className={ControllAnimation ? "jumpIn" : "jumpOut"} theme={props?.theme?.jumpDialog ?? jumpDialog.jumpDialog}>
                    {props.children}
                </BasicContainer>
            </Container>
        </>
    )
}
//#endregion
//#region 彈跳視窗容器組件
export const JumpDialog = styled(JumpDialogBase).attrs((props) => ({}))`

    .jumpIn {
        //動畫
        animation: jumpIn 1s 1;

        @keyframes jumpIn {
            from,
            20%,
            40%,
            60%,
            80%,
            to {
              -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
              animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
        
            0% {
              opacity: 0;
              -webkit-transform: scale3d(0.3, 0.3, 0.3);
              transform: scale3d(0.3, 0.3, 0.3);
            }
        
            20% {
              -webkit-transform: scale3d(1.1, 1.1, 1.1);
              transform: scale3d(1.1, 1.1, 1.1);
            }
        
            40% {
              -webkit-transform: scale3d(0.9, 0.9, 0.9);
              transform: scale3d(0.9, 0.9, 0.9);
            }
        
            60% {
              opacity: 1;
              -webkit-transform: scale3d(1.03, 1.03, 1.03);
              transform: scale3d(1.03, 1.03, 1.03);
            }
        
            80% {
              -webkit-transform: scale3d(0.97, 0.97, 0.97);
              transform: scale3d(0.97, 0.97, 0.97);
            }
        
            to {
              opacity: 1;
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }
        }
    }

    .jumpOut {
        //動畫
        animation: jumpOut 1s 1;

        @keyframes jumpOut {
            20% {
                -webkit-transform: scale3d(0.9, 0.9, 0.9);
                transform: scale3d(0.9, 0.9, 0.9);
            }
        
            50%,
            55% {
              opacity: 1;
              -webkit-transform: scale3d(1.1, 1.1, 1.1);
              transform: scale3d(1.1, 1.1, 1.1);
            }
        
            to {
              opacity: 0;
              -webkit-transform: scale3d(0.3, 0.3, 0.3);
              transform: scale3d(0.3, 0.3, 0.3);
            }
        }
    }

`
//#endregion
//#endregion
