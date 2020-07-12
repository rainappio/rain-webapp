import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../Store/store'
import styled, { keyframes } from 'styled-components';
import { BasicContainer } from './Containers';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Text } from '../Components/Texts'
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { useHistory } from 'react-router-dom';

//#region 右側彈跳警告組件
//#region 右側彈跳警告組件基底

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

//#region Alert obserable handler，提供alertService (AlertService.js)
const alertSubject = new Subject(); // 啟用訂閱 Alert observable
const defaultId = 'default-alert'; // 預留功能 : 可適應多個Alert欄

//#region 導出方法供使用
const onAlert = (id = defaultId) => {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

// 要新增Alert時，調用的方法
const normal = (message, options) => {
    alert({ ...options, keepAfterRouteChange: false, type: "normal", message });
}

const warn = (message, options) => {
    alert({ ...options, keepAfterRouteChange: false, type: "warn", message });
}

// const error = (message, options) => {
//     alert({ ...options, keepAfterRouteChange: false, type: "error", message });
// }

// const info = (message, options) => {
//     alert({ ...options, keepAfterRouteChange: false, type: "info", message });
// }

// 新增alert 核心方法
function alert(alert) {
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}

// 清除 alerts方法
function clear(id = defaultId) {
    alertSubject.next({ id });
}

export const alertService = {
    onAlert,
    normal,
    warn,
    // error,
    // info,
    alert,
    clear
};
//#endregion
//#endregion

const JumpAlertBase = (props, { id, fade = true }) => {
    const { Theme } = useContext(Context);
    const { jumpAlerts } = Theme;
    const [Alerts, setAlerts] = useState([]); // 儲存Alert
    const history = useHistory();

    const animationClasses = (alert) => {
        if (!alert) return;

        if (alert.fade) {
            //Alert上有標記 fade : true，則套用淡出動畫
            return "backOutRight";
        } else {
            return 'jumpIn'
        }
    }

    const removeAlert = (alert) => {
        //console.log("alert", alert)
        // console.log("fade", fade)
        if (fade) {
            // 將要退出的 Alert加上標記 fade : true
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));

            // 播放動畫後移除 alert
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 750);//這裡的秒數等同於 "退出動畫秒數"
        } else {
            // 不播放動畫直接移除 alert (一般不會進這裡)
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    useEffect(() => {
        // 訂閱新的 Alert
        //console.log("?id", id)
        const subscription = onAlert(id)
            .subscribe(alert => {
                //console.log(alert)
                // 若訊息為空則清除，因為只讓 clear() 方法時不用傳參數
                if (!alert.message) {
                    // 進來這裡 代表外面呼叫的是 clear()
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);//把陣列清空
                        // 移除 key 'keepAfterRouteChange' 
                        // filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    // 增加 alert 至陣列
                    setAlerts(alerts => ([...alerts, alert]));
                    //console.log(Alerts)
                    // 自動關閉 alert 設定
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        // 路由變化時清除 Alerts
        const historyUnlisten = history.listen(() => {
            clear(id);
        });

        // 清除副作用
        return () => {
            // 取消訂閱，與防止 memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    return (
        <>
            <BasicContainer className={props.className} theme={jumpAlerts.basicContainer}>
                {(Alerts ?? []).map((item, index, arr) => {
                    return <Snackbar
                        class={animationClasses(item)}
                        key={index}
                        msg={item.message}
                        type={item.type}
                        onClick={() => removeAlert(item)} />
                })
                }
            </BasicContainer>
        </>
    )
}
//#endregion

//#region 單個Alert
const Snackbar = (props) => {

    const { Theme } = useContext(Context);
    const { jumpAlerts } = Theme;

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

    return (
        <BasicContainer
            onClick={props.onClick}
            className={props.class}
            theme={jumpAlerts.alertContainer} >
            {switchIcon(props.type)}
            <Text theme={jumpAlerts.alertText}
            >{props?.msg}</Text>
        </BasicContainer>
    )
}
//#endregion

//#region 右側彈跳警告組件
/* 
   Date   : 2020-07-12 18:49:52
   Author : Arhua Ho
   Content: 右側彈跳警告組件
            可傳入props : 
                無 : 暫不開放
            使用方法 : 
                1. 請在頂層組件引入 JumpAlert，並使用 <JumpAlert/>
                2. 在需要操作警告的組件內引入 alertService，如 import { alertService } from '../../Components/JumpAlerts';
                3. 使用 alertService 內方法操作 Alert，
                    如 : alertService.[警告類型](警告訊息文字 ,選項) 
                        選項 : { autoClose : 是否需自動關閉，預設為false }
                    alertService.warn("警告...", {autoClose: true});
                    alertService.normal("成功...", {autoClose: false});
*/
export const JumpAlert = styled(JumpAlertBase).attrs((props) => ({}))`
    //#region 開啟、關閉動畫
    .jumpIn {
        animation: ${jumpIn} .5s 1;
        animation-fill-mode: forwards; 
    }

    .backOutRight {
        animation: ${backOutRight} .75s 1;
        animation-fill-mode: forwards; 
    }
    //#endregion
`
//#endregion
//#endregion

