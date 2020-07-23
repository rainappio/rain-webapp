import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { ReservationListPageTitleAddSearch } from './ReservationListPageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { useHistory } from 'react-router-dom';
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
import { ReservationListCheckComment } from './ReservationListCheckComment'

export const ReservationList = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationList } } } = Theme;
    let history = useHistory();

    const [TableData, setTableData] = useState([]);
    const [OpenDelJumpDialog, setOpenDelJumpDialog] = useState(false); // 開啟刪除彈窗
    const [OpenAddJumpDialog, setOpenAddJumpDialog] = useState(false); // 開啟新增彈窗
    const [OpenEditJumpDialog, setOpenEditJumpDialog] = useState(false); // 開啟編輯彈窗
    const [ScrollPage, setScrollPage] = useState(2); // 滾動到底部加載頁面
    const [DelWho, setDelWho] = useState(""); // 刪除彈窗中刪除名字
    const [DelWhoId, setDelWhoId] = useState(""); // 刪除彈窗中刪除id
    const [EditWho, setEditWho] = useState(""); // 編輯彈窗中編輯id
    const [SearchWord, setSearchWord] = useState(""); // 儲存關鍵字，供翻頁時的查詢用
    const [Mode, setMode] = useState({ value: "all", label: "全部" });
    const [DateRange, setDateRange] = useState([new Date(), new Date()]);


    const [width] = useWindowSize();

    //#region 查詢列表API
    const getOrdersList = useCallback(async (startDate, endDate, key, mode) => {
        return await fetch(`${APIUrl}api/Orders/GetList?_date=${startDate}&_eDate=${endDate}&key=${(key ? `${key}` : "")}`,
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
                    setTableData({ data: PreResult.response });
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

    const [execute, Pending] = useAsync(getOrdersList, false);
    //#endregion

    //#region 重新派遣API
    const reOrder = useCallback(async (rowData, DateRange, SearchWord, Mode) => {
        //console.log("reOrder", rowData);
        return await fetch(`${APIUrl}api/Orders/Put`,
            {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    ...rowData,
                    Status: 0,
                    FootMasterId: 0,
                    IsDeleted: false,
                })
            }
        )//查詢角色、表格翻頁
            .then(() => {
                execute(dateTrans(DateRange[0]), dateTrans(DateRange[1]), SearchWord);
                setMode(Mode);
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

    const [executeReOrder, PendingReOrder] = useAsync(reOrder, false);
    //#endregion

    //#region 取消預約API
    const cancelOrder = useCallback(async (rowData, DateRange, SearchWord, Mode, ) => {
        console.log("reOrder", rowData);
        return await fetch(`${APIUrl}api/Orders/Put`,
            {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    ...rowData,
                    Status: 4,
                    FootMasterId: 0,
                    IsDeleted: false,
                })
            }
        )//查詢角色、表格翻頁
            .then(() => {
                execute(dateTrans(DateRange[0]), dateTrans(DateRange[1]), SearchWord);
                setMode(Mode);
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

    const [executeCancelOrder, PendingCancelOrder] = useAsync(cancelOrder, false);
    //#endregion
    const [OpenExportJumpDialog, setOpenExportJumpDialog] = useState(false); // 開啟刪除彈窗

    return (
        <>
            {width > 768 && <BasicContainer theme={reservationList.basicContainer}>
                <ReservationListPageTitleAddSearch
                    setMode={(mode) => { setMode(mode) }}
                    execute={execute}
                    setSearchWord={setSearchWord}
                    setDateRange={setDateRange}
                    switch={[OpenExportJumpDialog, (isOpen) => { setOpenExportJumpDialog(isOpen) }]}
                />
                <BasicContainer theme={reservationList.tableBasicContainerLessThan768}>
                    <CardTable data={{
                        ...TableData, data: TableData?.data?.filter((item) => {
                            if (Mode?.value === 'all')
                                return item;
                            else if (Mode?.value === 'undone')
                                return item?.Status === 0 || item?.Status === 1;
                            else if (Mode?.value === 'overtime')
                                return item?.Status === 6;
                            else if (Mode?.value === 'done')
                                return item?.Status === 5;
                            else if (Mode?.value === 'cancle')
                                return item?.Status === 2 || item?.Status === 3 || item?.Status === 4;

                        })
                    }}
                        title={["預約日期", "預約編號", ""]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["CustomerName", "OrderNo", "controll"]} //必傳
                        // turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//暫不提供，因為沒用到 發查翻頁，必傳否則不能翻頁
                        theme={{
                            // basicContainer:{}, // 卡片最外層容器
                            // rowContainer: {}, // 卡片內每個資料列容器樣式，可在下方針對個別欄位複寫樣式
                            // rowTitle: {}, // 卡片內每個資料列中標題 不以renderTitle複寫時樣式
                            // rowContent: {}, // 卡片內每個資料列中標題 不以renderContent複寫時樣式
                            "CustomerName": {
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // renderTitle: (item, id) => (`${item} ${id} sdf`)
                                //width: "20%",
                                renderTitle: (item, id, rowItem) => ((item &&
                                    <>

                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '20%',
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            height: "0.875rem"
                                        }}>{'預約日期'}</Text>


                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '35%',
                                            padding: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            height: "0.875rem"
                                        }}>預約門市</Text>


                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '15%',
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            height: "0.875rem"
                                        }}>顧客資訊</Text>


                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '15%',
                                            //display: "inline-block",
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            height: "0.875rem"
                                        }}>足健師資訊</Text>

                                    </>)),
                                renderContent: (item, id, rowItem) => ((item &&
                                    <>
                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            //display: 'inline-box',
                                        }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                width: '20%',
                                                //margin: "0 0 0.375rem 0",
                                                color: "#444",
                                                fontSize: "1.125rem",
                                                fontWeight: "900"
                                            }}>{`${rowItem?.ReservationDate?.split("T")?.[0]} ${rowItem?.ReservationDate?.split("T")?.[1]}`}</Text>
                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '35%',
                                            //margin: "0 0 0.375rem 0",
                                            color: "#444",
                                            fontSize: "1.125rem",
                                            fontWeight: "900"
                                        }}>{rowItem?.ShopName}</Text>
                                        <Text theme={{
                                            display: 'inline-block',
                                            width: '15%',
                                            //margin: "0 0 0.375rem 0",
                                            color: "#444",
                                            fontSize: "1.125rem",
                                            fontWeight: "900"
                                        }}>{item}</Text>
                                        <Text theme={{
                                            display: 'inline-block',
                                            //width: '15%',
                                            //margin: "0 0 0.375rem 0",
                                            color: "#444",
                                            fontSize: "1.125rem",
                                            fontWeight: "900"
                                        }}>{rowItem?.MasterName === '' ? '尚未派遣' : rowItem?.MasterName}</Text>
                                        <EasyButton
                                            key={`${item}2`}
                                            onClick={() => {
                                                rowItem?.MasterName === '' ? history.push('/Dispatch') :
                                                    portalService.normal({
                                                        autoClose: false,
                                                        yes: () => {
                                                            executeReOrder(rowItem, DateRange, SearchWord, Mode);
                                                            //console.log(DateRange);
                                                        },
                                                        yesText: "是",
                                                        noText: "否",
                                                        content: (
                                                            <>
                                                                <Text theme={reservationList.exportText}>
                                                                    您確定要重新派遣足健師嗎？
                                                            </Text>

                                                            </>)
                                                    })
                                            }}
                                            theme={{
                                                display: 'inline-block',
                                                //width: '15%',
                                                margin: "0 0 0.375rem 0.5rem",
                                                color: "#444",
                                                fontSize: "0.875rem",
                                                fontWeight: "400"
                                            }}
                                            text={rowItem?.MasterName === '' ? '派遣' : '重新派遣'}
                                        />


                                    </>))
                            },
                            "OrderNo": {
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // renderTitle: (item, id) => (`${item} ${id} sdf`)
                                //width: "20%",
                                renderTitle: (item, id, rowItem) => ((item &&
                                    <>

                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            display: 'inline-box',
                                        }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                width: '20%',
                                                margin: "0 0 0.375rem 0",
                                                color: "#999",
                                                fontSize: "0.75rem",
                                                fontWeight: "500",
                                                height: "0.875rem"
                                            }}>{'預約編號'}</Text>


                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            display: 'inline-box',
                                        }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                width: '35%',
                                                margin: "0 0 0.375rem 0",
                                                color: "#999",
                                                fontSize: "1.125rem",
                                                fontWeight: "500",
                                                height: "1.25rem"
                                            }}>{rowItem?.ShopAddr}</Text>


                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            //WebkitLineClamp: 0,
                                            //WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            display: 'inline-box',
                                        }}
                                            theme={{
                                                display: 'inline-block',
                                                width: '15%',
                                                margin: "0 0 0.375rem 0",
                                                color: "#964f19",
                                                fontSize: "1.125rem",
                                                fontWeight: "500",
                                                height: "1.25rem"
                                            }}>{rowItem?.CustomerPhone}</Text>


                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            //WebkitLineClamp: 0,
                                            width: '15%',
                                            //WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp'
                                        }}
                                            theme={{
                                                display: 'inline-block',
                                                width: '15%',
                                                //display: "inline-block",
                                                margin: "0 0 0.375rem 0",
                                                color: "#964f19",
                                                fontSize: "1.125rem",
                                                fontWeight: "500",
                                                height: "1.25rem"
                                            }}>{rowItem?.MasterPhone}</Text>

                                    </>)),
                                renderContent: (item, id, rowItem) => ((item &&
                                    <>
                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            //WebkitLineClamp: 0,
                                            //WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            display: 'inline-box',
                                        }}
                                            theme={{
                                                display: 'inline-block',
                                                width: '20%',
                                                //margin: "0 0 0.375rem 0",
                                                color: "#444",
                                                fontSize: "1.125rem",
                                                fontWeight: "900"
                                            }}>{item}</Text>
                                        <Text
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                //WebkitLineClamp: 0,
                                                //WebkitBoxOrient: "vertical",
                                                //padding: '0 5rem 0 0',
                                                whiteSpace: 'nowarp',
                                                display: 'inline-box',
                                            }}
                                            theme={{
                                                display: 'inline-block',
                                                width: '35%',
                                                //margin: "0 0 0.375rem 0",
                                                color: "#964f19",
                                                fontSize: "1.125rem",
                                                fontWeight: "900"
                                            }}>{rowItem?.ShopTel}</Text>


                                    </>))
                            },
                            "controll": {
                                width: "40%",
                                rowContainer: {
                                    position: "absolute",
                                    top: "0.875rem",
                                    right: "0.2rem"
                                },
                                renderTitle: (item, id) => ((item && null)),
                                renderContent: (item, id, rowItem) => {
                                    return (
                                        <BasicContainer theme={{
                                            textAlign: "right",
                                        }}>
                                            {[
                                                <Text
                                                    key={`${item}1`}
                                                    theme={{
                                                        display: 'block',
                                                        //width: '35%',
                                                        margin: "0 1rem 0 0",
                                                        color: rowItem?.Status <= 1 ? "#e37f22" : rowItem?.Status === 2 ? "#d25959" : rowItem?.Status === 3 ? '#d25959' : rowItem?.Status === 4 ? '#d25959' : rowItem?.Status === 5 ? '#26b49a' : rowItem?.Status === 6 ? '#d25959' : '#d25959',

                                                        fontSize: "1rem",
                                                        fontWeight: "400",
                                                        textAlign: "right",
                                                    }}>{rowItem?.Status <= 1 ? '即將到來' : rowItem?.Status === 2 ? '客戶未到' : rowItem?.Status === 3 ? '已由顧客取消' : rowItem?.Status === 4 ? '已由系統取消' : rowItem?.Status === 5 ? '已完成' : rowItem?.Status === 6 ? '逾期未排班' : '狀態異常'}</Text>,
                                                <EasyButton
                                                    key={`${item}2`}
                                                    onClick={() => {
                                                        rowItem?.Status <= 1 ?
                                                            portalService.warn({
                                                                autoClose: false,
                                                                yes: () => { rowItem?.Status <= 1 ? executeCancelOrder(rowItem, DateRange, SearchWord, Mode) : history.push(`ReservationList/${rowItem?.Id}?data=${JSON.stringify(rowItem)}`) },
                                                                yesText: "是，取消預約",
                                                                noText: "否，繼續瀏覽",
                                                                content: (
                                                                    <>
                                                                        <Text theme={reservationList.exportText}>
                                                                            {`確定取消${rowItem?.ReservationDate?.split('T')?.[0]}在${rowItem?.ShopName}的預約嗎`}
                                                                        </Text>

                                                                    </>)
                                                            }) : history.push(`ReservationList/${rowItem?.Id}?data=${JSON.stringify(rowItem)}`)
                                                    }}
                                                    theme={rowItem?.Status <= 1 ? reservationList.exportButton : (rowItem?.Status === 5 && rowItem?.AllService !== 0) ? reservationList.checkServiceButton : { display: 'none' }}
                                                    text={rowItem?.Status <= 1 ? "取消預約" : '查看評論'}
                                                />
                                            ]}
                                        </BasicContainer>
                                    )
                                }
                            },
                        }}
                    />
                </BasicContainer>
            </BasicContainer>}
            {
                width <= 768 && <BasicContainer theme={reservationList.basicContainer}>
                    <ReservationListPageTitleAddSearch tableBasicContainerLessThan768
                        setMode={(mode) => { setMode(mode) }}
                        execute={execute}
                        setSearchWord={setSearchWord}
                        setDateRange={setDateRange}
                        switch={[OpenExportJumpDialog, (isOpen) => { setOpenExportJumpDialog(isOpen) }]}
                    />
                    <BasicContainer theme={reservationList.tableBasicContainerLessThan768}>
                        <CardTable data={{
                            ...TableData, data: TableData?.data?.filter((item) => {
                                if (Mode?.value === 'all')
                                    return item;
                                else if (Mode?.value === 'undone')
                                    return item?.Status === 0 || item?.Status === 1;
                                else if (Mode?.value === 'overtime')
                                    return item?.Status === 6;
                                else if (Mode?.value === 'done')
                                    return item?.Status === 5;
                                else if (Mode?.value === 'cancle')
                                    return item?.Status === 2 || item?.Status === 3 || item?.Status === 4;

                            })
                        }}
                            title={["管理員姓名", "顧客資訊", "預約日期", "預約編號", '足健師資訊', ""]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                            colKeys={["ShopName", "CustomerName", "ReservationDate", "OrderNo", "MasterName", "controll"]} //必傳
                            // turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//暫不提供，因為沒用到 發查翻頁，必傳否則不能翻頁
                            theme={{
                                // basicContainer:{}, // 卡片最外層容器
                                // rowContainer: {}, // 卡片內每個資料列容器樣式，可在下方針對個別欄位複寫樣式
                                // rowTitle: {}, // 卡片內每個資料列中標題 不以renderTitle複寫時樣式
                                // rowContent: {}, // 卡片內每個資料列中標題 不以renderContent複寫時樣式
                                "ShopName": {
                                    // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                    // renderTitle: (item, id) => (`${item} ${id} sdf`)
                                    width: "20%",
                                    renderTitle: (item, id, rowItem) => ((item &&
                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            //display: 'inline-box',
                                        }}
                                            theme={{
                                                display: "block",
                                                width: '50%',
                                                //margin: "0 0 0.375rem 0",
                                                color: "#444",
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                lineHeight: '21px',
                                            }}>{rowItem?.ShopName}</Text>)),
                                    renderContent: (item, id, rowItem) => ((item &&
                                        <>
                                            <Text style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                //padding: '0 5rem 0 0',
                                                whiteSpace: 'nowarp',
                                                //display: 'inline-box',
                                            }}
                                                theme={{
                                                    display: "block",
                                                    //width: '50%',
                                                    //margin: "0 0 0.375rem 0",
                                                    color: "#444",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    lineHeight: '26px',
                                                }}>{rowItem?.ShopAddr}</Text>
                                            <Text style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                //padding: '0 5rem 0 0',
                                                whiteSpace: 'nowarp',
                                                //display: 'inline-box',
                                            }}
                                                theme={{
                                                    display: "block",
                                                    width: '50%',
                                                    //margin: "0 0 0.375rem 0",
                                                    color: "#964f19",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    lineHeight: '19px',
                                                }}>{rowItem?.ShopTel}</Text>
                                        </>
                                    ))
                                },
                                "CustomerName": {
                                    renderTitle: (item, id) => ((item &&
                                        <Text theme={{
                                            display: "block",
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500"
                                        }}>{item}</Text>)),
                                    renderContent: (item, id, rowItem) => ((item &&
                                        <>
                                            <Text style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                //padding: '0 5rem 0 0',
                                                whiteSpace: 'nowarp',
                                                //display: 'inline-box',
                                            }}
                                                theme={{
                                                    display: "block",
                                                    width: '50%',
                                                    //margin: "0 0 0.375rem 0",
                                                    color: "#444",
                                                    fontSize: "16px",
                                                    fontWeight: "400",
                                                    lineHeight: '19px',
                                                }}>{item}</Text>
                                            <Text style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                //padding: '0 5rem 0 0',
                                                whiteSpace: 'nowarp',
                                                //display: 'inline-box',
                                            }}
                                                theme={{
                                                    display: "block",
                                                    width: '50%',
                                                    //margin: "0 0 0.375rem 0",
                                                    color: "#964f19",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    lineHeight: '19px',
                                                }}>{rowItem?.CustomerPhone}</Text>
                                        </>
                                    ))
                                },
                                "ReservationDate": {
                                    renderTitle: (item, id) => ((item &&
                                        <Text theme={{
                                            display: "block",
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500"
                                        }}>{item}</Text>)),
                                    renderContent: (item, id, rowItem) => ((item &&
                                        <Text style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            //padding: '0 5rem 0 0',
                                            whiteSpace: 'nowarp',
                                            //display: 'inline-box',
                                        }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                //width: '50%',
                                                //margin: "0 0 0.375rem 0",
                                                color: "#444",
                                                fontSize: "1.125rem",
                                                fontWeight: "900"
                                            }}>{`${rowItem?.ReservationDate?.split("T")?.[0]} ${rowItem?.ReservationDate?.split("T")?.[1]}`}</Text>)),
                                },
                                "OrderNo": {
                                    renderTitle: (item, id) => ((item &&
                                        <Text theme={{
                                            display: "block",
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500"
                                        }}>{item}</Text>)),
                                    renderContent: (item, id) => ((item &&
                                        <Text theme={{
                                            color: "#444",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            lineHeight: '19px'
                                        }}>{item}</Text>))
                                },
                                "MasterName": {
                                    rowContainer: {
                                        position: "absolute",
                                        top: "90px",
                                        left: "50%"
                                    },
                                    renderTitle: (item, id) => ((item &&
                                        <Text theme={{
                                            display: "block",
                                            margin: "0 0 0.375rem 0",
                                            color: "#999",
                                            fontSize: "0.75rem",
                                            fontWeight: "500"
                                        }}>{item}</Text>)),
                                    renderContent: (item, id, rowItem) => ((
                                        <>
                                            <Text theme={{
                                                display: 'block',
                                                color: "#444",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: '19px'
                                            }}>{item === '' ? '尚未派遣' : item}</Text>
                                            <Text theme={{
                                                display: 'block',
                                                color: "#964f19",
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                lineHeight: '19px'
                                            }}>{item === '' ? '' : rowItem?.MasterPhone}</Text>
                                        </>))
                                },
                                "controll": {
                                    width: "40%",
                                    rowContainer: {
                                        position: "absolute",
                                        top: "0.875rem",
                                        right: "0.2rem"
                                    },
                                    renderTitle: (item, id) => ((item && null)),
                                    renderContent: (item, id, rowItem) => {
                                        return (
                                            <BasicContainer theme={{
                                                textAlign: "right",
                                            }}>
                                                {[
                                                    <Text
                                                        key={`${item}1`}
                                                        theme={{
                                                            display: 'block',
                                                            //width: '35%',
                                                            margin: "0 1rem 0 0",
                                                            color: rowItem?.Status <= 1 ? "#e37f22" : rowItem?.Status === 2 ? "#d25959" : rowItem?.Status === 3 ? '#d25959' : rowItem?.Status === 4 ? '#d25959' : rowItem?.Status === 5 ? '#26b49a' : rowItem?.Status === 6 ? '#d25959' : '#d25959',

                                                            fontSize: "1rem",
                                                            fontWeight: "400",
                                                            textAlign: "right",
                                                        }}>{rowItem?.Status <= 1 ? '即將到來' : rowItem?.Status === 2 ? '客戶未到' : rowItem?.Status === 3 ? '已由顧客取消' : rowItem?.Status === 4 ? '已由系統取消' : rowItem?.Status === 5 ? '已完成' : rowItem?.Status === 6 ? '逾期未排班' : '狀態異常'}</Text>,
                                                    <EasyButton
                                                        key={`${item}2`}
                                                        onClick={() => {
                                                            portalService.warn({
                                                                autoClose: false,
                                                                yes: () => { executeCancelOrder(rowItem, DateRange, SearchWord, Mode) },
                                                                yesText: "是，取消預約",
                                                                noText: "否，繼續瀏覽",
                                                                content: (
                                                                    <>
                                                                        <Text theme={reservationList.exportText}>
                                                                            {`確定取消${rowItem?.ReservationDate?.split('T')?.[0]}在${rowItem?.ShopName}的預約嗎`}
                                                                        </Text>

                                                                    </>)
                                                            })
                                                        }}
                                                        theme={rowItem?.Status <= 1 ? reservationList.exportButton : (rowItem?.Status === 5 && rowItem?.AllService !== 0) ? reservationList.checkServiceButton : { display: 'none' }}
                                                        text={rowItem?.Status <= 1 ? "取消預約" : '查看評論'}
                                                    />
                                                ]}
                                            </BasicContainer>
                                        )
                                    }
                                },
                            }}
                        />
                    </BasicContainer>
                </BasicContainer>
            }
        </>
    )
}