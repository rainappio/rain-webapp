import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton, JumpDialogButton } from '../../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormControl, FormRow, FormCardSelector } from '../../../Components/Forms';
import { TableBasic } from '../../../Components/Tables';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { Text } from '../../../Components/Texts'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CardTable } from '../../../Components/CardTable';
import { JumpDialog } from '../../../Components/JumpDialog';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';
import { TooltipBasic } from '../../../Components/Tooltips';
import { DispatchPageTitleAddSearch } from './DispatchPageTitleAddSearch';
import { EditCard } from './EditCard';
import { useSwitch } from '../../../SelfHooks/useSwitch'

export const Dispatch = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchPage: { dispatch } } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [MasterData, setMasterData] = useState([]);
    const [OpenDelJumpDialog, setOpenDelJumpDialog] = useState(false); // 開啟刪除彈窗
    const [OpenAddJumpDialog, setOpenAddJumpDialog] = useState(false); // 開啟新增彈窗
    const [OpenEditJumpDialog, setOpenEditJumpDialog] = useState(false); // 開啟編輯彈窗
    const [ScrollPage, setScrollPage] = useState(2); // 滾動到底部加載頁面
    const [DelWho, setDelWho] = useState(""); // 刪除彈窗中刪除名字
    const [EditWho, setEditWho] = useState(""); // 刪除彈窗中刪除名字
    const [EditAutoFill, setEditAutoFill] = useState({}); // 刪除彈窗中data
    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [width] = useWindowSize();
    const [Id, Idhandler, IdregExpResult, IdResetValue] = useForm("", [""], [""]); // Id欄位
    const [Mode, Modehandler, ModeregExpResult, ModeResetValue] = useSelector({ value: "future", label: "顯示未來訂單" }, [], []); // 狀態欄位
    const [ChoosenMaster, ChoosenMasterhandler, ChoosenMasterregExpResult, ChoosenMasterResetValue] = useSelector('', [], []); // 狀態欄位
    const [AllCheck, setAllCheck] = useState({})//儲存已選擇之下拉選單值
    const [Check, setCheck] = useState([])//儲存以勾選之列id
    const [ResetPickerFlag, setResetPickerFlag] = useState(true)//儲存以勾選之列id


    const filterMaster = (array, order) => {
        if (order) {
            let matchArea = order?.ShopAddr.slice(0, 6);
            matchArea = matchArea.replace('台', '臺');
            let matchArea2 = order?.ShopAddr.slice(0, 5);//前五個字 ex台中市南區
            matchArea2 = matchArea2.replace('台', '臺');
            let day = new Date(order?.ReservationDate).getDay();//星期幾
            let time = order?.ReservationDate.split('T')[1];
            //console.log(day);
            let filterArray = array.filter((item) => { return fliterAreaFunc(item, matchArea, matchArea2) });
            let filterArray2 = filterArray.filter((item) => { return fliterTimeFunc(item, day, time) });
            //console.log("filter", filterArray);
            return filterArray2;
        }

        return array;
    }

    const fliterAreaFunc = (item, matchArea, matchArea2) => {
        //console.log("testTF", item, matchArea, matchArea2);
        let serviceArray = item?.ServiceArea.split(',');
        for (let i = 0; i < serviceArray.length; i++) {
            if (serviceArray[i] === matchArea || serviceArray[i] === matchArea2) {
                return true;
            }
        }
        return false;
    }

    const fliterTimeFunc = (item, day, time) => {
        //console.log(item, day, time)
        if (day === 4) {
            let serviceTime = item?.ThursdayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 5) {
            let serviceTime = item?.FridayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 6) {
            let serviceTime = item?.SaturdayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 0) {
            let serviceTime = item?.SundayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 1) {
            let serviceTime = item?.MondayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 2) {
            let serviceTime = item?.TuesdayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        } else if (day === 3) {
            let serviceTime = item?.WednesdayService.split('-');
            if (time >= serviceTime[0] && time <= serviceTime[1]) {
                return true;
            }
            else
                return false;
        }
        else {
            return false;
        }

    }

    //#region 查詢列表API
    const getRoleByPageOrkey = useCallback(async (startDate, endDate, key, ) => {
        return await fetch(`${APIUrl}api/Orders/GetList?_date=${startDate}&_eDate=${endDate}`,
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
                    let tempData = PreResult.response.filter((item) => { return item.Status === 0 })
                    setTableData({ data: tempData });
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
                //ChoosenMasterResetValue('');
                //console.log("Done");
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute, Pending] = useAsync(getRoleByPageOrkey, false);
    //#endregion

    //#region 查詢足見師列表API
    const getMaster = useCallback(async () => {
        return await fetch(`${APIUrl}api/FootMaster/GetList?`,
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
                    let data = PreResult.response.map((item) => { return { ...item, value: item?.mRealName, label: item?.mRealName } })
                    //console.log(data)
                    setMasterData(data);
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

    const [executeGetMaster, PendingGetMaster] = useAsync(getMaster, true);
    //#endregion

    //#region 滾動底部加載查詢列表API
    const getRoleByPageOrkeyScrollBottom = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/Shops/Get?page=${page}&key=${(key ? `${key}` : "")}`,
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
                    // console.log(PreResult.response)
                    setTableData((d) => ({ ...d, data: [...(d?.data ?? []), ...PreResult.response.data] }));
                    setScrollPage((p) => (p + 1)); // 頁數+1
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

    const [executeScrollBottom, PendingScrollBottom] = useAsync(getRoleByPageOrkeyScrollBottom, false);
    //#endregion

    //#region 派遣足見師API
    const letItGo = useCallback(async (order, master) => {
        //return console.log(order, master);
        return await fetch(`${APIUrl}api/Orders/Put`,
            {
                method: "Put",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    ...order,
                    FootMasterId: master?.Id,
                    IsDeleted: false,
                    Status: 1,
                })
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
                    //setTableData({ data: PreResult.response });
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
                setResetPickerFlag(!ResetPickerFlag);
                setAllCheck({});
                setCheck([]);
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [executeLetItGo, PendingLetItGo] = useAsync(letItGo, false);
    //#endregion

    return (
        <>
            <BasicContainer theme={dispatch.basicContainer}>
                <DispatchPageTitleAddSearch
                    executeLetItGo={executeLetItGo}
                    Check={Check}
                    AllCheck={AllCheck}
                    execute={execute}
                />
                <BasicContainer theme={dispatch.tableBasicContainer}>
                    <TableBasic
                        data={TableData} //原始資料
                        title={["預約時間", "店名", "顧客姓名", "顧客電話", "顧客備註", '足健師姓名']} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["ReservationDate", "ShopName", "CustomerName", "CustomerPhone", "UserRemark", 'MasterName']} //必傳
                        haveCheck={true} //是否開啟勾選欄，預設不開啟
                        checkColKey={"Id"} //勾選欄資料的Key
                        onCheck={(check) => {
                            let tempArray = check.map((item) => { return TableData.data.find((item2) => { return item2.Id === item }) });

                            setCheck(tempArray.filter((item) => { return item !== undefined }))
                        }}
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0px", //外層容器最小寬度
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
                            "ReservationDate": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "20%",

                                order: true,// 是否開啟排序，預設為不開啟

                                render: (item, id, rowItem) => ((item &&
                                    <>
                                        <TooltipBasic title={item} arrow>
                                            <Text
                                                style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    WebkitLineClamp: 1,
                                                    width: "80%",
                                                    WebkitBoxOrient: "vertical",
                                                    whiteSpace: 'nowarp',
                                                }}
                                                theme={{
                                                    display: "-webkit-inline-box",
                                                    color: "#444",
                                                    fontWeight: "550",
                                                    cursor: "default",
                                                    fontSize: "1rem",
                                                    whiteSpace: 'nowarp'
                                                }}>{`${item.split("T")[0]}  ${item.split("T")[1].slice(0, 5)}`}</Text>
                                        </TooltipBasic>
                                        <TooltipBasic key={`${item}1`} title={"編輯"} arrow>
                                            <CreateIcon
                                                style={{ cursor: "pointer", color: "#964f19", margin: "0 0rem 0 0" }}
                                                onClick={() => {
                                                    setEditWho(rowItem.Id); setEditAutoFill(rowItem); setOpenEditJumpDialog(true); //console.log(AllCheck);
                                                    //console.log(Check);
                                                }}
                                            />
                                        </TooltipBasic></>))
                            },
                            "ShopName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "15%",

                                order: true,// 是否開啟排序，預設為不開啟

                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item} arrow>
                                        <Text
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp',
                                            }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                color: "#444",
                                                fontWeight: "550",
                                                cursor: "default",
                                                fontSize: "1rem",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "CustomerName": {
                                // width: "45rem",
                                width: "15%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item} arrow>
                                        <Text
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                //whiteSpace: 'nowarp'
                                            }}
                                            theme={{
                                                display: "inline-block",
                                                color: "#444",
                                                fontWeight: "550",
                                                cursor: "default",
                                                fontSize: "1rem",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "CustomerPhone": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id, rowItem) => ((item &&
                                    <TooltipBasic title={`${rowItem?.County ?? ''}${rowItem?.District ?? ''}${rowItem?.Addr ?? ''}`} arrow>
                                        <Text
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: "100%",
                                                WebkitBoxOrient: "vertical",
                                                whiteSpace: 'nowarp'
                                            }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                color: "#444",
                                                fontWeight: "550",
                                                cursor: "default",
                                                fontSize: "1rem",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "UserRemark": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item.split("T")[0]} arrow>
                                        <Text
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitLineClamp: 1,
                                                width: '100%',
                                                WebkitBoxOrient: "vertical",
                                                //whiteSpace: 'nowarp'
                                            }}
                                            theme={{
                                                display: "-webkit-inline-box",
                                                color: "#444",
                                                fontWeight: "550",
                                                cursor: "default",
                                                fontSize: "1rem",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "MasterName": {
                                // width: "45rem",
                                width: "20%",
                                //order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id, rowItem) => ((

                                    <BasicContainer theme={{ width: "100%" }}>
                                        {ResetPickerFlag && < FormCardSelector
                                            //label={""}
                                            //hint={""}
                                            placeholder={`選擇足健師`}
                                            //value={ChoosenMaster}
                                            isSearchable
                                            options={filterMaster(MasterData, rowItem)}
                                            onChange={(values) => {
                                                //ChoosenMasterResetValue(values);
                                                setAllCheck((a) => ({ ...a, [rowItem.Id]: values }))
                                                //console.log(AllCheck);
                                                //console.log(Check);
                                            }}
                                            regExpResult={ChoosenMasterregExpResult}
                                            theme={dispatch.modeSelector}
                                        ></FormCardSelector>}
                                        {!ResetPickerFlag && < FormCardSelector
                                            //label={""}
                                            //hint={""}
                                            placeholder={`選擇足健師`}
                                            //value={ChoosenMaster}
                                            isSearchable
                                            options={filterMaster(MasterData, rowItem)}
                                            onChange={(values) => {
                                                //ChoosenMasterResetValue(values);
                                                setAllCheck((a) => ({ ...a, [rowItem.Id]: values }))

                                            }}
                                            regExpResult={ChoosenMasterregExpResult}
                                            theme={dispatch.modeSelector}
                                        ></FormCardSelector>}
                                    </BasicContainer>
                                ))
                            },
                            /* "controll": {
                        //width: "20rem",
                        width: "7rem",
                                //order: true,
                                render: (item, id, rowItem) => {
                                    return (
                                        <BasicContainer theme={{ textAlign: "right" }} style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        width: "100%",
                        WebkitBoxOrient: "vertical",
                        whiteSpace: 'nowarp', display: "-webkit-inline-box",
                    }}>
                        {[
                            <TooltipBasic key={`${item}1`} title={"編輯"} arrow>
                                <CreateIcon
                                    style={{ cursor: "pointer", color: "#964f19", margin: "0 1rem 0 0" }}
                                    onClick={() => { setEditWho(rowItem.Id); setEditAutoFill(rowItem); setOpenEditJumpDialog(true); }}
                                />
                            </TooltipBasic>,
                            <TooltipBasic key={`${item}2`} title={"刪除"} arrow>
                                <DeleteForeverIcon
                                    style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }}
                                    onClick={() => { setOpenDelJumpDialog((o) => (!o)); setDelWho(rowItem.ShopName); IdResetValue(rowItem.Id) }}
                                />
                            </TooltipBasic>
                        ]}
                    </BasicContainer>
                                    )


                                }
                            }, */
                        }} />
                </BasicContainer>
            </BasicContainer>
            {OpenEditJumpDialog && <EditCard execute={(page, key) => { execute(page, key) }} tableData={TableData} editExecute={(data) => { setTableData(data) }} onClose={(isOpen) => { setOpenEditJumpDialog(isOpen) }} editAutoFill={EditAutoFill} />}
        </>
    )
}