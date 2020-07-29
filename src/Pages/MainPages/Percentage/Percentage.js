import React, { useContext, useCallback, useState, useEffect, useRef } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { PercentagePageTitleAddSearch } from './PercentagePageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { TableBasic } from '../../../Components/Tables';
import { TooltipBasic } from '../../../Components/Tooltips';
import { Text } from '../../../Components/Texts'
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';

import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'

export const Percentage = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { percentagePage: { percentage } } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [TableData2, setTableData2] = useState([]);
    const [TableData3, setTableData3] = useState([]);
    const [ScrollPage, setScrollPage] = useState(2); // 滾動到底部加載頁面
    const [ScrollPage2, setScrollPage2] = useState(2); // 滾動到底部加載頁面
    const [ScrollPage3, setScrollPage3] = useState(2); // 滾動到底部加載頁面
    const [SearchWord, setSearchWord] = useState(""); // 儲存關鍵字，供翻頁時的查詢用
    const [width] = useWindowSize();
    const [ChoosenTag, setChoosenTag] = useState(1);
    const [SearchDate, SearchDatehandler, SearchDateregExpResult, SearchDateeResetValue] = useForm([new Date(), new Date()], [""], [""]);

    // const isFirstRun = useRef(true);
    // useEffect(() => {
    //     if (isFirstRun.current) {
    //         isFirstRun.current = false;
    //         return;
    //     }
    //     execute(1, SearchDate);
    //     execute2(1, SearchDate);
    //     execute3(1, SearchDate);
    // }, [SearchDate])
    //#region 查詢列表API
    const getShopPercentByPageOrkey = useCallback(async (page = 1, searchDate, key) => {
        let today = dateTrans(new Date());
        let startDate = searchDate?.[0] ? dateTrans(searchDate?.[0]) : today;
        let endDate = searchDate?.[1] ? dateTrans(searchDate?.[1]) : today;
        //console.log("DATE", today, startDate, endDate, searchDate);
        return await fetch(`${APIUrl}api/Report/GetShopReport?startDate=${startDate}&endDate=${endDate}&page=${page}&orderBy=2&key=${(key ? `${key}` : "")}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData(PreResult.response);
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute, Pending] = useAsync(getShopPercentByPageOrkey, true);
    //#endregion

    //#region 滾動底部加載查詢列表API
    const getShopPercentByPageOrkeyScrollBottom = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/Report/GetShopReport?startDate=2020-07-17&endDate=2020-07-17&page=1&orderBy=2&key=`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData((d) => ({ ...d, data: [...(d?.data ?? []), ...PreResult.response.data] }));
                setScrollPage((p) => (p + 1)); // 頁數+1
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeScrollBottom, PendingScrollBottom] = useAsync(getShopPercentByPageOrkeyScrollBottom, false);
    //#endregion


    //#region 查詢列表API
    const getRegionPercentByPageOrkey = useCallback(async (page = 1, searchDate, key) => {
        let today = dateTrans(new Date());
        let startDate = searchDate?.[0] ? dateTrans(searchDate?.[0]) : today;
        let endDate = searchDate?.[1] ? dateTrans(searchDate?.[1]) : today;
        return await fetch(`${APIUrl}api/Report/GetAreaReport?startDate=${startDate}&endDate=${endDate}&page=${page}&orderBy=2&key=${(key ? `${key}` : "")}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData2(PreResult.response);
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute2, Pending2] = useAsync(getRegionPercentByPageOrkey, true);
    //#endregion

    //#region 滾動底部加載查詢列表API
    const getRegionPercentByPageOrkeyScrollBottom = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/Report/GetAreaReport?startDate=2020-07-17&endDate=2020-07-17&page=1&orderBy=1&key=`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData2((d) => ({ ...d, data: [...(d?.data ?? []), ...PreResult.response.data] }));
                setScrollPage2((p) => (p + 1)); // 頁數+1
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeScrollBottom2, PendingScrollBottom2] = useAsync(getRegionPercentByPageOrkeyScrollBottom, false);
    //#endregion


    //#region 查詢列表API
    const getMasterPercentByPageOrkey = useCallback(async (page = 1, searchDate, key) => {
        let today = dateTrans(new Date());
        let startDate = searchDate?.[0] ? dateTrans(searchDate?.[0]) : today;
        let endDate = searchDate?.[1] ? dateTrans(searchDate?.[1]) : today;
        return await fetch(`${APIUrl}api/Report/GetMasterReport?startDate=${startDate}&endDate=${endDate}&page=${page}&orderBy=2&key=${(key ? `${key}` : "")}`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData3(PreResult.response);
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute3, Pending3] = useAsync(getMasterPercentByPageOrkey, true);
    //#endregion

    //#region 滾動底部加載查詢列表API
    const getMasterPercentByPageOrkeyScrollBottom = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/Report/GetMasterReport?startDate=2020-07-17&endDate=2020-07-17&page=1&orderBy=1&key=`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }


                //console.log(PreResult.response)
                setTableData3((d) => ({ ...d, data: [...(d?.data ?? []), ...PreResult.response.data] }));
                setScrollPage3((p) => (p + 1)); // 頁數+1
                return "查詢角色表格資訊成功"

            })
            .catch((Error) => {
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeScrollBottom3, PendingScrollBottom3] = useAsync(getMasterPercentByPageOrkeyScrollBottom, false);
    //#endregion


    return (
        <>
            {width > 768 && <BasicContainer theme={percentage.basicContainer}>
                <PercentagePageTitleAddSearch
                    setTag={setChoosenTag}
                    tag={ChoosenTag}
                    searchDate={SearchDate}
                    searchDateeResetValue={SearchDateeResetValue}
                    execute={execute}
                    execute2={execute2}
                    execute3={execute3}
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
                <BasicContainer theme={percentage.tableBasicContainer}>
                    {ChoosenTag === 1 && <TableBasic
                        data={TableData} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["門市名稱", "所屬縣市", "預約次數", "預約率"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["ShopName", "ShopCounty", "ReservationCount", "ReservationRate"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchDate, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "ShopName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "25%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ShopCounty": {
                                // width: "45rem",
                                width: "25%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationCount": {
                                // width: "20rem",
                                width: "25%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}次</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationRate": {
                                // width: "20rem",
                                width: "25%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item * 100}%</Text>
                                    </TooltipBasic>))
                            },

                        }} />}
                    {ChoosenTag === 2 && <TableBasic
                        data={TableData2} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["區域名稱", "總預約次數", "已完成", "逾時未完成", '尚未執行']} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["AreaName", "ReservationCount", "CompleteCount", "CancelCount", 'NotPerformedCount']} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "AreaName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationCount": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },
                            "CompleteCount": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{`${item}筆`}</Text>
                                    </TooltipBasic>))
                            },
                            "CancelCount": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },
                            "NotPerformedCount": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },

                        }} />}
                    {ChoosenTag === 3 && <TableBasic
                        data={TableData3} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["姓名", "預約次數", "已完成"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["MasterName", "ReservationCount", "CompleteCount"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "MasterName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationCount": {
                                // width: "45rem",
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "CompleteCount": {
                                // width: "20rem",
                                width: "33%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                            display: "inline-block",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },


                        }} />}
                </BasicContainer>
            </BasicContainer>}
            {width <= 768 && <BasicContainer theme={percentage.basicContainer}>
                <PercentagePageTitleAddSearch tableBasicContainerLessThan768
                    setTag={setChoosenTag}
                    tag={ChoosenTag}
                    searchDate={SearchDate}
                    searchDateeResetValue={SearchDateeResetValue}
                    execute={execute}
                    execute2={execute2}
                    execute3={execute3}
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
                <BasicContainer theme={percentage.tableBasicContainer}>
                    {ChoosenTag === 1 && <TableBasic
                        data={TableData} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["門市名稱", "預約次數", "預約率"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["ShopName", "ReservationCount", "ReservationRate"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "ShopName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },

                            "ReservationCount": {
                                // width: "20rem",
                                width: "33%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}次</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationRate": {
                                // width: "20rem",
                                width: "34%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item * 100}%</Text>
                                    </TooltipBasic>))
                            },

                        }} />}
                    {ChoosenTag === 2 && <TableBasic
                        data={TableData2} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["區域名稱", "總預約次數", "已完成"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["AreaName", "ReservationCount", "CompleteCount"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "AreaName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationCount": {
                                // width: "45rem",
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },
                            "CompleteCount": {
                                // width: "20rem",
                                width: "34%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{`${item}筆`}</Text>
                                    </TooltipBasic>))
                            },
                            "CancelCount": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },
                            "NotPerformedCount": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}筆</Text>
                                    </TooltipBasic>))
                            },

                        }} />}
                    {ChoosenTag === 3 && <TableBasic
                        data={TableData3} //原始資料
                        noDataMsg={"該區間無資料"}
                        title={["姓名", "預約次數", "已完成"]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["MasterName", "ReservationCount", "CompleteCount"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
                            rowHeight: "4rem",
                            titleRowHeight: "4rem",
                            // padding:"", //外層容器內距
                            // checkColWidth: "6rem", //勾選欄寬度
                            // checkIconSize: "2rem", //勾選框大小
                            // checkIconColor: "red", //勾選框顏色
                            // checkIconHoverBackgroundColor: "black", //勾選框大小Hover背景顏色
                            // rowHoverBackgroundColor: "black", // hover資料列背景色
                            // tableBorder: "2px solid #e5e5e5", // 列表的整體邊框樣式
                            // borderwidth: "2px",

                            "MasterName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "ReservationCount": {
                                // width: "45rem",
                                width: "33%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "CompleteCount": {
                                // width: "20rem",
                                width: "33%",
                                order: true,
                                render: (item, id) => (((item || item === 0) &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                            display: "inline-block",
                                        }}
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },


                        }} />}
                </BasicContainer>
            </BasicContainer>
            }
        </>
    )
}