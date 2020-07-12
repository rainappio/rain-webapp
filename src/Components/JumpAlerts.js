import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../Store/store'
import styled, { keyframes } from 'styled-components';
import { BasicContainer } from './Containers';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Text } from '../Components/Texts'

//#region 顯示Alert動畫
const jumpIn = keyframes`
    20% {
      -webkit-transform: rotate3d(0, 0, 1, -3.5deg);
      transform: rotate3d(0, 0, 1, -3.5deg);
    }

    // 40% {
    //   -webkit-transform: rotate3d(0, 0, 1, -5deg);
    //   transform: rotate3d(0, 0, 1, -5deg);
    // }

    // 60% {
    //   -webkit-transform: rotate3d(0, 0, 1, 2.5deg);
    //   transform: rotate3d(0, 0, 1, 2.5deg);
    // }

    80% {
      -webkit-transform: rotate3d(0, 0, 1, 2.5deg);
      transform: rotate3d(0, 0, 1, 2.5deg);
    }

    to {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
`;
//#endregion

//#region 關閉Alert動畫
const backOutRight = keyframes`
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  
    35% {
      -webkit-transform: translateX(0px) scale(0.7);
      transform: translateX(0px) scale(0.7);
      opacity: 0.7;
    }
  
    100% {
      -webkit-transform: translateX(2000px) scale(0.7);
      transform: translateX(2000px) scale(0.7);
      opacity: 0.7;
    }
  }
`
//#endregion

const JumpAlertBase = (props) => {
    const { Theme } = useContext(Context);
    const { jumpAlerts } = Theme;
    const [AlertList, setAlertList] = useState([]); // 儲存Alert

    // useEffect(() => {
    //     // subscribe to new alert notifications
    //     const subscription = alertService.onAlert(id)
    //         .subscribe(alert => {
    //             // clear alerts when an empty alert is received
    //             if (!alert.message) {
    //                 setAlerts(alerts => {
    //                     // filter out alerts without 'keepAfterRouteChange' flag
    //                     const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

    //                     // remove 'keepAfterRouteChange' flag on the rest
    //                     filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
    //                     return filteredAlerts;
    //                 });
    //             } else {
    //                 // add alert to array
    //                 setAlerts(alerts => ([...alerts, alert]));

    //                 // auto close alert if required
    //                 if (alert.autoClose) {
    //                     setTimeout(() => removeAlert(alert), 3000);
    //                 }
    //             }
    //         });

    //     // clear alerts on location change
    //     const historyUnlisten = history.listen(() => {
    //         alertService.clear(id);
    //     });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    return (
        <>
            <BasicContainer className={props.className} theme={jumpAlerts.basicContainer}>
                {(AlertList ?? []).map((item, index, arr) => {
                    return <Snackbar alertsList={[AlertList, setAlertList]} guid={item.guid} key={index} msg={item.msg} type={item.type}></Snackbar>;
                })
                }
            </BasicContainer>
        </>
    )
}

const Snackbar = (props) => {

    const { Theme } = useContext(Context);
    const { jumpAlerts } = Theme;
    const [IsActive, setIsActive] = useState(false); // 儲存Alert的Class狀態
    const [AlertList, setAlertList] = props.alertsList; // 儲存本次新增的Alert

    //#region 傳回對應的圖標
    const switchIcon = (key = "") => {
        switch (key.toString()) {
            case "warn":
                return <ErrorOutlineIcon
                    style={{
                        color: "#d25959",
                        height: "100%",
                        position: "absolute",
                        left: "0.5rem",
                        width: "2.5rem"
                    }} />;
            default:
                return <CheckCircleOutlineIcon
                    style={{
                        color: "#26b49a",
                        height: "100%",
                        position: "absolute",
                        left: "0.5rem",
                        width: "2.5rem"
                    }} />;
        }
    }
    //#endregion

    const openSnackBar = () => {
        setIsActive(true);
    }

    useEffect(() => {
        openSnackBar();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsActive(false);
            //動畫結束，移除資料
            setTimeout(() => {
                setAlertList((v) => v.slice(1))
            }, 750);
        }, props?.showTime ?? 3000);


    }, [IsActive])

    return (
        <BasicContainer
            className={IsActive ? "jumpIn" : "backOutRight"}
            theme={jumpAlerts.alertContainer} >
            {switchIcon(props.type)}
            <Text theme={jumpAlerts.alertText}
            >{props?.msg}</Text>
        </BasicContainer>
    )
}


export const JumpAlert = styled(JumpAlertBase).attrs((props) => ({}))`
    //#region 開啟、關閉動畫
    .jumpIn {
        animation: ${jumpIn} .5s 1;
    }

    .backOutRight {
        animation: ${backOutRight} .75s 1;
        animation-fill-mode: forwards; 
    }
    //#endregion
`



