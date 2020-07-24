import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/store'
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { EasyButtonShake } from '../../../Components/Buttons';
import { SearchTextInput, FormControl, FormRow, FormCardSelector } from '../../../Components/Forms';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { Text } from '../../../Components/Texts';
import { SingleDatePicker } from '../../../Components/DatePicker';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory, useLocation } from 'react-router-dom';
import { portalService } from '../../../Components/Portal';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useAsync } from '../../../SelfHooks/useAsync';
import { ReactComponent as Send } from '../../../Assets/img/send.svg'

const DispatchPageTitleAddSearchBase = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchPage: { dispatchPageTitleAddSearch } } } = Theme;
    const [IsExpand, setIsExpand] = useState(false);
    let history = useHistory();

    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [DateRegion, DateRegionhandler, DateRegionregExpResult, DateRegionResetValue] = useForm([new Date(), new Date()], [""], [""]);//日期區間欄位
    const [Mode, Modehandler, ModeregExpResult, ModeResetValue] = useSelector({ value: "future", label: "顯示未來訂單" }, [], []); // 狀態欄位

    let isThisWeek = new URLSearchParams(useLocation().search);//取得參數

    useEffect(() => {
        //DateRegionResetValue([new Date('2020-07-01'), new Date('2020-07-30')])
        //console.log(isThisWeek.get("thisWeek"))
        /* 
           Date   : 2020-07-17 14:02:36
           Author : Arhua Ho
           Content: 後端API並沒有吃狀態欄位，所以無法依狀態塞選訂單，依據下拉選單查詢欄位邏輯待確認
        */

        props.execute(dateTrans(), dateTrans(addMonths(new Date(), 3)), SearchWord);//若沒有Parma查的就是未來三個月
        //DateRegionResetValue([new Date(), addMonths(new Date(), 3)]);
        //props.setDateRange && props.setDateRange([new Date(), addMonths(new Date(), 3)]);


    }, [])

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
                            }}>足健師派遣</Text>
                        </SubContainer>
                    </Container>
                    {/* 狀態選單、匯出問券按鈕 */}
                    <FormRow theme={{ justify: "space-between", padding: "0px 0 24px 40px", }}>
                        <BasicContainer theme={{ width: "7.4rem" }}>
                            < FormCardSelector
                                //label={""}
                                //hint={""}
                                placeholder={"Mode狀態"}
                                value={Mode}
                                isSearchable
                                options={[
                                    { value: "past", label: "顯示過去訂單" },
                                    { value: "future", label: "顯示未來訂單" },
                                ]}
                                onChange={(values) => {
                                    ModeResetValue(values);
                                    if (values.value === 'past')
                                        props.execute(dateTrans(addMonths(new Date(), -3)), dateTrans(), SearchWord);
                                    else
                                        props.execute(dateTrans(), dateTrans(addMonths(new Date(), 3)), SearchWord);
                                }}
                                regExpResult={ModeregExpResult}
                                theme={dispatchPageTitleAddSearch.modeSelector}
                            ></FormCardSelector>
                        </BasicContainer>
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <EasyButtonShake
                                onClick={() => {
                                    if (props?.Check?.length > 0)
                                        portalService.normal({
                                            autoClose: false,
                                            yes: () => {
                                                //console.log(props?.AllCheck)
                                                if (Object.keys(props?.AllCheck).length === props.Check.length) {
                                                    let matchFlag = true;
                                                    props.Check.forEach((item) => {
                                                        if (props?.AllCheck[item.Id] === undefined) {
                                                            matchFlag = false;
                                                        }
                                                    })
                                                    if (matchFlag) {
                                                        props.Check.forEach((item) => {
                                                            //console.log("foreach", props?.AllCheck[item.Id]);
                                                            props.executeLetItGo(item, props?.AllCheck[item.Id]);
                                                            if (Mode.value === 'past')
                                                                props.execute(dateTrans(addMonths(new Date(), -3)), dateTrans(), SearchWord);
                                                            else
                                                                props.execute(dateTrans(), dateTrans(addMonths(new Date(), 3)), SearchWord);

                                                        })
                                                    }
                                                    else {
                                                        portalService.warn({
                                                            autoClose: false,
                                                            yes: () => { console.log("HAHA") },
                                                            yesText: "OK",
                                                            noText: "",
                                                            content: (
                                                                <>
                                                                    <Text theme={dispatchPageTitleAddSearch.exportText}>
                                                                        請檢查是否有為訂單派遣足健師
                                                                 </Text>

                                                                </>)
                                                        })
                                                    }


                                                }

                                                else {
                                                    console.log("NOTHING!")
                                                    portalService.warn({
                                                        autoClose: false,
                                                        //yes: () => { console.log("HAHA") },
                                                        //yesText: "OK",
                                                        removeYesButton: true,
                                                        noText: "OK",
                                                        content: (
                                                            <>
                                                                <Text theme={dispatchPageTitleAddSearch.exportText}>
                                                                    請檢查是否有為訂單派遣足健師
                                                             </Text>

                                                            </>)
                                                    })
                                                }
                                            },
                                            yesText: "是，立即派遣",
                                            noText: "否，取消派遣",
                                            content: (
                                                <>
                                                    <Text theme={dispatchPageTitleAddSearch.exportText}>
                                                        您確定要派遣足健師嗎？
                                                 </Text>

                                                </>)
                                        })
                                    else
                                        portalService.warn({
                                            autoClose: false,
                                            //yes: () => { console.log("HAHA") },
                                            //yesText: "OK",
                                            removeYesButton: true,
                                            noText: "OK",
                                            content: (
                                                <>
                                                    <Text theme={dispatchPageTitleAddSearch.exportText}>
                                                        請勾選欲派遣的訂單
                                                 </Text>

                                                </>)
                                        })
                                }}
                                theme={dispatchPageTitleAddSearch.exportButton}
                                text={"派遣足健師"}
                                icon={<Send style={{
                                    position: "relative",
                                    top: "0.3rem",
                                    height: "1.28rem",
                                    marginRight: "0.2rem",
                                }} />}
                            />
                        </SubContainer>
                    </FormRow>
                </FormControl >
            </>
        )
    }
    else {
        return null;
    }
}

export const DispatchPageTitleAddSearch = styled(DispatchPageTitleAddSearchBase).attrs((props) => ({}))`
`