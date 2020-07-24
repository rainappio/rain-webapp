import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicContainer } from '../../../Components/Containers';
import { Text } from '../../../Components/Texts'

//#region 標題列資料
const hours = [
    "",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
]
//#endregion

//#region 單個預約訂單組件
const SingleOrderBase = (props) => {
    return (
        <>
            <BasicContainer theme={{
                display: "block", borderLeft: "2px solid #964f19", height: "100%",
                backgroundColor: "#eee3da",
                borderRadius: "0 0.25rem 0.25rem 0",
                padding: "0 0 0 0.5rem"
            }}>
                {/* 時間 */}
                <Text theme={{
                    display: "inline-block",
                    fontSize: ".875rem",
                    color: "#964f19",
                    margin: "0.5rem 0 0",
                    userSelect: "none"
                }}>{`${props.data.ReservationDate.split("T")[1].substring(0, 5)} - ${parseInt(props.data.ReservationDate.split("T")[1].substring(0, 5)) + 1}:00`}</Text>
                {/* 分店 */}
                <Text theme={{
                    display: "inline-block",
                    fontSize: ".875rem",
                    color: "#964f19",
                    width: "100%",
                    fontWeight: "900",
                    userSelect: "none"
                }}>{props.data.ShopName}</Text>
                {/* 行政區 */}
                <Text theme={{
                    display: "inline-block",
                    fontSize: ".75rem",
                    color: "#964f19",
                    margin: "0 0 0rem 0",
                    fontWeight: "900",
                    position: "absolute",
                    right: "0.23rem",
                    top: "1.75rem",
                    userSelect: "none"
                }}>{props.data.ShopAddr.substring(0, 2)}</Text>
                {/* 客 */}
                <Text theme={{
                    display: "inline-block",
                    fontSize: ".75rem",
                    color: "#fff",
                    textAlign: "center",
                    margin: "0 0.3rem 0.5rem 0",
                    fontWeight: "900",
                    width: "1rem",
                    height: "1.5rem",
                    lineHeight: "1.5rem",
                    backgroundColor: "#6d3f00",
                    borderRadius: "50%",
                    userSelect: "none"
                }}>客</Text>
                {/* 客戶名稱 */}
                <Text theme={{
                    display: "inline-block",
                    fontSize: ".75rem",
                    color: "#964f19",
                    margin: "0 0 0.5rem 0",
                    fontWeight: "900",
                    userSelect: "none"
                }}>{props.data.CustomerName}</Text>
            </BasicContainer>
        </>
    )
}

const SingleOrder = styled(SingleOrderBase).attrs((props) => ({}))`

`
//#endregion

const ordersFormatTrans = (orders = []) => {
    let orderMasterBeKeyWithOrders = {};

    orders.forEach((item, index) => {
        if (item.MasterName !== "")
            if (!Object.keys(orderMasterBeKeyWithOrders).includes(item.MasterName)) {
                orderMasterBeKeyWithOrders[item.MasterName] = {};
                orderMasterBeKeyWithOrders[item.MasterName][item.ReservationDate.split("T")[1].substring(0, 5)] = item;
            } else {
                orderMasterBeKeyWithOrders[item.MasterName][item.ReservationDate.split("T")[1].substring(0, 5)] = item;
            }
    });
    // console.log(orderMasterBeKeyWithOrders)
    if (Object.keys(orderMasterBeKeyWithOrders).length > 0) {
        return Object.keys(orderMasterBeKeyWithOrders).map((item, index) => {
            return (
                <BasicContainer
                    key={index}
                    style={{ userSelect: "none" }}
                    theme={{
                        backgroundColor: "#f8f5f2",
                        //width: "100%",
                        display: "flex",
                        //minWidth: "fit-content",
                        //whiteSpace: "nowrap", //在導行列的時候可以用
                        minWidth: "0",
                        height: "5.375rem",
                    }}>
                    <Text
                        style={{ flex: "none" }}
                        theme={{
                            width: "8.125rem",
                            height: "100%",
                            lineHeight: "5.375rem",
                            textAlign: "center",
                            color: "#6d3f00",
                            fontWeight: 900,
                            display: "block",
                            border: "",
                            borderBottom: "0.5px solid #e5e5e5",
                            borderRight: "0.5px solid #e5e5e5",
                            backgroundColor: "#fcfaf9",
                            userSelect: "none"
                            //flex: "none",
                        }}>
                        {item}
                    </Text>
                    {
                        hours.slice(1).map((subItem, subIndex) => {
                            return (
                                <BasicContainer
                                    key={subIndex}
                                    theme={{
                                        //padding:"0.5rem 0 0 0",
                                        width: "8.125rem",
                                        height: "100%",
                                        display: "block",
                                        borderBottom: "0.5px solid #e5e5e5",
                                        borderRight: subIndex !== 12 ? "0.5px solid #e5e5e5" : null,
                                        backgroundColor: "#fcfaf9",
                                        flex: "none",
                                        padding: "0.3rem 0.125rem 0.3rem 0"
                                    }}>
                                    {orderMasterBeKeyWithOrders[item]?.[subItem] && < SingleOrder data={orderMasterBeKeyWithOrders[item][subItem]} />}
                                </BasicContainer>
                            )
                        })
                    }
                </BasicContainer >
            )
        })
    } else {

        return (<Text theme={{ fontWeight: "600", display: "block", height: "12.5rem", lineHeight: "12.5rem", fontSize: "1.125rem", color: "#d25959", textAlign: "center", width: "100%" }}>該日無派遣單</Text>);
    }

}

