import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../Store/store'
import styled from 'styled-components';
import { BasicContainer } from './Containers';
import { Text } from './Texts';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

//#region  列表排序遞增遞減旋轉箭頭動畫
const ArrowDropUpIconTrans = styled(ArrowDropUpIcon).attrs((props) => ({}))`

&& {
    //動畫
    animation: ${props => props?.theme?.animation ?? 'initial'};
    animation-fill-mode: forwards;
    position: absolute;
    left: ${props => props?.theme?.left ?? 'initial'};
    top: ${props => props?.theme?.top ?? 'initial'};
    color: ${props => props?.theme?.color ?? '#595959'};
    display: ${props => props?.theme?.display ?? 'initial'};

    @keyframes iconIncrease {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

    @keyframes iconDecrease {
        0% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }
}
`
//#endregion

//#region 一般列表基底
const TableBase = (props) => {

    const { Theme } = useContext(Context);
    const { tables } = Theme;
    const [CheckedArray, setCheckedArray] = useState([]);//目前已勾選
    const [CheckedPatchArray, setCheckedPatchArray] = useState([]);//存放當頁所有id
    const [ColOrder, setColOrder] = useState({ colName: "", order: "" });//存放欄位排序狀況 
    const [Data, setData] = useState([]);
    const [PagesInfo, setPagesInfo] = useState({});//頁面資訊

    useEffect(() => {
        //console.log(props.data)
        setPagesInfo(props.data);
        setData(props.data.data);
        setCheckedPatchArray((props.data.data ?? []).map((item, index) => (
            item.Id
        )))
        setColOrder({ colName: "", order: "" })
    }, [props.data])

    //#region 換頁時頁腳邏輯
    const pageHandler = () => {
        if (PagesInfo.pageCount) {
            if (PagesInfo.pageCount < 6) {
                //進來代表總頁數小於六
                return new Array(PagesInfo.pageCount - 1).fill(1).map((item, index) => (
                    <Text key={`pages${index}`} onClick={() => {
                        props.turnPageExecute(index + 1);
                        setColOrder({ colName: "", order: "" });
                    }}
                        theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === (index + 1) && { textDecoration: "underline" }) }}>{index + 1}</Text>
                ))
            } else {
                //進來代表總頁數大於六
                if (PagesInfo.pageCount - PagesInfo.page < 3) {
                    // console.log("右方不足夠容納兩頁")
                    // 右方不足夠容納兩頁
                    return (<>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.pageCount - 5); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === PagesInfo.pageCount - 5 && { textDecoration: "underline" }) }}>{PagesInfo.pageCount - 5}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.pageCount - 4); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === PagesInfo.pageCount - 4 && { textDecoration: "underline" }) }}>{PagesInfo.pageCount - 4}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.pageCount - 3); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === PagesInfo.pageCount - 3 && { textDecoration: "underline" }) }}>{PagesInfo.pageCount - 3}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.pageCount - 2); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === PagesInfo.pageCount - 2 && { textDecoration: "underline" }) }}>{PagesInfo.pageCount - 2}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.pageCount - 1); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === PagesInfo.pageCount - 1 && { textDecoration: "underline" }) }}>{PagesInfo.pageCount - 1}</Text>

                    </>)
                } else if (PagesInfo.page - 1 < 2) {
                    // console.log("左方不足夠容納兩頁")
                    return (<>
                        <Text onClick={() => { props.turnPageExecute(1); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === 1 && { textDecoration: "underline" }) }}>{1}</Text>
                        <Text onClick={() => { props.turnPageExecute(2); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === 2 && { textDecoration: "underline" }) }}>{2}</Text>
                        <Text onClick={() => { props.turnPageExecute(3); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === 3 && { textDecoration: "underline" }) }}>{3}</Text>
                        <Text onClick={() => { props.turnPageExecute(4); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === 4 && { textDecoration: "underline" }) }}>{4}</Text>
                        <Text onClick={() => { props.turnPageExecute(5); }} theme={{ ...tables.footerPagesFirstText, ...(PagesInfo.page === 5 && { textDecoration: "underline" }) }}>{5}</Text>
                    </>)
                } else {
                    // console.log("其他情況")
                    return (<>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.page - 2); }} theme={{ ...tables.footerPagesFirstText }}>{PagesInfo.page - 2}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.page - 1); }} theme={{ ...tables.footerPagesFirstText }}>{PagesInfo.page - 1}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.page); }} theme={{ ...tables.footerPagesFirstText, textDecoration: "underline" }}>{PagesInfo.page}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.page + 1); }} theme={{ ...tables.footerPagesFirstText }}>{PagesInfo.page + 1}</Text>
                        <Text onClick={() => { props.turnPageExecute(PagesInfo.page + 2); }} theme={{ ...tables.footerPagesFirstText }}>{PagesInfo.page + 2}</Text>
                    </>)
                }
            }
        }
    }
    //#endregion

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
                minWidth: (props?.theme?.minWidth ?? "50rem"),
                padding: (props?.theme?.padding ?? "0"),
            }}>
                <BasicContainer theme={{
                    overflowX: "scroll",
                    scrollHeight: "0px",
                }}>
                    <BasicContainer
                        style={{ userSelect: "none" }}
                        theme={{
                            borderTop: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                            borderLeft: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                            borderBottom: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                            display: "flex",
                            minWidth: "fit-content",
                        }}>
                        {props.haveCheck &&
                            <BasicContainer theme={{
                                textAlign: "center",
                                width: props?.theme?.checkColWidth ?? "4rem",
                                padding: "0.5rem",
                                borderRight: props?.theme?.tableBorder ?? "0.5px solid #ebeef5"
                            }} className={"checkbox"} >
                                <Checkbox className={"checkIcon"} checked={(!(CheckedPatchArray ?? []).some(r => !CheckedArray.includes(r)))} onChange={(e) => { CheckedArray.length !== 0 ? setCheckedArray([]) : setCheckedArray(CheckedPatchArray) }} />
                            </BasicContainer>}
                        {(props.title ?? []).map((item, index) => (
                            <BasicContainer key={index} theme={{
                                padding: "0.8rem 0.5rem",
                                textAlign: "left",
                                width: (props?.theme?.[props?.colKeys[index]] ? (props?.theme[props.colKeys[index]].width ?? `calc( ( 100% - ${props?.theme?.checkColWidth ?? (props.haveCheck ? "4.5rem" : "0rem")} ) / ${props?.title?.length} )`) : `calc( ( 100% - ${props?.theme?.checkColWidth ?? (props.haveCheck ? "4.5rem" : "0rem")} ) / ${props?.title?.length} )`),
                                borderRight: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                                cursor: (props?.theme?.[props?.colKeys[index]]?.order ?? false) ? "pointer" : "default",
                            }}
                                onClick={() => {
                                    if (props?.theme?.[props?.colKeys[index]]?.order ?? false) {
                                        setColOrder((o) => ({ colName: item, order: !o.order }));
                                        setData((d) => {
                                            if (ColOrder.order) {
                                                return d.sort((a, b) => {
                                                    if (a[props.colKeys[index]] > b[props.colKeys[index]]) {
                                                        return 1;
                                                    }
                                                    if (a[props.colKeys[index]] < b[props.colKeys[index]]) {
                                                        return -1;
                                                    }
                                                    return 0;
                                                })
                                            } else {
                                                return d.sort((a, b) => {
                                                    if (a[props.colKeys[index]] < b[props.colKeys[index]]) {
                                                        return 1;
                                                    }
                                                    if (a[props.colKeys[index]] > b[props.colKeys[index]]) {
                                                        return -1;
                                                    }
                                                    return 0;
                                                })
                                            }
                                        });
                                    }
                                }}
                            >
                                {/* {console.log("width", (props?.theme?.[props?.colKeys[index]] ? (props?.theme[props.colKeys[index]].width ?? `calc( ( 100% - ${props?.theme?.checkColWidth ?? "4rem"} ) / ${props?.title?.length} )`) : `calc( ( 100% - ${props?.theme?.checkColWidth ?? "4rem"} ) / ${props?.title?.length} )`))} */}
                                <Text theme={{ color: "#909399", fontWeight: "bold", cursor: "pointer" }}>{item}</Text>
                                {
                                    (props?.theme?.[props?.colKeys[index]]?.order ?? false) &&
                                        (ColOrder.colName === item) ?
                                        <ArrowDropUpIconTrans theme={{ animation: (ColOrder.order ? "iconIncrease .5s 1" : "iconDecrease .5s 1") }} />
                                        : null}

                            </BasicContainer>)
                        )
                        }
                        {/*佔位 */}
                        <BasicContainer style={{ userSelect: "none" }} theme={{ position: "relative", right: "0rem", top: props?.theme?.borderwidth ?? "-1px", backgroundColor: "#fff", height: "3.5rem", textAlign: "left", width: "0.5rem" }}><Text theme={{ color: "#00000000", fontSize: "0.1rem" }}>0</Text></BasicContainer>
                        <BasicContainer style={{ userSelect: "none" }} theme={{ position: "absolute", right: "0rem", bottom: props?.theme?.borderwidth ?? "-1px", backgroundColor: "#fff", height: "3.5rem", textAlign: "left", width: "0.5rem" }}><Text theme={{ color: "#00000000", fontSize: "0.1rem" }}>0</Text></BasicContainer>
                    </BasicContainer>
                </BasicContainer>
                <BasicContainer theme={{
                    overflowX: "scroll",
                    overflowY: "scroll", //width: "calc( 100% + 0.5rem )",
                    scrollHeight: "0.5rem",
                    zIndex: "1"
                }}
                    onScroll={(e) => { scrollXTogether(e) }}
                >
                    {/* 
                    //min-width: ${props => props?.theme?.minWidth ?? 'fit-content'}; //表格最小寬度
                    border-spacing: 0px; */}
                    <BasicContainer theme={{
                        height: props?.showHowManyRows ? `calc( ${props.showHowManyRows} * 3.5rem )` : `${props?.showHowManyRows}rem` ?? 'initial',
                    }}>
                        {(Data ?? []).map((item, index) => (
                            <BasicContainer theme={{
                                display: "flex",
                                minWidth: "fit-content",
                                borderLeft: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                                borderBottom: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                                hoverBackgroundColor: props?.theme?.rowHoverBackgroundColor ?? "#f5f7fa",
                            }} key={`tr${index}`}>

                                {props.haveCheck &&
                                    <BasicContainer
                                        className={"checkbox"}
                                        theme={{
                                            padding: "0.5rem",
                                            width: props?.theme?.checkColWidth ?? "4rem",
                                            textAlign: "center",
                                            borderRight: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                                        }}
                                    >
                                        <Checkbox
                                            onChange={(e) => {
                                                (CheckedArray.includes(item.Id) ?
                                                    setCheckedArray(CheckedArray.filter((it) => (it !== item.Id)))
                                                    : setCheckedArray((c) => ([...c, item.Id])))
                                            }}
                                            checked={(CheckedArray.includes(item.Id))} className={"checkIcon"} />
                                    </BasicContainer>}
                                {(props.colKeys ?? []).map((subItem, subIndex) => (
                                    <BasicContainer
                                        key={`${subItem}${subIndex}`}
                                        theme={{
                                            width: (props?.theme?.[props?.colKeys[subIndex]] ? (props?.theme[props.colKeys[subIndex]].width ?? `calc( ( 100% - ${props?.theme?.checkColWidth ?? (props.haveCheck ? "4rem" : "0rem")} ) / ${props?.title?.length} )`) : `calc( ( 100% - ${props?.theme?.checkColWidth ?? (props.haveCheck ? "4rem" : "0rem")} ) / ${props?.title?.length} )`),
                                            padding: "0.8rem 0.5rem",
                                            borderRight: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                                        }}>
                                        {props?.theme?.[subItem]?.render ?
                                            props.theme[subItem].render(item[subItem], item.Id ?? null, item)
                                            : < Text key={`tr${subIndex}`} theme={{ fontSize: "1rem", color: "#595959" }}>{`${item[subItem]}`}</Text>
                                        }
                                    </BasicContainer>
                                ))
                                }
                            </BasicContainer>
                        ))}
                    </BasicContainer>
                </BasicContainer>
            </BasicContainer >
            <BasicContainer theme={{
                top: "-0.5rem",
                padding: "0 0.5rem 0 0",
                position: "relative",
                width: (props?.theme?.width ?? "100%"),
                minWidth: (props?.theme?.minWidth ?? "50rem"),

            }}>
                <BasicContainer theme={{
                    height: "3.5rem",
                    borderRight: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                    borderLeft: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                    borderBottom: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                    borderTop: props?.theme?.tableBorder ?? "0.5px solid #ebeef5",
                }}>
                    <BasicContainer theme={{
                        position: "absolute",
                        right: "0.5rem",
                        padding: "1rem 0rem 0",
                    }}>
                        <BasicContainer style={{ userSelect: "none" }} theme={{ padding: "0.2rem 2rem", }}>
                            <FirstPageIcon style={{
                                position: "absolute",
                                color: "#595959",
                                left: "0rem",
                                top: "0.2rem",
                                cursor: "pointer"
                            }}
                                onClick={() => {
                                    props.turnPageExecute(1)
                                    setColOrder({ colName: "", order: "" })
                                }}
                            ></FirstPageIcon>
                            <LastPageIcon style={{
                                position: "absolute",
                                color: "#595959",
                                right: "0rem",
                                top: "0.2rem",
                                cursor: "pointer"
                            }}
                                onClick={() => {
                                    props.turnPageExecute(PagesInfo.pageCount)
                                    setColOrder({ colName: "", order: "" })
                                }}
                            ></LastPageIcon>
                            {pageHandler()}
                            <Text theme={tables.footerPagesDotText}>...</Text>
                            <Text onClick={() => {
                                props.turnPageExecute(PagesInfo.pageCount);
                            }}
                                theme={{ ...tables.footerPagesLastText, ...(PagesInfo.page === PagesInfo.pageCount && { textDecoration: "underline" }) }}>
                                {PagesInfo.pageCount}
                            </Text>
                        </BasicContainer>
                    </BasicContainer>
                </BasicContainer>
            </BasicContainer>
        </>
    )
}
//#endregion

