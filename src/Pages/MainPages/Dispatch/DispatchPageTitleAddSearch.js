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

const DispatchPageTitleAddSearchBase = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchPage: { dispatchPageTitleAddSearch } } } = Theme;
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
                                }}
                                regExpResult={ModeregExpResult}
                                theme={dispatchPageTitleAddSearch.modeSelector}
                            ></FormCardSelector>
                        </BasicContainer>
                        <SubContainer theme={{ padding: "0 2.5rem 0 0" }}>
                            <EasyButtonShake
                                onClick={() => {
                                    // portalService.normal({
                                    //     autoClose: false,
                                    //     yes: () => { ExportExecute(dateTrans(DateRegion[0]), dateTrans(DateRegion[1]), SearchWord) },
                                    //     yesText: "是",
                                    //     noText: "否",
                                    //     content: (
                                    //         <>
                                    //             <Text theme={dispatchPageTitleAddSearch.exportText}>
                                    //                 您確定要匯出問卷嗎？
                                    //              </Text>
                                    //             <Text theme={dispatchPageTitleAddSearch.highLightText}>
                                    //                 {`起：${dateTrans(DateRegion[0])} ~ 訖：${dateTrans(DateRegion[1])}`}
                                    //             </Text>
                                    //         </>)
                                    // })
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