import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/store'
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { EasyButtonShake } from '../../../Components/Buttons';
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
import { ReactComponent as Send } from '../../../Assets/img/send.svg'

const DispatchBoardPageTitleAddSearchBase = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchBoardPage: { dispatchBoardPageTitleAddSearch } } } = Theme;
    const [IsExpand, setIsExpand] = useState(false);
    let history = useHistory();

    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [DateRegion, DateRegionhandler, DateRegionregExpResult, DateRegionResetValue] = useForm([new Date(), new Date()], [""], [""]);//日期區間欄位
    const [Mode, Modehandler, ModeregExpResult, ModeResetValue] = useSelector({ value: "future", label: "顯示未來訂單" }, [], []); // 狀態欄位

    let isThisWeek = new URLSearchParams(useLocation().search);//取得參數

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
                            }}>派遣單總覽</Text>
                        </SubContainer>
                        {/* 日期區間選單、搜尋輸入框 */}
                        <SubContainer theme={{ padding: "0 2rem 0 0" }}>
                            <FormRow theme={dispatchBoardPageTitleAddSearch.addAndSearchFormRow}>
                                <SubContainer theme={dispatchBoardPageTitleAddSearch.addButtonSubContainer}>
                                    <DatePicker
                                        getDate={DateRegionResetValue}
                                        value={DateRegion}// [startDate,endDate]
                                        doThings={(date) => { props.execute(dateTrans(date[0]), dateTrans(date[1]), SearchWord); }}
                                    ></DatePicker>
                                    {/* {console.log(DateRegion)} */}
                                </SubContainer>
                            </FormRow>
                        </SubContainer>
                    </Container>
                </FormControl >
            </>
        )
    }
    else {
        return null;
    }
}

export const DispatchBoardPageTitleAddSearch = styled(DispatchBoardPageTitleAddSearchBase).attrs((props) => ({}))`
`