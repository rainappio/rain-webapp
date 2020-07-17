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

const PercentagePageTitleAddSearchBase = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { percentagePage: { percentagePageTitleAddSearch } } } = Theme;
    const [IsExpand, setIsExpand] = useState(false);
    const [ChoosenTag, setChoosenTag] = useState(1);

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
                            }}>預約率總覽</Text>
                        </SubContainer>
                        {/* 日期區間選單、搜尋輸入框 */}
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <FormRow theme={percentagePageTitleAddSearch.addAndSearchFormRow}>
                                <SubContainer theme={percentagePageTitleAddSearch.addButtonSubContainer}>
                                    <DatePicker></DatePicker>
                                </SubContainer>
                                <SearchTextInput
                                    value={SearchWord}
                                    onChange={SearchWordhandler}
                                    regExpResult={SearchWordregExpResult}
                                    placeholder={"請輸入搜尋內容"}
                                    theme={percentagePageTitleAddSearch.searchInput}
                                    searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
                                />
                            </FormRow>
                        </SubContainer>
                    </Container>
                    {/* 狀態選單、匯出問券按鈕 */}
                    <FormRow theme={{ justify: "flex-start", padding: "0px 0 0px 40px", }}>

                        <SubContainer theme={{ padding: "0 0.75rem 0 0" }}>
                            <EasyButton
                                onClick={() => {
                                    // props.setOpenAddJumpDialog(true) 
                                    setChoosenTag(1);
                                }}
                                theme={percentagePageTitleAddSearch.tagButton(ChoosenTag === 1)}
                                text={"門市預約率"}
                            />
                        </SubContainer>
                        <SubContainer theme={{ padding: "0 0.75rem 0 0" }}>
                            <EasyButton
                                onClick={() => {
                                    // props.setOpenAddJumpDialog(true) 
                                    setChoosenTag(2);
                                }}
                                theme={percentagePageTitleAddSearch.tagButton(ChoosenTag === 2)}
                                text={"區域預約率"}
                            />
                        </SubContainer>
                        <SubContainer theme={{ padding: "0 0rem 0 0" }}>
                            <EasyButton
                                onClick={() => {
                                    // props.setOpenAddJumpDialog(true) 
                                    setChoosenTag(3);
                                }}
                                theme={percentagePageTitleAddSearch.tagButton(ChoosenTag === 3)}
                                text={"足健師預約率"}
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
                    <FormControl theme={{ padding: "0px 0 29px 0px" }} onSubmit={(e) => {
                        e.preventDefault();
                        console.log("dsfdf")
                        //props.execute(1, SearchWord); props.setSearchWord(SearchWord)
                    }}>

                        <FormRow theme={{ justify: "center", padding: "0px 0 0px 0px", }}>

                            <SubContainer theme={{ occupy: 4 }}>
                                <EasyButton
                                    onClick={() => {
                                        // props.setOpenAddJumpDialog(true) 
                                        setChoosenTag(1);
                                    }}
                                    theme={percentagePageTitleAddSearch.smTagButton(ChoosenTag === 1)}
                                    text={"門市預約率"}
                                />
                            </SubContainer>
                            <SubContainer theme={{ occupy: 4 }}>
                                <EasyButton
                                    onClick={() => {
                                        // props.setOpenAddJumpDialog(true) 
                                        setChoosenTag(2);
                                    }}
                                    theme={percentagePageTitleAddSearch.smTagButton(ChoosenTag === 2)}
                                    text={"區域預約率"}
                                />
                            </SubContainer>
                            <SubContainer theme={{ occupy: 4 }}>
                                <EasyButton
                                    onClick={() => {
                                        // props.setOpenAddJumpDialog(true) 
                                        setChoosenTag(3);
                                    }}
                                    theme={percentagePageTitleAddSearch.smTagButton(ChoosenTag === 3)}
                                    text={"足健師預約率"}
                                />
                            </SubContainer>
                        </FormRow>
                        <FormRow theme={{ justify: "flex-start", padding: "0px 0 0px 0px", }}>
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
                        </FormRow>
                        {/* 日期區間選單、搜尋輸入框 */}
                        {IsExpand && <FormRow>
                            <SubContainer theme={percentagePageTitleAddSearch.addButtonSubContainerLessThan768}>
                                <DatePicker theme={{ width: "100%" }}></DatePicker>
                            </SubContainer>
                            <SearchTextInput
                                value={SearchWord}
                                onChange={SearchWordhandler}
                                regExpResult={SearchWordregExpResult}
                                placeholder={"請輸入搜尋內容"}
                                theme={percentagePageTitleAddSearch.searchInputLessThan768}
                                searchOnClick={() => { props.execute(1, SearchWord); props.setSearchWord(SearchWord) }}
                            />
                        </FormRow>}


                    </FormControl >
                </BasicContainer>
            </>
        )
    }
}

export const PercentagePageTitleAddSearch = styled(PercentagePageTitleAddSearchBase).attrs((props) => ({}))`
`