//#region 一般列表
/* 
   Date   : 2020-06-24 23:04:27
   Author : Arhua Ho
   Content: 一般列表，各項可控與可增加欄位，並可依render決定顯示欄位內容
            可傳入props : 
                data={TableData} //原始資料，如下 : 
                    {
                        PageSize: 10,
                        data: (10) [{
                            Id : int,
                            Name : "xxx",
                            Description : "xxx",
                            Enabled : Boolean
                        }, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}],
                        dataCount: 102
                        page: 2
                        pageCount: 11
                    }
                title={["名稱", "描述", "狀態", "操作"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                colKeys={["Name", "Description", "Enabled", "controll"]} //必傳
                haveCheck={true} //是否開啟勾選欄，預設不開啟
                showHowManyRows={10} //顯示列數 * 3.5rem
                turnPageExecute={(executePages) => { execute(executePages, keyWord) }}//發查翻頁，必傳否則不能翻頁
                theme={{
                    width:"", //外層容器寬度
                    minWidth:"", //外層容器最小寬度
                    padding:"", //外層容器內距
                    checkColWidth: "6rem", //勾選欄寬度
                    checkIconSize: "2rem", //勾選框大小
                    checkIconColor: "red", //勾選框顏色
                    checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                    rowHoverBackgroundColor: "black", // hover資料列背景色
                    tableBorder: "2px solid black", // 列表的整體邊框樣式
                    borderwidth: "2px",
                    "Name": {
                        // width: "20rem", // 調整個別欄寬度
                        // render 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                        // render: (item, id) => (`${item} ${id} sdf`)
                        order: true // 是否開啟排序，預設為不開啟
                    },
                    "Description": {
                        //width: "5rem",
                        // render: (item) => (`${item}sdf`)
                        order: true // 是否開啟排序，預設為不開啟
                    },
                    "Enabled": {
                        //width: "20rem",
                        render: (item, id) => ((item ?
                            <Tag theme={userRoles.enableTag}>啟用</Tag>
                            : <Tag theme={userRoles.disableTag}>禁用</Tag>))
                    },
                    "controll": {
                        //width: "20rem",
                        render: (item, id) => {
                            let buttons = [];
                            (JSON.parse(getItemlocalStorage("PagesCanUseButtonByRole"))["角色管理"] ?? []).forEach((it, index) => {
                                if (it === "編輯") {
                                    buttons.push(
                                        <StyledIconButton key={it} theme={userRoles.pageTitleBarEdit} onClick={() => { EditCardOpen() }}>編輯</StyledIconButton>
                                    )
                                }
                                if (it === "刪除") {
                                    buttons.push(
                                        <StyledIconButton key={it} theme={userRoles.pageTitleBarDel} onClick={() => { DelCardOpen() }}>刪除</StyledIconButton>
                                    )
                                }
                            })

                            return buttons;
                        }
                    },
                }} />
*/
export const TableBasic = styled(TableBase).attrs((props) => ({}))`

    .checkIcon {
        width: ${props => props?.theme?.checkIconSize ?? '1rem'}; 
        height: ${props => props?.theme?.checkIconSize ?? '1rem'}; 
        
        span {
        
            svg {
                width: ${props => props?.theme?.checkIconSize ? `calc( ${props.theme.checkIconSize} + 0.2rem )` : '1.2rem'}; 
                height: ${props => props?.theme?.checkIconSize ? `calc( ${props.theme.checkIconSize} + 0.2rem )` : '1.2rem'};
                color: ${props => props?.theme?.checkIconColor ?? '#409eff'};
            }
        
        }
    
    }

    && .MuiCheckbox-colorSecondary.Mui-checked {
        color: ${props => props?.theme?.checkIconColor ?? '#409eff'};
    }

    && .MuiCheckbox-colorSecondary.Mui-checked:hover , .MuiIconButton-colorSecondary:hover {
        background-color: ${props => props?.theme?.checkIconHoverBackgroundColor ?? '#409eff17'};
    }
}
`
//#endregion