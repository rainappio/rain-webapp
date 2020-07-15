import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer, Container } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { PageSubTitle, PageSubTitleMobile } from '../../../Components/PageSubTitle';
import { EasyButton } from '../../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormControl, FormRow } from '../../../Components/Forms';
import { TableBasic } from '../../../Components/Tables';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm } from '../../../SelfHooks/useForm'
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { Text } from '../../../Components/Texts'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CardTable } from '../../../Components/CardTable';
import { OrderCard, OrderCardMobile } from '../../../Components/OrderCard';
import { ReactComponent as LogoDone } from '../../../Assets/img/done.svg'
import { ReactComponent as LogoFail } from '../../../Assets/img/fail.svg'
import { ReactComponent as LogoNew } from '../../../Assets/img/new.svg'
import { ReactComponent as LogoPercentage } from '../../../Assets/img/percentage.svg'
import { ReactComponent as LogoTotal } from '../../../Assets/img/total.svg'

export const Home = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { homePage: { home } } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [orderRes, setorderRes] = useState({});
    const [cardCount, setcardCount] = useState([0, 0, 0, 0, 0]);
    const [cardCountSeven, setcardCountSeven] = useState([0, 0, 0, 0, 0]);
    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [width] = useWindowSize();




    //#region 查詢列表API
    const getRoleByPageOrkey = useCallback(async (page = 1, key) => {

        return await fetch(`${APIUrl}api/User/Get?page=${page}&key=${(key ? `${key}` : "")}`,
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
                    console.log(PreResult.response)
                    setTableData(PreResult.response);
                    return "查詢角色表格資訊成功"
                } else {

                    throw new Error("查詢角色表格資訊失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute, Pending] = useAsync(getRoleByPageOrkey, true);
    //#endregion

    //#region 查詢單子API
    const getOrder = useCallback(async (page = 1, key) => {

        //#region 製造日期格式
        let today = new Date();
        let todayFormat = today.toISOString().substring(0, 10);
        //console.log("today", todayFormat);

        //#endregion

        return await fetch(`${APIUrl}api/Orders/GetList?_date=${todayFormat}&_eDate=${todayFormat}`,
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

                    setorderRes(PreResult.response);
                    let cardContent = analyzeStatus(PreResult.response);
                    setcardCount(cardContent);
                    console.log("1", PreResult.response, cardContent);
                    return "查詢角色表格資訊成功"
                } else {

                    throw new Error("查詢角色表格資訊失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeGetOrder, PendingGetOrder] = useAsync(getOrder, true);
    //#endregion

    //#region 查詢7天單子API
    const getOrderSeven = useCallback(async (page = 1, key) => {

        //#region 製造日期格式
        let today = new Date();
        let todayFormat = today.toISOString().substring(0, 10);
        //console.log("today", todayFormat);
        let endDay = new Date();
        let realEnd = new Date(endDay.setDate(endDay.getDate() + 7));//此處+7取得一週後日期
        let endDayFormat = realEnd.toISOString().substring(0, 10);
        //console.log("endDay", endDayFormat);
        //#endregion

        return await fetch(`${APIUrl}api/Orders/GetList?_date=${todayFormat}&_eDate=${endDayFormat}`,
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

                    //setorderRes(PreResult.response);
                    let cardContent = analyzeStatus(PreResult.response);
                    setcardCountSeven(cardContent);
                    console.log("7", PreResult.response, cardContent);
                    return "查詢角色表格資訊成功"
                } else {

                    throw new Error("查詢角色表格資訊失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeGetOrderSeven, PendingGetOrderSeven] = useAsync(getOrderSeven, true);
    //#endregion

    const analyzeStatus = (data) => {
        let total = data?.length;
        if (total === 0) {
            return [0, 0, 0, 0, '無'];
        }
        let done = 0;
        let timeout = 0;
        let comming = 0;

        data.forEach(function (item, index, array) {
            if (item?.Status === 5) {
                done += 1;
            }
            else if (item?.Status === 0 || item?.Status === 1) {
                comming += 1;
            }
            else {
                timeout += 1;
            }
        });

        let percent = done / total;
        return [total, done, timeout, comming, percent];
    }

    return (
        <>
            {/* 寬度大於等於768時渲染的組件 */}
            {width > 768 && <BasicContainer theme={home.basicContainer}>
                <PageTitle>預約件數</PageTitle>
                <PageSubTitle title='今日預約件數' />

                <Container theme={home.orderCardFormRow}>
                    <SubContainer >

                        <OrderCard icon={<LogoTotal />} labelFirst={cardCount[0]} labelSecond="預約總件數" onClick={() => console.log("123")} />


                        <OrderCard icon={<LogoDone />} labelFirst={cardCount[1]} labelSecond="已完成" onClick={() => console.log("123")} />


                        <OrderCard icon={<LogoFail />} labelFirst={cardCount[2]} labelSecond="逾時未完成" onClick={() => console.log("123")} />

                    </SubContainer>
                    <SubContainer>

                        <OrderCard icon={<LogoNew />} labelFirst={cardCount[3]} labelSecond="尚未執行" onClick={() => console.log("123")} />


                        <OrderCard icon={<LogoPercentage />} labelFirst={cardCount[4] === '無' ? "無" : `${cardCount[4] * 100}%`} labelSecond="達成率" onClick={() => console.log("123")} />

                    </SubContainer>
                </Container>


                <PageSubTitle title='本週預約件數' />
                <Container theme={home.orderCardFormRow}>
                    <SubContainer >
                        <OrderCard icon={<LogoTotal />} labelFirst={cardCountSeven[0]} labelSecond="預約總件數" onClick={() => console.log("123")} />


                        <OrderCard icon={<LogoDone />} labelFirst={cardCountSeven[1]} labelSecond="已完成" onClick={() => console.log("123")} />


                        <OrderCard icon={<LogoFail />} labelFirst={cardCountSeven[2]} labelSecond="逾時未完成" onClick={() => console.log("123")} />
                    </SubContainer>
                    <SubContainer >
                        <OrderCard icon={<LogoNew />} labelFirst={cardCountSeven[3]} labelSecond="尚未執行" onClick={() => console.log("123")} />

                        <OrderCard icon={<LogoPercentage />} labelFirst={cardCountSeven[4] === '無' ? "無" : `${cardCountSeven[4] * 100}%`} labelSecond="達成率" onClick={() => console.log("123")} />
                    </SubContainer>
                </Container>



            </BasicContainer>
            }

            {/* 寬度小於768時渲染的組件 */}
            {width <= 768 && <BasicContainer theme={home.basicContainer}>
                <PageSubTitleMobile title='今日預約件數' />
                <FormControl theme={{ margin: '0 0 32px 0' }}>
                    <FormRow theme={home.orderCardFormRowLessThan768}>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoTotal />} labelFirst={cardCount[0]} labelSecond="預約總件數" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoDone />} labelFirst={cardCount[1]} labelSecond="已完成" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoFail />} labelFirst={cardCount[2]} labelSecond="逾時未完成" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoNew />} labelFirst={cardCount[3]} labelSecond="尚未執行" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoPercentage />} labelFirst={cardCount[4] === '無' ? "無" : `${cardCount[4] * 100}%`} labelSecond="達成率" onClick={() => console.log("123")} />
                        </SubContainer>
                    </FormRow>
                </FormControl>
                <PageSubTitleMobile title='本週預約件數' />
                <FormControl theme={{}}>
                    <FormRow theme={home.orderCardFormRowLessThan768}>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoTotal />} labelFirst={cardCountSeven[0]} labelSecond="預約總件數" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoDone />} labelFirst={cardCountSeven[1]} labelSecond="已完成" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoFail />} labelFirst={cardCountSeven[2]} labelSecond="逾時未完成" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoNew />} labelFirst={cardCountSeven[3]} labelSecond="尚未執行" onClick={() => console.log("123")} />
                        </SubContainer>
                        <SubContainer theme={home.addButtonSubContainer}>
                            <OrderCardMobile icon={<LogoPercentage />} labelFirst={cardCountSeven[4] === '無' ? "無" : `${cardCountSeven[4] * 100}%`} labelSecond="達成率" onClick={() => console.log("123")} />
                        </SubContainer>
                    </FormRow>
                </FormControl>
            </BasicContainer>
            }

        </>
    )
}