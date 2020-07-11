import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { Context } from '../Store/store'
import { Container, BasicContainer } from './Containers';
import { JumpDialogButton } from './Buttons';

//#region 彈跳視窗容器
//#region 彈跳視窗容器基底
const JumpDialogBase = (props) => {
  const { Theme } = useContext(Context);
  const { jumpDialog } = Theme;
  const [, setOpen] = props.switch;
  const [ControllAnimation, setControllAnimation] = useState(true);
  const yesButton = useRef();
  const noButton = useRef();

  //#region 控制開啟關閉動畫
  const closeJumpDialog = () => {
    setControllAnimation(false);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setOpen(false);
        resolve();
      }, 400, 'done');
    });
  }
  //#endregion

  //#region 讓tab、方向鍵在按鈕間移動

  //#endregion

  return (
    <>
      {/* 背景 */}
      <Container className={props.className} theme={jumpDialog.jumpDialogContainer}
        onClick={() => {
          (props.backgroundCanClose ?? true) && closeJumpDialog();
          new Promise((resolve, reject) => {
            // 播放完關閉動畫後執行 close 函數
            setTimeout(() => {
              props?.close && props.close();
              resolve();
            }, 400, 'done');
          });
        }}
      >
        {/* 彈窗容器 */}
        <BasicContainer onClick={(e) => { e.stopPropagation(); }} className={ControllAnimation ? "jumpIn" : "jumpOut"} theme={props?.theme?.jumpDialog ?? jumpDialog.jumpDialog}>
          {props.children}
          {/* 按鈕區域 */}
          <BasicContainer theme={{ width: "100%", textAlign: "center" }}>
            {/* 確認按鈕 */}
            <JumpDialogButton
              ref={yesButton}
              onClick={() => {
                closeJumpDialog();
                new Promise((resolve, reject) => {
                  // 播放完關閉動畫後執行 close 函數
                  setTimeout(() => {
                    props?.yes && props.yes();
                    resolve();
                  }, 400, 'done');
                });
              }}
              type={"warn"}>
              {props?.yesText}
            </JumpDialogButton>
            {/* 取消按鈕 */}
            <JumpDialogButton
              ref={noButton}
              onClick={() => {
                closeJumpDialog();
                new Promise((resolve, reject) => {
                  // 播放完關閉動畫後執行 close 函數
                  setTimeout(() => {
                    props?.no && props.no();
                    resolve();
                  }, 400, 'done');
                });
              }}
              type>
              {props?.noText}
            </JumpDialogButton>
          </BasicContainer>
        </BasicContainer>
      </Container>
    </>
  )
}
//#endregion
//#region 彈跳視窗容器組件
/* 
   Date   : 2020-06-24 23:04:27
   Author : Arhua Ho
   Content: 一般列表，各項可控與可增加欄位，並可依render決定顯示欄位內容
            可傳入props : 
                switch : 控制 彈跳視窗 開啟關閉的父組件State ，必傳<JumpDialog switch={[OpenDelJumpDialog, setOpenDelJumpDialog]} ... />
                close : 點擊背景區所要執行的函數
                backgroundCanClose : Boolean 決定點擊背景區是否可以關閉視窗，預設為true，即可關閉 
                yes : 確認按鈕函數
                yesText : 確認按鈕文字
                no : 取消按鈕函數
                noText : 取消按鈕文字
                theme : {
                  jumpDialog :{} //彈窗樣式 (BasicContainer)
                }
*/
export const JumpDialog = styled(JumpDialogBase).attrs((props) => ({}))`
    //#region 開啟、關閉動畫
    .jumpIn {
        //動畫
        animation: jumpIn .5s 1;

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
        animation: jumpOut .6s 1;

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
    //#endregion
`
//#endregion
//#endregion

//#region 彈跳視窗容器 (無按鈕)
//#region 彈跳視窗容器基底 (無按鈕)
const JumpDialogWithoutBottonBase = (props) => {
  const { Theme } = useContext(Context);
  const { jumpDialog } = Theme;
  const [, setOpen] = props.switch;
  const [ControllAnimation, setControllAnimation] = useState(true);

  //#region 控制開啟關閉動畫
  const closeJumpDialog = () => {
    setControllAnimation(false);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setOpen(false);
        resolve();
      }, 400, 'done');
    });
  }
  //#endregion

  return (
    <>
      <Container className={props.className} theme={jumpDialog.jumpDialogContainer}
        onClick={() => {
          (props.backgroundCanClose ?? true) && closeJumpDialog();
          new Promise((resolve, reject) => {
            // 播放完關閉動畫後執行 close 函數
            setTimeout(() => {
              props?.close && props.close();
              resolve();
            }, 400, 'done');
          });
        }}
      >
        <BasicContainer onClick={(e) => { e.stopPropagation(); }} className={ControllAnimation ? "jumpIn" : "jumpOut"} theme={props?.theme?.jumpDialog ?? jumpDialog.jumpDialog}>
          {props.children}
        </BasicContainer>
      </Container>
    </>
  )
}
//#endregion
//#region 彈跳視窗容器組件 (無按鈕)
/* 
   Date   : 2020-06-24 23:04:27
   Author : Arhua Ho
   Content: 一般列表，各項可控與可增加欄位，並可依render決定顯示欄位內容
            可傳入props : 
                switch : 控制 彈跳視窗 開啟關閉的父組件State ，必傳<JumpDialog switch={[OpenDelJumpDialog, setOpenDelJumpDialog]} ... />
                close : 點擊背景區所要執行的函數
                backgroundCanClose : Boolean 決定點擊背景區是否可以關閉視窗，預設為true，即可關閉 
                theme : {
                  jumpDialog :{} //彈窗樣式 (BasicContainer)
                }
*/
export const JumpDialogWithoutBotton = styled(JumpDialogWithoutBottonBase).attrs((props) => ({}))`
    //#region 開啟、關閉動畫
    .jumpIn {
        //動畫
        animation: jumpIn .5s 1;

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
        animation: jumpOut .6s 1;

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
    //#endregion
`
//#endregion
//#endregion