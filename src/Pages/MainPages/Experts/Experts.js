import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton, JumpDialogButton } from '../../../Components/Buttons';
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
import { JumpDialog } from '../../../Components/JumpDialog';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';
import { TooltipBasic } from '../../../Components/Tooltips';
import { ExpertsPageTitleAddSearch } from './ExpertsPageTitleAddSearch';
import { ExpertsAddCard } from './ExpertsAddCard';
import { ExpertsEditCard } from './ExpertsEditCard';
export const Experts = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { expertsPage: { experts } } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [OpenDelJumpDialog, setOpenDelJumpDialog] = useState(false); // 開啟刪除彈窗
    const [OpenAddJumpDialog, setOpenAddJumpDialog] = useState(false); // 開啟新增彈窗
    const [OpenEditJumpDialog, setOpenEditJumpDialog] = useState(false); // 開啟編輯彈窗
    const [ScrollPage, setScrollPage] = useState(2); // 滾動到底部加載頁面
    const [DelWho, setDelWho] = useState(""); // 刪除彈窗中刪除名字
    const [EditAutoFill, setEditAutoFill] = useState({}); // 編輯彈窗中data
    const [SearchWord, setSearchWord] = useState(""); // 儲存關鍵字，供翻頁時的查詢用
    const [width] = useWindowSize();

    const [Id, Idhandler, IdregExpResult, IdResetValue] = useForm("", [""], [""]); // Id欄位

    //#region 重置表單欄位的State值
    const formValueReast = () => {

    }
    //#endregion

    //#region 查詢列表API
    const getRoleByPageOrkey = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/FootMaster/Get?page=${page}&key=${(key ? `${key}` : "")}`,
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
                clearlocalStorage();
                history.push("/Login");
                throw Error;
            })
            .finally(() => {

            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [execute, Pending] = useAsync(getRoleByPageOrkey, true);
    //#endregion

    //#region 滾動底部加載查詢列表API
    const getRoleByPageOrkeyScrollBottom = useCallback(async (page = 1, key) => {
        return await fetch(`${APIUrl}api/FootMaster/Get?page=${page}&key=${(key ? `${key}` : "")}`,
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

    //#region 刪除足健師 API
    const delAdminUser = useCallback(async (id) => {
        //console.log("id")
        return await fetch(`${APIUrl}api/FootMaster/Delete?id=${id}`,
            {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                }
            }
        )//刪除足健師
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
                    alertService.normal("刪除足健師成功", { autoClose: true });
                    return "刪除足健師成功"
                } else {
                    alertService.normal("刪除足健師失敗", { autoClose: true });
                    throw new Error("刪除足健師失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {
                execute(1);
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history, execute])

    const [DelAdminUserExecute, DelAdminUserPending] = useAsync(delAdminUser, false);
    //#endregion

    //#region 新增足健師API 
    const addExpert = useCallback(async (MasterNo, Name, Sex, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr, NowServiceAddr, ServiceArea, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight) => {
        //return console.log(`${BirthYear?.value}-${BirthMonth?.value}-${BirthDay?.value}`, `${ServiceArea.map((item) => { return item?.value })?.join()}`);
        //return console.log(MasterNo, Name, Sex, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr, NowServiceAddr, ServiceArea, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight)
        return await fetch(`${APIUrl}api/FootMaster/Post`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    CommAddr: Addr,
                    CommCounty: County?.value,
                    CommDistrict: District?.value,
                    CreateTime: new Date(),
                    DeviceId: "",
                    FridayService: `${FriLeft?.value ?? ''}-${FriRight?.value ?? ''}`,
                    //Id: 0,
                    IsDeleted: false,
                    MasterNo: MasterNo,
                    MondayService: `${MonLeft?.value ?? ''}-${MonRight?.value ?? ''}`,
                    NowServiceAddr: NowServiceAddr,
                    //Remark: "0",
                    SaturdayService: `${SatLeft?.value ?? ''}-${SatRight?.value ?? ''}`,
                    ServiceArea: `${ServiceArea.map((item) => { return item?.value })?.join()}`,
                    SundayService: `${SunLeft?.value ?? ''}-${SunRight?.value ?? ''}`,
                    ThursdayService: `${ThuLeft?.value ?? ''}-${ThuRight?.value ?? ''}`,
                    TuesdayService: `${TueLeft?.value ?? ''}-${TueRight?.value ?? ''}`,
                    WednesdayService: `${WenLeft?.value ?? ''}-${WenRight?.value ?? ''}`,
                    mBirthDay: `${BirthYear?.value}-${BirthMonth?.value}-${BirthDay?.value}`,
                    mEmail: Email,
                    mLoginName: MasterNo,
                    mLoginPWD: `${BirthYear?.value}${BirthMonth?.value}${BirthDay?.value}`,
                    mRealName: Name,
                    mTel: Phone,
                    mSex: Sex?.value,
                })
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                //console.log(PreResult)
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }

                if (PreResult.success) {
                    alertService.normal("新增管理員成功", { autoClose: true });
                    return "新增管理員成功"
                } else {
                    alertService.warn(PreResult.msg, { autoClose: true });
                    throw new Error("新增管理員失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {
                execute(1);
                setOpenAddJumpDialog(false);
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [AddExpertExecute, AddExpertPending] = useAsync(addExpert, false);
    //#endregion

    //#region 編輯足健師API 
    const editExpert = useCallback(async (MasterNo, Name, Sex, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr, NowServiceAddr, ServiceArea, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight) => {
        //return console.log(`${BirthYear?.value}-${BirthMonth?.value}-${BirthDay?.value}`, `${ServiceArea.map((item) => { return item?.value })?.join()}`);
        return console.log(MasterNo, Name, Sex, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr, NowServiceAddr, ServiceArea, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight)
        return await fetch(`${APIUrl}api/FootMaster/Put`,
            {
                method: "Put",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    CommAddr: Addr,
                    CommCounty: County?.value,
                    CommDistrict: District?.value,
                    CreateTime: new Date(),
                    DeviceId: "",
                    FridayService: `${FriLeft?.value ?? ''}-${FriRight?.value ?? ''}`,
                    //Id: 0,
                    IsDeleted: false,
                    MasterNo: MasterNo,
                    MondayService: `${MonLeft?.value ?? ''}-${MonRight?.value ?? ''}`,
                    NowServiceAddr: NowServiceAddr,
                    //Remark: "0",
                    SaturdayService: `${SatLeft?.value ?? ''}-${SatRight?.value ?? ''}`,
                    ServiceArea: `${ServiceArea.map((item) => { return item?.value })?.join()}`,
                    SundayService: `${SunLeft?.value ?? ''}-${SunRight?.value ?? ''}`,
                    ThursdayService: `${ThuLeft?.value ?? ''}-${ThuRight?.value ?? ''}`,
                    TuesdayService: `${TueLeft?.value ?? ''}-${TueRight?.value ?? ''}`,
                    WednesdayService: `${WenLeft?.value ?? ''}-${WenRight?.value ?? ''}`,
                    mBirthDay: `${BirthYear?.value}-${BirthMonth?.value}-${BirthDay?.value}`,
                    mEmail: Email,
                    mLoginName: MasterNo,
                    mLoginPWD: `${BirthYear?.value}${BirthMonth?.value}${BirthDay?.value}`,
                    mRealName: Name,
                    mTel: Phone,
                    mSex: Sex?.value,
                })
            }
        )//查詢角色、表格翻頁
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                //console.log(PreResult)
                if (PreResult.Status === 401) {
                    //Token過期 強制登出
                    clearlocalStorage();
                    history.push("/Login");
                    throw new Error("Token過期 強制登出");
                }

                if (PreResult.success) {
                    alertService.normal("新增管理員成功", { autoClose: true });
                    return "新增管理員成功"
                } else {
                    alertService.warn(PreResult.msg, { autoClose: true });
                    throw new Error("新增管理員失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {
                execute(1);
                setOpenAddJumpDialog(false);
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [EditExpertExecute, EditExpertPending] = useAsync(editExpert, false);
    //#endregion
    return (
        <>
            {/* 寬度大於等於768時渲染的組件 */}
            {width > 768 && <BasicContainer theme={experts.basicContainer}>
                <ExpertsPageTitleAddSearch setOpenAddJumpDialog={setOpenAddJumpDialog} execute={execute} setSearchWord={setSearchWord} />
                <BasicContainer theme={experts.tableBasicContainer}>
                    <TableBasic
                        data={TableData} //原始資料
                        title={["工號", "姓名", "連絡電話", "通訊地址", "生日", 'Email', '加入日期', '']} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["MasterNo", "mRealName", "mTel", "CommCounty", "mBirthDay", 'mEmail', 'CreateTime', 'controll']} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
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
                            "MasterNo": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "10%",

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
                                                display: "inline-block",
                                                color: "#444",
                                                fontWeight: "550",
                                                cursor: "default",
                                                fontSize: "1rem",
                                                whiteSpace: 'nowarp'
                                            }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "mRealName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "10%",

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
                            "mTel": {
                                // width: "45rem",
                                width: "10%",
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
                            "CommCounty": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id, rowItem) => ((item &&
                                    <TooltipBasic title={`${item ?? ''}${rowItem?.CommDistrict ?? ''}${rowItem?.CommAddr ?? ''}`} arrow>
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
                                            }}>{`${item ?? ''}${rowItem?.CommDistrict ?? ''}${rowItem?.CommAddr ?? ''}`}</Text>
                                    </TooltipBasic>))
                            },
                            "mBirthDay": {
                                // width: "45rem",
                                width: "10%",
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
                                            }}>{item.split("T")[0]}</Text>
                                    </TooltipBasic>))
                            },
                            "mEmail": {
                                // width: "45rem",
                                width: "20%",
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
                                                whiteSpace: 'nowarp'
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
                            "CreateTime": {
                                // width: "45rem",
                                width: "10%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item.split("T")[0]} arrow>
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
                                            }}>{item.split("T")[0]}</Text>
                                    </TooltipBasic>))
                            },
                            "controll": {
                                //width: "20rem",
                                width: "10%",
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
                                                        onClick={() => { setEditAutoFill(rowItem); setOpenEditJumpDialog(true); }}
                                                    />
                                                </TooltipBasic>,
                                                <TooltipBasic key={`${item}2`} title={"刪除"} arrow>
                                                    <DeleteForeverIcon
                                                        style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }}
                                                        onClick={() => { setOpenDelJumpDialog((o) => (!o)); setDelWho(rowItem.mRealName); IdResetValue(rowItem.Id) }}
                                                    />
                                                </TooltipBasic>
                                            ]}
                                        </BasicContainer>
                                    )


                                }
                            },
                        }} />
                </BasicContainer>
            </BasicContainer>
            }
            {/* 寬度小於768時渲染的組件 */}
            {width <= 768 && <BasicContainer theme={experts.basicContainer}
                onScroll={(e) => {
                    // 滾動至最底部加載新資料
                    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
                        if (!PendingScrollBottom) {
                            //非API執行中
                            executeScrollBottom(ScrollPage)
                            //console.log("Bottom")
                        }
                    }
                }}
            >
                <ExpertsPageTitleAddSearch tableBasicContainerLessThan768 setOpenAddJumpDialog={setOpenAddJumpDialog} execute={execute} setSearchWord={setSearchWord} />
                <BasicContainer theme={experts.tableBasicContainerLessThan768}>
                    <CardTable data={TableData}
                        title={["工號", "足健師姓名", "連絡電話", "通訊地址", "生日", 'Email', '加入日期', '']} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["MasterNo", "mRealName", "mTel", "CommCounty", "mBirthDay", 'mEmail', 'CreateTime', 'controll']} //必傳
                        // turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//暫不提供，因為沒用到 發查翻頁，必傳否則不能翻頁
                        theme={{
                            // basicContainer:{}, // 卡片最外層容器
                            // rowContainer: {}, // 卡片內每個資料列容器樣式，可在下方針對個別欄位複寫樣式
                            // rowTitle: {}, // 卡片內每個資料列中標題 不以renderTitle複寫時樣式
                            // rowContent: {}, // 卡片內每個資料列中標題 不以renderContent複寫時樣式
                            "MasterNo": {

                                renderTitle: (item, id) => ((item &&
                                    <Text theme={{
                                        display: "block",
                                        margin: "0 0 0.375rem 0",
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>)),
                                renderContent: (item, id, rowItem) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>))
                            },
                            "mRealName": {
                                width: "40%",
                                rowContainer: {
                                    position: "absolute",
                                    top: "0.875rem",
                                    left: "50%"
                                },
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // renderTitle: (item, id) => (`${item} ${id} sdf`)

                                renderTitle: (item, id) => ((item &&
                                    <Text theme={{
                                        display: "block",
                                        margin: "0 0 0.375rem 0",
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        fontWeight: "500",
                                        height: "0.875rem"
                                    }}>{item}</Text>)),
                                renderContent: (item, id) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>))
                            },
                            "mTel": {
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
                                        color: "#964f19",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>))
                            },
                            "CommCounty": {
                                renderTitle: (item, id) => ((item &&
                                    <Text theme={{
                                        display: "block",
                                        margin: "0 0 0.375rem 0",
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>)),
                                renderContent: (item, id, rowItem) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{`${item ?? ''}${rowItem?.CommDistrict ?? ''}${rowItem?.CommAddr ?? ''}`}</Text>))
                            },
                            "mBirthDay": {
                                width: "40%",
                                rowContainer: {
                                    position: "absolute",
                                    top: "4.25rem",
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
                                renderContent: (item, id) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item.split("T")[0]}</Text>))
                            },
                            "mEmail": {
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
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item}</Text>))
                            },
                            "CreateTime": {
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
                                        fontSize: "1rem",
                                        fontWeight: "500"
                                    }}>{item.split("T")[0]}</Text>))
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
                                                <CreateIcon
                                                    key={`${item}1`}
                                                    style={{ cursor: "pointer", color: "#964f19", margin: "0 0.5rem 0 0" }}
                                                    onClick={() => { setEditAutoFill(rowItem); setOpenEditJumpDialog(true); }}
                                                />,
                                                <DeleteForeverIcon
                                                    key={`${item}2`}
                                                    style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }}
                                                    onClick={() => { setOpenDelJumpDialog(true); setDelWho(rowItem.mRealName); IdResetValue(rowItem.Id) }}
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
            {/* 刪除彈窗 */}
            {OpenDelJumpDialog &&
                <JumpDialog
                    switch={[OpenDelJumpDialog, setOpenDelJumpDialog]}
                    close={() => { setDelWho("") }}
                    yes={() => {
                        setDelWho("");
                        DelAdminUserExecute(Id);
                    }}
                    yesText={"是，移除足健師"}
                    no={() => {
                        setDelWho("");
                        alertService.clear();
                    }}
                    noText={"否，取消移除"}
                >
                    <BasicContainer theme={{ width: "100%", height: "9.375rem", textAlign: "center" }}>
                        <ErrorOutlineIcon style={{
                            position: "relative",
                            top: "-1.5rem",
                            height: "9.375rem",
                            width: "6.5rem",
                            color: "#facea8"
                        }} />
                    </BasicContainer>
                    <Text theme={{
                        display: "inline-block",
                        color: "#545454",
                        fontSize: "1.125em",
                        fontWeight: 600
                    }}>
                        您確定要將 <Text theme={{
                            color: "#545454",
                            fontSize: "1.15em",
                            fontWeight: 600
                        }}>{DelWho}</Text> 的帳號從足健師名單中移除嗎？
                        </Text>
                </JumpDialog>
            }
            {/* 新增表單卡片 */}
            {OpenAddJumpDialog && <ExpertsAddCard execute={(page, key) => { execute(page, key) }} addAdminUserExecute={AddExpertExecute} onClose={setOpenAddJumpDialog} />}
            {/* 編輯表單卡片 */}
            {OpenEditJumpDialog && <ExpertsEditCard execute={(page, key) => { execute(page, key) }} editAdminUserExecute={EditExpertExecute} onClose={(isOpen) => { setOpenEditJumpDialog(isOpen) }} editAutoFill={EditAutoFill} />}
        </>
    )
}