import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { ReservationListPageTitleAddSearch } from './ReservationListPageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { useHistory, useLocation } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { Text } from '../../../Components/Texts';
import { CardTable } from '../../../Components/CardTable';
import { EasyButton } from '../../../Components/Buttons';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { portalService } from '../../../Components/Portal';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { Rate } from '../../../Components/Rate';
import { Radio } from '../../../Components/Radio';
import { PageTitle } from '../../../Components/PageTitle';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export const ReservationListCheckComment = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationListCheckComment } } } = Theme;

    let history = useHistory();
    const [width] = useWindowSize();

    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    let data = JSON.parse(urlParams.get("data"));
    console.log(data)//從網址取得參數
    //console.log(urlParams.get("g"))//從網址取得參數

    return (
        <>
            {width > 768 && <BasicContainer theme={reservationListCheckComment.basicContainer}>
                <PageTitle>預約清單 / 服務滿意度</PageTitle>
                <BasicContainer theme={{
                    boxShadow: "0 2px 4px rgba(0,0,0,.1)",
                    borderRadius: "0.5rem",
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    padding: "1rem 1.25rem",
                    margin: "0 1.5rem 0 2.5rem",
                    height: "auto",
                    width: "calc( 100% - 3.5rem )",
                }}>
                    <BasicContainer theme={{ width: "100%", display: "flex", padding: "0 0 1rem 0", borderBottom: ".5px solid #e6e6e6" }}>
                        {/* 預約日期、預約編號、預約門市、顧客資訊、足健師資訊 */}
                        <BasicContainer theme={{ display: "inline-block", width: "30%", minWidth: "fit-content" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                            }}>
                                預約日期
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "1rem", lineHeight: "1rem", }}>
                                {data?.ReservationDate.split('T')[0]}
                            </Text>
                        </BasicContainer>
                        <BasicContainer theme={{ display: "inline-block", width: "30%", minWidth: "fit-content" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                            }}>
                                預約編號
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "1rem", lineHeight: "1rem", }}>
                                {data?.OrderNo}
                            </Text>
                        </BasicContainer>
                        <BasicContainer theme={{ display: "inline-block", width: "30%", minWidth: "fit-content" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                            }}>
                                預約門市
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "1rem", lineHeight: "1rem", }}>
                                {data?.ShopName}
                            </Text>
                        </BasicContainer>
                        <BasicContainer theme={{ display: "inline-block", width: "30%", minWidth: "fit-content" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                            }}>顧客資訊
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "1rem", lineHeight: "1rem", }}>
                                {data?.CustomerName}
                            </Text>
                        </BasicContainer>
                        <BasicContainer theme={{ display: "inline-block", width: "30%", minWidth: "fit-content" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                            }}>足健師資訊
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "1rem", lineHeight: "1rem", }}>
                                {data?.MasterName}
                            </Text>
                        </BasicContainer>
                    </BasicContainer>
                    {/* 整體服務滿意度 */}
                    <BasicContainer theme={{ display: "block", height: "5rem", borderBottom: ".5px solid #e6e6e6" }}>
                        <Text theme={{
                            display: "inline-block",
                            fontWeight: 900,
                            fontSize: "1rem",
                            lineHeight: "5rem",
                            color: "#444",
                            userSelect: "none",
                            margin: "0 1.5rem 0 0",
                        }}
                            style={{ textShadow: "#000 0rem 0rem 0rem" }}
                        >整體服務滿意度</Text>
                        <Rate rate={data?.AllService} size={"2rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                    </BasicContainer>
                    {/* 您對於本次的足壓量測服務滿意度為何？ */}
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 2.5rem" }}>
                        <Text theme={{
                            display: "block",
                            lineHeight: "1rem",
                            fontSize: "1rem",
                            color: "#444",
                            fontWeight: "800",
                            userSelect: "none",
                        }}>
                            您對於本次的足壓量測服務滿意度為何？
                        </Text>
                        <Rate rate={data?.FootMeasureService} size={"2rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                    </BasicContainer>
                    {/* 本次體驗對於您的足健康問題有多大的幫助？ */}
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 2.5rem" }}>
                        <Text theme={{
                            display: "block",
                            lineHeight: "1rem",
                            fontSize: "1rem",
                            color: "#444",
                            fontWeight: "800",
                            userSelect: "none",
                        }}>
                            本次體驗對於您的足健康問題有多大的幫助？
                        </Text>
                        <Rate rate={data?.IsHelp} size={"2rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                    </BasicContainer>
                    {/* 您是如何得知本服務的？ */}
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 2.5rem" }}>
                        <Text theme={{
                            display: "block",
                            lineHeight: "1rem",
                            fontSize: "1rem",
                            color: "#444",
                            fontWeight: "800",
                            userSelect: "none",
                        }}>
                            您是如何得知本服務的？
                        </Text>
                        <Radio text={"阿瘦門市"} checked={data?.WhereKnow === "阿瘦門市"} />
                        <Radio text={"阿瘦粉絲團等網路資訊"} checked={data?.WhereKnow === "阿瘦粉絲團等網路資訊"} />
                        <Radio text={"親友推薦分享"} checked={data?.WhereKnow === "親友推薦分享"} />
                    </BasicContainer>
                    {/* 您介紹親友體驗足壓量測服務的意願有多高？ */}
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 2.5rem" }}>
                        <Text theme={{
                            display: "block",
                            lineHeight: "1rem",
                            fontSize: "1rem",
                            color: "#444",
                            fontWeight: "800",
                            userSelect: "none",
                        }}>
                            您介紹親友體驗足壓量測服務的意願有多高？
                        </Text>
                        <Rate rate={data?.WillingIntroduce} size={"2rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                    </BasicContainer>
                    {/* 其它回饋建議 */}
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 2.5rem" }}>
                        <Text theme={{
                            display: "block",
                            lineHeight: "1rem",
                            fontSize: "1rem",
                            color: "#444",
                            fontWeight: "800",
                            userSelect: "none",
                        }}>
                            其它回饋建議
                        </Text>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            color: "#444",
                            userSelect: "none",
                            margin: "1rem 0rem 0 0",
                        }}>
                            {data?.ServiceRemark === null ? '客戶未填' : data?.ServiceRemark}
                        </Text>
                    </BasicContainer>
                </BasicContainer>
                {/* 回預約清單 */}
                <EasyButton
                    onClick={() => { history.push("/ReservationList") }}
                    theme={reservationListCheckComment.addButton}
                    text={"回預約清單"} icon={<KeyboardReturnIcon style={{
                        position: "relative",
                        top: "0.3rem",
                        height: "1.28rem"
                    }} />}
                />
            </BasicContainer>
            }
            {width <= 768 && <BasicContainer theme={reservationListCheckComment.basicContainer}>
                <BasicContainer theme={{
                    boxShadow: "0 2px 4px rgba(0,0,0,.1)",
                    borderRadius: "0.5rem",
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    padding: "1rem 1.25rem",
                    margin: "1rem 1.5rem 0 1.5rem",
                    height: "auto",
                    width: "calc( 100% - 2.5rem )",
                }}>
                    <Container theme={{ width: "100%", justify: "center", padding: "0 0 1rem 0", borderBottom: ".5px solid #e6e6e6" }}>
                        <SubContainer theme={{ occupy: 6, minWidth: "80px", margin: "0 0 1rem 0" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                                textAlign: "center"
                            }}>
                                預約日期
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "0.875rem", lineHeight: "0.875rem", textAlign: "center" }}>
                                2020-04-15
                            </Text>
                        </SubContainer>
                        <SubContainer theme={{ occupy: 6, minWidth: "80px", margin: "0 0 1rem 0" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                                textAlign: "center"
                            }}>
                                預約編號
                            </Text>
                            <Text theme={{ display: "block", width: "100%", userSelect: "none", fontSize: "0.875rem", lineHeight: "0.875rem", textAlign: "center" }}>
                                TS15869300642734
                            </Text>
                        </SubContainer>
                        <SubContainer theme={{ occupy: 6, minWidth: "fit-content", margin: "0 0 1rem 0" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                                textAlign: "center"
                            }}>
                                預約門市
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "0.875rem", lineHeight: "0.875rem", textAlign: "center" }}>
                                測試東門店
                            </Text>
                        </SubContainer>
                        <SubContainer theme={{ occupy: 6, minWidth: "fit-content", margin: "0 0 1rem 0" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                                textAlign: "center"
                            }}>顧客資訊
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "0.875rem", lineHeight: "0.875rem", textAlign: "center" }}>
                                阿宅董董
                            </Text>
                        </SubContainer>
                        <SubContainer theme={{ minWidth: "fit-content", margin: "0 0 1rem 0" }}>
                            <Text theme={{
                                display: "block",
                                fontSize: "14px",
                                lineHeight: "1rem",
                                color: "#999",
                                margin: "0 0 0.5rem 0",
                                userSelect: "none",
                                textAlign: "center"
                            }}>足健師資訊
                            </Text>
                            <Text theme={{ display: "block", userSelect: "none", fontSize: "0.875rem", lineHeight: "0.875rem", textAlign: "center" }}>
                                林陵發發
                            </Text>
                        </SubContainer>
                    </Container>
                    <BasicContainer theme={{ display: "block", height: "3.75rem", borderBottom: ".5px solid #e6e6e6" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}
                        //style={{ textShadow: "#000 0rem 0rem 0rem" }}
                        >整體服務滿意度</Text>
                        <Container theme={{ justify: "center", }}>
                            <Rate rate={2} size={"1.5rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                        </Container>
                    </BasicContainer>
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 1rem" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            您對於本次的足壓量測服務滿意度為何？
                        </Text>
                        <Container theme={{ justify: "center", }}>
                            <Rate rate={2} size={"1.5rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                        </Container>
                    </BasicContainer>
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 1rem" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            本次體驗對於您的足健康問題有多大的幫助？
                        </Text>
                        <Container theme={{ justify: "center", }}>
                            <Rate rate={2} size={"1.5rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                        </Container>
                    </BasicContainer>
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 1rem" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            您是如何得知本服務的？
                        </Text>
                        <Container theme={{ alignItems: "center", justify: "center", direction: "column" }}>
                            <Radio theme={{ display: "block", margin: "", width: "10rem" }} text={"阿瘦門市"} />
                            <Radio theme={{ display: "block", margin: "", width: "10rem" }} text={"阿瘦粉絲團等網路資訊"} checked />
                            <Radio theme={{ display: "block", margin: "", width: "10rem" }} text={"親友推薦分享"} />
                        </Container>
                    </BasicContainer>
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 1rem" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            您介紹親友體驗足壓量測服務的意願有多高？
                        </Text>
                        <Container theme={{ justify: "center", }}>
                            <Rate rate={2} size={"1.5rem"} margin={"0 0 0 0.375rem"} theme={{ top: "0.5rem" }} />
                        </Container>
                    </BasicContainer>
                    <BasicContainer theme={{ display: "block", margin: "1.5rem 0 1rem" }}>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            其它回饋建議
                        </Text>
                        <Text theme={{
                            display: "block",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            lineHeight: "1rem",
                            textAlign: "center",
                            color: "#444",
                            userSelect: "none",
                            margin: "0.5rem 0rem 0 0",
                        }}>
                            客戶未填
                        </Text>
                    </BasicContainer>
                </BasicContainer>
                <EasyButton
                    onClick={() => { history.push("/ReservationList") }}
                    theme={reservationListCheckComment.addButton}
                    text={"回預約清單"} icon={<KeyboardReturnIcon style={{
                        position: "relative",
                        top: "0.3rem",
                        height: "1.28rem"
                    }} />}
                />

            </BasicContainer>
            }
        </>
    )
}