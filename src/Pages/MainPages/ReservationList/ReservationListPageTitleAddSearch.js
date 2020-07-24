import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/store'
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { EasyButton } from '../../../Components/Buttons';
import { SearchTextInput, FormControl, FormRow, FormCardSelector } from '../../../Components/Forms';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { Text } from '../../../Components/Texts';
import { DatePicker } from '../../../Components/DatePicker';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory, useLocation } from 'react-router-dom';
import { portalService } from '../../../Components/Portal';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useAsync } from '../../../SelfHooks/useAsync';

const ReservationListPageTitleAddSearchBase = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationListPageTitleAddSearch } } } = Theme;
    const [IsExpand, setIsExpand] = useState(false);
    let history = useHistory();

    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [DateRegion, DateRegionhandler, DateRegionregExpResult, DateRegionResetValue] = useForm([new Date(), new Date()], [""], [""]);//日期區間欄位
    const [Mode, Modehandler, ModeregExpResult, ModeResetValue] = useSelector({ value: "all", label: "全部" }, [], []); // 狀態欄位

    let isThisWeek = new URLSearchParams(useLocation().search);//取得參數

    useEffect(() => {
        //DateRegionResetValue([new Date('2020-07-01'), new Date('2020-07-30')])
        //console.log(isThisWeek.get("thisWeek"))
        /* 
           Date   : 2020-07-17 14:02:36
           Author : Arhua Ho
           Content: 後端API並沒有吃狀態欄位，所以無法依狀態塞選訂單，依據下拉選單查詢欄位邏輯待確認
        */
        if (parseInt(isThisWeek.get("thisWeek")) === 1) {
            props.execute && props.execute(dateTrans(DateRegion[0]), dateTransAndGetWeek(DateRegion[0]), SearchWord);//若等於1的就是過去一週
            DateRegionResetValue([DateRegion[0], addDays(DateRegion[0], 6)]);
            props.setDateRange && props.setDateRange([DateRegion[0], addDays(DateRegion[0], 6)]);
        } else if (parseInt(isThisWeek.get("thisWeek")) === 0) {
            props.execute && props.execute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord);//若等於0查的就是今天
            DateRegionResetValue([DateRegion[0], DateRegion[0]])
            props.setDateRange && props.setDateRange([DateRegion[0], DateRegion[0]]);
        } else {
            props.execute(dateTrans(), dateTrans(addMonths(new Date(), 3)), SearchWord);//若沒有Parma查的就是未來三個月
            DateRegionResetValue([new Date(), addMonths(new Date(), 3)]);
            props.setDateRange && props.setDateRange([new Date(), addMonths(new Date(), 3)]);
        }

    }, [])

    //#region 查詢列表API
    const getOrdersList = useCallback(async (startDate, endDate, key, mode) => {
        return await fetch(`${APIUrl}api/OrderQuestionnaire/GetQuestionnaireReport?_date=${startDate}&_eDate=${endDate}&key=${(key ? `${key}` : "")}`,
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

                if (PreResult.success) {
                    //console.log(PreResult.response)
                    //setTableData(PreResult.response);
                    return "查詢角色表格資訊成功"
                } else {
                    throw new Error("查詢角色表格資訊失敗");
                }
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

    const [ExportExecute, ExportPending] = useAsync(getOrdersList, false);


    if (!props.tableBasicContainerLessThan768) {
        return (
            <>
                <FormControl theme={{}} onSubmit={(e) => {
                    e.preventDefault();
                    //console.log("dsfdf")
                    props.execute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord); props.setSearchWord(SearchWord)
                }}>
                    <Container theme={{ justify: "space-between", padding: "40px 0 29px 40px", }}>
                        {/* 標題 */}
                        <SubContainer>
                            <Text theme={{
                                display: "inline-block",
                                fontSize: "1.75em",
                                fontWeight: 600,
                                color: "#444",
                                userSelect: "none"
                            }}>預約清單</Text>
                        </SubContainer>
                        {/* 日期區間選單、搜尋輸入框 */}
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <FormRow theme={reservationListPageTitleAddSearch.addAndSearchFormRow}>
                                <SubContainer theme={reservationListPageTitleAddSearch.addButtonSubContainer}>
                                    <DatePicker
                                        getDate={DateRegionResetValue}
                                        value={DateRegion}// [startDate,endDate]
                                        doThings={(date) => {
                                            props.execute(dateTrans(date[0]), dateTrans(date[1]), SearchWord);
                                            props.setDateRange && props.setDateRange([date[0], date[1]]);
                                        }}
                                    ></DatePicker>
                                    {/* {console.log(DateRegion)} */}
                                </SubContainer>
                                <SearchTextInput
                                    value={SearchWord}
                                    onChange={SearchWordhandler}
                                    regExpResult={SearchWordregExpResult}
                                    placeholder={"搜尋姓名、電話、Email"}
                                    theme={reservationListPageTitleAddSearch.searchInput}
                                    searchOnClick={() => { props.execute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord); props.setSearchWord(SearchWord) }}
                                />
                            </FormRow>
                        </SubContainer>
                    </Container>
                    {/* 狀態選單、匯出問券按鈕 */}
                    <FormRow theme={{ justify: "space-between", padding: "0px 0 24px 40px", }}>
                        <BasicContainer theme={{ width: "7.2rem" }}>
                            < FormCardSelector
                                //label={""}
                                //hint={""}
                                placeholder={"Mode狀態"}
                                value={Mode}
                                isSearchable
                                options={[
                                    { value: "all", label: "全部" },
                                    { value: "undone", label: "即將到來" },
                                    { value: "overtime", label: "逾時未完成" },
                                    { value: "done", label: "已完成" },
                                    { value: "cancle", label: "已取消" },
                                ]}
                                onChange={(values) => {
                                    ModeResetValue(values);
                                    props.setMode && props.setMode(values)
                                    //這裡的邏輯有問題  (首先要確定status對應規則)
                                    //1.舊版本 在一開始進入頁面時，
                                    //  若是本日進入，且"直接"改動狀態，則發查本日資料並對應篩選status資料
                                    //  若是本周進入，且"直接"改動狀態，則發查下周資料並對應篩選status資料
                                    //  若是透過側邊欄進入，且"直接"改動狀態，則發查近三月資料並對應塞選status資料
                                    //  且 "日期欄位並未更動，不管查詢的是本日；下周、近三月"資料，日期都不會隨之更動
                                    //  唯 "在更改日期後"，才顯示 "當前真實" 查詢區間
                                    //
                                    // if (true) {
                                    // }
                                }}
                                regExpResult={ModeregExpResult}
                                theme={reservationListPageTitleAddSearch.modeSelector}
                            ></FormCardSelector>
                        </BasicContainer>
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <EasyButton
                                onClick={() => {
                                    portalService.normal({
                                        autoClose: false,
                                        yes: () => { ExportExecute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord) },
                                        yesText: "是",
                                        noText: "否",
                                        content: (
                                            <>
                                                <Text theme={reservationListPageTitleAddSearch.exportText}>
                                                    您確定要匯出問卷嗎？
                                                 </Text>
                                                <Text theme={reservationListPageTitleAddSearch.highLightText}>
                                                    {`起：${dateTrans(DateRegion[0])} ~ 訖：${dateTrans(DateRegion[1])}`}
                                                </Text>
                                            </>)
                                    })
                                }}
                                theme={reservationListPageTitleAddSearch.exportButton}
                                text={"匯出問券"}
                            />
                        </SubContainer>
                    </FormRow>
                </FormControl >
            </>
        )
    }
    else {
        return (
            <>
                <BasicContainer className={props.className} theme={{ padding: "0 0 0 0.5rem" }} >
                    <BasicContainer onClick={() => { setIsExpand(e => !e) }} theme={{ cursor: "pointer", padding: "0px 16px 0px 16px" }}>
                        <ExpandMoreIcon style={{
                            width: "1rem",
                            position: "relative",
                            top: "0.5rem",
                            color: "#999",
                            cursor: "pointer"
                        }}></ExpandMoreIcon>
                        <Text theme={{ display: "inline-block", margin: "0 0 0.75rem 0", color: "#999", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>篩選日期區間或其它條件</Text>
                    </BasicContainer>
                    <FormControl theme={{ padding: "0px 16px 0px 16px" }} onSubmit={(e) => {
                        e.preventDefault();
                        //console.log("dsfdf")
                        props.execute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord); props.setSearchWord(SearchWord)
                    }}>
                        {/* 日期區間選單、搜尋輸入框 */}
                        {IsExpand && <FormRow>
                            <SubContainer theme={reservationListPageTitleAddSearch.addButtonSubContainerLessThan768}>
                                <DatePicker theme={{ width: "100%" }}
                                    getDate={DateRegionResetValue}
                                    value={DateRegion}// [startDate,endDate]
                                    doThings={(date) => {
                                        props.execute(dateTrans(date[0]), dateTrans(date[1]), SearchWord);
                                        props.setDateRange && props.setDateRange([date[0], date[1]]);
                                    }}
                                ></DatePicker>
                            </SubContainer>
                            <SearchTextInput
                                value={SearchWord}
                                onChange={SearchWordhandler}
                                regExpResult={SearchWordregExpResult}
                                placeholder={"搜尋姓名、電話、Email"}
                                theme={reservationListPageTitleAddSearch.searchInputLessThan768}
                                searchOnClick={() => { props.execute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord); props.setSearchWord(SearchWord) }}
                            />
                        </FormRow>}
                        {/* 狀態選單、匯出問券按鈕 */}
                        <FormRow theme={{ justify: "space-between", padding: "0px 0 0px 0px", }}>
                            <BasicContainer theme={{ width: "7.2rem" }}>
                                < FormCardSelector
                                    //label={""}
                                    //hint={""}
                                    placeholder={"Mode狀態"}
                                    value={Mode}
                                    isSearchable
                                    options={[
                                        { value: "all", label: "全部" },
                                        { value: "undone", label: "即將到來" },
                                        { value: "overtime", label: "逾時未完成" },
                                        { value: "done", label: "已完成" },
                                        { value: "cancle", label: "已取消" },
                                    ]}
                                    onChange={(values) => {
                                        ModeResetValue(values);
                                        props.setMode && props.setMode(values)
                                        //這裡的邏輯有問題  (首先要確定status對應規則)
                                        //1.舊版本 在一開始進入頁面時，
                                        //  若是本日進入，且"直接"改動狀態，則發查本日資料並對應篩選status資料
                                        //  若是本周進入，且"直接"改動狀態，則發查下周資料並對應篩選status資料
                                        //  若是透過側邊欄進入，且"直接"改動狀態，則發查近三月資料並對應塞選status資料
                                        //  且 "日期欄位並未更動，不管查詢的是本日；下周、近三月"資料，日期都不會隨之更動
                                        //  唯 "在更改日期後"，才顯示 "當前真實" 查詢區間
                                        //
                                        // if (true) {
                                        // }
                                    }}
                                    regExpResult={ModeregExpResult}
                                    theme={reservationListPageTitleAddSearch.modeSelector}
                                ></FormCardSelector>
                            </BasicContainer>
                            <SubContainer theme={{}}>
                                <EasyButton
                                    onClick={() => {
                                        portalService.normal({
                                            autoClose: false,
                                            yes: () => { ExportExecute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord) },
                                            yesText: "是",
                                            noText: "否",
                                            content: (
                                                <>
                                                    <Text theme={reservationListPageTitleAddSearch.exportText}>
                                                        您確定要匯出問卷嗎？
                                                     </Text>
                                                    <Text theme={reservationListPageTitleAddSearch.highLightText}>
                                                        {`起：${dateTrans(DateRegion[0])} ~ 訖：${dateTrans(DateRegion[1])}`}
                                                    </Text>
                                                </>)
                                        })
                                    }}
                                    theme={reservationListPageTitleAddSearch.exportButton}
                                    text={"匯出問券"}
                                />
                            </SubContainer>
                        </FormRow>
                    </FormControl >
                </BasicContainer>
            </>
        )
    }
}

export const ReservationListPageTitleAddSearch = styled(ReservationListPageTitleAddSearchBase).attrs((props) => ({}))`
`