const DispatchBoardTableBase = (props) => {

    //#region 確保列表連動
    const [ScrollXY, setScrollXY] = useState([0, 0]);
    const scrollXTogether = (e) => {
        let which = e.target;
        if (which.scrollLeft !== ScrollXY[0]) {
            setScrollXY((s) => ([which.scrollLeft, s[1]]));
            //Put behaviour for X scroll here
            //console.log(e.target.parentElement.children[0].scrollLeft)
            e.target.parentElement.children[0].scrollLeft = which.scrollLeft;
        }
        //if (which.scrollTop !== ScrollXY[1]) {
        //setScrollXY((s) => ([s[0], which.scrollTop]));
        //Put behaviour for Y scroll here
        //e.target.parentElement.children[2].scrollTop = which.scrollTop;
        //}
    }
    //#endregion

    return (
        <>
            <BasicContainer className={props.className} theme={{
                // 供外部調整表格大小、最小寬度、內距
                position: "relative",
                width: (props?.theme?.width ?? "100%"),
                minWidth: (props?.theme?.minWidth ?? "0"),
                padding: (props?.theme?.padding ?? "0"),
            }}>
                {/* 時間軸 */}
                <BasicContainer
                    className={"title"}
                    style={{ userSelect: "none" }}
                    theme={{
                        backgroundColor: "#f8f5f2",
                        //borderTop: props?.theme?.tableBorder ?? "0.5px solid #e5e5e5",
                        //borderLeft: props?.theme?.tableBorder ?? "0.5px solid #e5e5e5",
                        //borderBottom: props?.theme?.tableBorder ?? "0.5px solid #e5e5e5",
                        //display: "flex",
                        width: "100%",
                        overflowX: "scroll",
                        scrollHeight: "0px",
                        //minWidth: "fit-content",
                        whiteSpace: "nowrap",
                        minWidth: (props?.theme?.minWidth ?? "0"),
                        height: props?.theme?.titleRowHeight ?? "2rem",
                        padding: "0 0.5rem 0 0",
                        scrollConerColor: "#f8f5f2",
                    }}>
                    {hours.map((item, index) => (
                        <Text
                            style={{ width: "8.125rem" }}
                            theme={{ left: "-1.3rem", borderBottom: "0.5px solid #e5e5e500", display: "inline-block", color: "#666", fontWeight: "600", cursor: "default", fontSize: "1rem", userSelect: "none", }}>{item}</Text>
                    ))}
                </BasicContainer>
                <BasicContainer theme={{ width: "calc( 100% - 0.5rem )", borderBottom: props?.theme?.tableBorder ?? "0.5px solid #e5e5e5", }}></BasicContainer>
                {/* 按足健師橫列派遣單資訊 */}
                <BasicContainer
                    style={{ userSelect: "none" }}
                    theme={{
                        overflowX: "scroll",
                        overflowY: "scroll", //width: "calc( 100% + 0.5rem )",
                        scrollConerColor: "#f8f5f2",
                        scrollHeight: "0.5rem",
                        zIndex: "1",
                        maxHeight: "calc( 100vh - 13.5rem )",
                        padding: "0 0.5rem 0rem 0" //看可不可以不要站位
                    }}
                    onScroll={(e) => { scrollXTogether(e) }}
                >
                    {props.data && ordersFormatTrans(props.data)}
                </BasicContainer>

            </BasicContainer>
        </>
    )
}

export const DispatchBoardTable = styled(DispatchBoardTableBase).attrs((props) => ({}))`

`