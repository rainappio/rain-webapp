import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../Store/store'
import styled, { keyframes } from 'styled-components';
import { BasicContainer } from './Containers';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Text } from '../Components/Texts'
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { useHistory } from 'react-router-dom';
import { JumpDialog } from './JumpDialog';

//#region Portal obserable handler，提供portalService (PortalService.js)
const portalSubject = new Subject(); // 啟用訂閱 Portal observable
const defaultId = 'default-portal'; // 預留功能 : 可適應多個Portal

//#region 導出方法供使用
const onPortal = (id = defaultId) => {
    return portalSubject.asObservable().pipe(filter(x => x && x.id === id));//回傳對應id的 Observable
}

// 要新增Portal時，調用的方法
const normal = (options) => {
    portal({ ...options, keepAfterRouteChange: false, type: "normal" });
}

const warn = (options) => {
    portal({ ...options, keepAfterRouteChange: false, type: "warn" });
}

// const error = (options) => {
//     portal({ ...options, keepAfterRouteChange: false, type: "error" });
// }

// const info = (options) => {
//     portal({ ...options, keepAfterRouteChange: false, type: "info" });
// }

// 新增portal 核心方法
function portal(portal) {
    portal.id = portal.id || defaultId;
    portalSubject.next(portal);
}

// 清除 portals方法
function clear(id = defaultId) {
    portalSubject.next({ id });
}

export const portalService = {
    onPortal,
    normal,
    warn,
    // error,
    // info,
    portal,
    clear
};
//#endregion
//#endregion

const PortalBase = (props, { id, fade = true }) => {

    const { Theme } = useContext(Context);
    const { portal } = Theme;
    const [Portal, setPortal] = useState([]); // 儲存Portal
    const history = useHistory();

    //#region 依新增的 Portal type返回不同 Icon
    const getIconByType = (type) => {
        switch (type) {
            case "normal":
                return (
                    <BasicContainer theme={portal.basicContainer}>
                        <HelpOutlineIcon style={portal.helpOutlineIcon} />
                    </BasicContainer>
                )
            case "warn":
                return (
                    <BasicContainer theme={portal.basicContainer}>
                        <ErrorOutlineIcon style={portal.errorOutlineIcon} />
                    </BasicContainer>
                )
            default:
                return null;
        }
    }
    //#endregion

    //#region 移除 Portal 程序
    const removePortal = (portal) => {
        //console.log("portal", portal)
        // console.log("fade", fade)
        if (fade) {
            // 將要退出的 Portal加上標記 fade : true
            const portalWithFade = { ...portal, fade: true };
            setPortal(portals => portals.map(x => x === portal ? portalWithFade : x));

            // 播放動畫後移除 portal
            setTimeout(() => {
                setPortal(portals => portals.filter(x => x !== portalWithFade));
            }, 750);//這裡的秒數等同於 "退出動畫秒數"
        } else {
            // 不播放動畫直接移除 portal (一般不會進這裡)
            setPortal(portals => portals.filter(x => x !== portal));
        }
    }
    //#endregion

    //#region 初始化
    useEffect(() => {
        // 訂閱新的 Portal
        //console.log("?id", id)
        const subscription = onPortal(id)
            .subscribe(portal => {
                //next() 方法
                //console.log(portal)
                // 若訊息為空則清除，因為只讓 clear() 方法時不用傳參數
                if (!portal.type) {
                    // 進來這裡 代表外面呼叫的是 clear()
                    setPortal(portals => {
                        const filteredPortals = portals.filter(x => x.keepAfterRouteChange);//把陣列清空
                        // 移除 key 'keepAfterRouteChange' 
                        // filteredPortals.forEach(x => delete x.keepAfterRouteChange);
                        return filteredPortals;
                    });
                } else {
                    // 將本次的 portal 新增至陣列
                    setPortal(portals => ([portal]));
                    //console.log(Portals)
                    // 自動關閉 portal 設定，預設不自動關閉
                    if (portal.autoClose) {
                        setTimeout(() => removePortal(portal), 3000);
                    }
                }
            });

        // 路由變化時清除 Portals
        const historyUnlisten = history.listen(() => {
            clear(id);//清除 default-portal 的 subscribe
        });

        // 清除副作用
        return () => {
            // 取消訂閱，與防止 memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);
    //#endregion

    return (
        <>
            {(Portal.length > 0) && <JumpDialog
                //switch={props.switch}
                switch={["隨便一個東西", (isopen) => { portalService.clear(); }]} //使彈窗開關由 obserable 控制
                close={() => { Portal[0].close && Portal[0].close(Portal[0]); }} //能夠得到 Portal 所有參數
                yes={() => { Portal[0]?.yes && Portal[0].yes(Portal[0]); }} //能夠得到 Portal 所有參數
                removeYesButton={Portal[0]?.removeYesButton ?? false}
                yesText={Portal[0]?.yesText ?? "確認"}
                no={() => { portalService.clear(); }}
                removeNoButton={Portal[0]?.removeNoButton ?? false}
                noText={Portal[0]?.noText ?? "取消"}
                backgroundCanClose={Portal[0]?.backgroundCanClose ?? true}
            >
                {getIconByType(Portal[0]?.type)}
                {Portal[0]?.content}
                {/* <Text theme={portal.exportText}>
                    您確定要將 <Text theme={portal.highLightText}>{props.delWho}</Text> 的帳號從管理員名單中移除嗎？
                </Text> */}
            </JumpDialog>}
        </>
    )
}

export const Portal = styled(PortalBase).attrs((props) => ({}))`

`