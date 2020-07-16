import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/store'
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton } from '../../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormControl, FormRow, FormCardSelector } from '../../../Components/Forms';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { Text } from '../../../Components/Texts';
import { DatePicker } from '../../../Components/DatePicker';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ReservationListPageTitleAddSearchBase = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationListPageTitleAddSearch } } } = Theme;
    const [IsExpand, setIsExpand] = useState(false);

    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [Mode, Modehandler, ModeregExpResult, ModeResetValue] = useSelector([], [], []); // 狀態欄位

    if (!props.tableBasicContainerLessThan768) {
        return (
            <>
                <FormControl theme={{}} onSubmit={(e) => {
                    e.preventDefault();
                    console.log("dsfdf")
                    //props.execute(1, SearchWord); props.setSearchWord(SearchWord)
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
                                    <DatePicker></DatePicker>
                                </SubContainer>
                                <SearchTextInput
                                    value={SearchWord}
                                    onChange={SearchWordhandler}
                                    regExpResult={SearchWordregExpResult}
                                    placeholder={"搜尋姓名、電話、Email"}
                                    theme={reservationListPageTitleAddSearch.searchInput}
                                    searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
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
                                placeholder={"選擇行政區"}
                                value={Mode}
                                isSearchable
                                options={[]}
                                onChange={(values) => { ModeResetValue(values) }}
                                regExpResult={ModeregExpResult}
                                theme={reservationListPageTitleAddSearch.modeSelector}
                            ></FormCardSelector>
                        </BasicContainer>
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <EasyButton
                                onClick={() => {
                                    // props.setOpenAddJumpDialog(true) 
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
                <BasicContainer className={props.className} >
                    <BasicContainer onClick={() => { setIsExpand(e => !e) }} theme={{ cursor: "pointer" }}>
                        <ExpandMoreIcon style={{
                            width: "1rem",
                            position: "relative",
                            top: "0.5rem",
                            color: "#999",
                            cursor: "pointer"
                        }}></ExpandMoreIcon>
                        <Text theme={{ display: "inline-block", margin: "0 0 0.75rem 0", color: "#999", fontSize: "0.875rem", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>篩選日期區間或其它條件</Text>
                    </BasicContainer>
                    <FormControl theme={{ padding: "0px 0 29px 0px" }} onSubmit={(e) => {
                        e.preventDefault();
                        console.log("dsfdf")
                        //props.execute(1, SearchWord); props.setSearchWord(SearchWord)
                    }}>
                        {/* 日期區間選單、搜尋輸入框 */}
                        {IsExpand && <FormRow>
                            <SubContainer theme={reservationListPageTitleAddSearch.addButtonSubContainerLessThan768}>
                                <DatePicker theme={{ width: "100%" }}></DatePicker>
                            </SubContainer>
                            <SearchTextInput
                                value={SearchWord}
                                onChange={SearchWordhandler}
                                regExpResult={SearchWordregExpResult}
                                placeholder={"搜尋姓名、電話、Email"}
                                theme={reservationListPageTitleAddSearch.searchInputLessThan768}
                                searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
                            />
                        </FormRow>}
                        {/* 狀態選單、匯出問券按鈕 */}
                        <FormRow theme={{ justify: "space-between", padding: "0px 0 24px 0px", }}>
                            <BasicContainer theme={{ width: "7.2rem" }}>
                                < FormCardSelector
                                    //label={""}
                                    //hint={""}
                                    placeholder={"選擇行政區"}
                                    value={Mode}
                                    isSearchable
                                    options={[]}
                                    onChange={(values) => { ModeResetValue(values) }}
                                    regExpResult={ModeregExpResult}
                                    theme={reservationListPageTitleAddSearch.modeSelector}
                                ></FormCardSelector>
                            </BasicContainer>
                            <SubContainer theme={{}}>
                                <EasyButton
                                    onClick={() => {
                                        // props.setOpenAddJumpDialog(true) 
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