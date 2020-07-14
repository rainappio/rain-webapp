import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer, SubContainer } from '../../Components/Containers';
import { PageTitle } from '../../Components/PageTitle';
import { EasyButton, JumpDialogButton } from '../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormCardTextInput, FormControl, FormRow, FormCardSelector, FormCardLeftIconSelector } from '../../Components/Forms';
import { TableBasic } from '../../Components/Tables';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../SelfHooks/useForm'
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { Text } from '../../Components/Texts'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CardTable } from '../../Components/CardTable';
import { JumpDialog } from '../../Components/JumpDialog';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { alertService } from '../../Components/JumpAlerts';
import { FormCard } from '../../Components/FormCard';
import { TooltipBasic } from '../../Components/Tooltips';

export const Administrators = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { administrators } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [OpenDelJumpDialog, setOpenDelJumpDialog] = useState(false); // 開啟刪除彈窗
    const [OpenAddJumpDialog, setOpenAddJumpDialog] = useState(false); // 開啟新增彈窗
    const [OpenEditJumpDialog, setOpenEditJumpDialog] = useState(false); // 開啟編輯彈窗
    const [ScrollPage, setScrollPage] = useState(2); // 滾動到底部加載頁面
    const [DelWho, setDelWho] = useState(""); // 刪除彈窗中刪除名字
    const [SearchWord, SearchWordhandler, SearchWordregExpResult] = useForm("", [""], [""]);
    const [width] = useWindowSize();

    //#region 表單狀態管理
    const [Id, Idhandler, IdregExpResult, IdResetValue] = useForm("", [""], [""]); // Id欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入管理員中文姓名", "姓名最長為5個中文字"]); // 管理員姓名欄位
    const [Account, Accounthandler, AccountregExpResult, AccountResetValue] = useForm("", ["^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"], ["請輸入正確E-mail格式"]); // 管理員姓名欄位
    const [Pass, Passhandler, PassregExpResult, PassResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 管理員密碼欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入手機號碼", "請輸入正確手機格式"]); // 管理員手機欄位
    const [Location, Locationhandler, LocationregExpResult, LocationResetValue] = useSelector("", [(value) => (value?.value?.length > 0)], ["請選擇所在門市"]); // 管理員門市欄位
    const [Role, Rolehandler, RoleregExpResult, RoleResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇管理員身份"]); // 管理員身分欄位
    //#endregion

    //#region 重置表單欄位的State值
    const formValueReset = () => {
        IdResetValue("");
        NameResetValue("");
        AccountResetValue("");
        PassResetValue("");
        PhoneResetValue("");
        LocationResetValue("");
        RoleResetValue([]);
    }
    //#endregion

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
                    // console.log(PreResult.response)
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

    //#region 刪除管理員 API
    const delAdminUser = useCallback(async (id) => {
        //console.log("id")
        return await fetch(`${APIUrl}api/User/Delete?id=${id}`,
            {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                }
            }
        )//刪除管理員
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
                    alertService.normal("刪除管理員成功", { autoClose: true });
                    return "刪除管理員成功"
                } else {
                    alertService.warn("刪除管理員失敗", { autoClose: true });
                    throw new Error("刪除管理員失敗");
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

    //#region 新增用戶API
    const addAdminUser = useCallback(async (name, account, pass, phone, location, role) => {
        formValueReset();
        setOpenAddJumpDialog(false);
        return await fetch(`${APIUrl}api/User/Post`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    age: 0,
                    uStatus: 0,
                    sex: 0,
                    tdIsDelete: false,
                    uCreateTime: new Date(),
                    name: name,
                    uRealName: name,
                    uLoginName: account,
                    uLoginPWD: pass,
                    phone: phone,
                    ShopIds: location?.value,
                    RIDs: (role ?? []).map((item) => (item.value)),
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
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [AddAdminUserExecute, AddAdminUserPending] = useAsync(addAdminUser, false);
    //#endregion

    return (
        <>
            {/* 寬度大於等於768時渲染的組件 */}
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>管理員名單</PageTitle>
                <FormControl theme={{}} onSubmit={(e) => { e.preventDefault(); execute(1, SearchWord) }}>
                    <FormRow theme={administrators.addAndSearchFormRow}>
                        <SubContainer theme={administrators.addButtonSubContainer}>
                            <EasyButton
                                onClick={() => { setOpenAddJumpDialog(true) }}
                                theme={administrators.addButton}
                                text={"新增帳號"} icon={<AddIcon style={{
                                    position: "relative",
                                    top: "0.3rem",
                                    height: "1.28rem"
                                }} />}
                            />
                        </SubContainer>
                        <SearchTextInput
                            value={SearchWord}
                            onChange={SearchWordhandler}
                            regExpResult={SearchWordregExpResult}
                            placeholder={"搜尋姓名、電話、Email"}
                            theme={administrators.searchInput}
                            searchOnClick={() => { execute(1, SearchWord); }}
                        />
                    </FormRow>
                </FormControl>
                <BasicContainer theme={administrators.tableBasicContainer}>
                    <TableBasic
                        data={TableData} //原始資料
                        title={["姓名", "連絡電話", "建立日期", ""]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["uRealName", "phone", "uCreateTime", "controll"]} //必傳
                        //haveCheck={true} //是否開啟勾選欄，預設不開啟
                        showHowManyRows={9 * 1.143} //顯示列數 * 3.5rem
                        turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//發查翻頁，必傳否則不能翻頁
                        theme={{
                            // width:"", //外層容器寬度
                            minWidth: "0", //外層容器最小寬度
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
                            "uRealName": {
                                // width: "40rem", // 調整個別欄寬度
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // render: (item, id) => (`${item} ${id} sdf`)
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem",
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "phone": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item}</Text>
                                    </TooltipBasic>))
                            },
                            "uCreateTime": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => ((item &&
                                    <TooltipBasic title={item.split("T")[0]} arrow>
                                        <Text theme={{
                                            color: "#444",
                                            fontWeight: "550",
                                            cursor: "default",
                                            fontSize: "1rem"
                                        }}>{item.split("T")[0]}</Text>
                                    </TooltipBasic>))
                            },
                            "controll": {
                                // width: "20rem",
                                width: "40%",
                                //order: true,
                                render: (item, id, rowItem) => {
                                    return (
                                        <BasicContainer theme={{ textAlign: "right" }}>
                                            {[
                                                <TooltipBasic key={`${item}1`} title={"編輯"} arrow>
                                                    <CreateIcon
                                                        style={{ cursor: "pointer", color: "#964f19", margin: "0 1rem 0 0" }}
                                                        onClick={() => { setOpenEditJumpDialog(true) }}
                                                    />
                                                </TooltipBasic>,
                                                <TooltipBasic key={`${item}2`} title={"刪除"} arrow>
                                                    <DeleteForeverIcon
                                                        style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }}
                                                        onClick={() => { setOpenDelJumpDialog((o) => (!o)); setDelWho(rowItem.uRealName); IdResetValue(rowItem.uID) }}
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
            {width <= 768 && <BasicContainer theme={administrators.basicContainer}
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
                <FormControl theme={{}} onSubmit={(e) => { e.preventDefault(); execute(1, SearchWord) }}>
                    <FormRow theme={administrators.addAndSearchFormRowLessThan768}>
                        <SearchTextInput
                            value={SearchWord}
                            onChange={SearchWordhandler}
                            regExpResult={SearchWordregExpResult}
                            placeholder={"搜尋姓名、電話、Email"}
                            theme={administrators.searchInput}
                            searchOnClick={() => { execute(1, SearchWord); }}
                        />
                        <SubContainer theme={administrators.addButtonSubContainerLessThan768}>
                            <EasyButton
                                onClick={() => { setOpenAddJumpDialog(true) }}
                                theme={administrators.addButtonLessThan768}
                                text={"新增帳號"} icon={<AddIcon style={{
                                    position: "relative",
                                    top: "0.3rem",
                                    height: "1.28rem"
                                }} />}
                            />
                        </SubContainer>
                    </FormRow>
                </FormControl>
                <BasicContainer theme={administrators.tableBasicContainerLessThan768}>
                    <CardTable data={TableData}
                        title={["管理員姓名", "連絡電話", "Email", "建立日期", ""]} //必傳 title 與 colKeys 順序必需互相對應，否則名字跟資料欄會對錯
                        colKeys={["uRealName", "phone", "uLoginName", "uCreateTime", "controll"]} //必傳
                        // turnPageExecute={(executePages) => { execute(executePages, SearchWord) }}//暫不提供，因為沒用到 發查翻頁，必傳否則不能翻頁
                        theme={{
                            // basicContainer:{}, // 卡片最外層容器
                            // rowContainer: {}, // 卡片內每個資料列容器樣式，可在下方針對個別欄位複寫樣式
                            // rowTitle: {}, // 卡片內每個資料列中標題 不以renderTitle複寫時樣式
                            // rowContent: {}, // 卡片內每個資料列中標題 不以renderContent複寫時樣式
                            "uRealName": {
                                // 提供客製化渲染內容，可使用預設參數 item 與 id，item 為 對應列表資料、id 為對應列表資料的id
                                // renderTitle: (item, id) => (`${item} ${id} sdf`)
                                width: "20%",
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
                                        fontSize: "1.125rem",
                                        fontWeight: "900"
                                    }}>{item}</Text>))
                            },
                            "phone": {
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
                                        fontWeight: "550"
                                    }}>{item}</Text>))
                            },
                            "uLoginName": {
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
                            "uCreateTime": {
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
                                                    style={{ cursor: "pointer", color: "#964f19", margin: "0 1rem 0 0" }}
                                                    onClick={() => { setOpenEditJumpDialog(true) }}
                                                />,
                                                <DeleteForeverIcon
                                                    key={`${item}2`}
                                                    style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }}
                                                    onClick={() => { setOpenDelJumpDialog(true); setDelWho(rowItem.uRealName); IdResetValue(rowItem.uID) }}
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
                    yesText={"是，移除管理員"}
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
                        }}>{DelWho}</Text> 的帳號從管理員名單中移除嗎？
                        </Text>
                </JumpDialog>
            }
            {/* 新增表單卡片 */}
            {OpenAddJumpDialog && <FormCard
                title={"新增管理員帳號"}
                yes={() => {
                    //全部通過檢核才可放行
                    (AccountregExpResult ? alertService.warn(AccountregExpResult, { autoClose: true })
                        : (PassregExpResult ? alertService.warn(PassregExpResult, { autoClose: true })
                            : (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })
                                : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                                    : (LocationregExpResult ? alertService.warn(LocationregExpResult, { autoClose: true })
                                        : (RoleregExpResult ? alertService.warn(RoleregExpResult, { autoClose: true })
                                            : AddAdminUserExecute(Name, Account, Pass, Phone, Location, Role)
                                        )
                                    )
                                )
                            )
                        )
                    )
                }}
                yesText={"新增"}
                no={() => { setOpenAddJumpDialog(false); formValueReset(); }}
                noText={"取消"}
                close={() => { setOpenAddJumpDialog(false); formValueReset(); }}
            >
                <FormControl
                    sumbit={false}
                    theme={{
                        maxHeight: "40rem",
                        // overflowY: "scroll",// 註解後關閉滾動
                        // overflowX: "hidden",// 註解後關閉滾動
                        minWidth: "0",
                        padding: "0 1.25rem 0 0",
                        margin: "20px 0 0 0"
                    }}>
                    <FormRow>
                        <FormCardTextInput
                            label={"管理員帳號"}
                            hint={"請輸入一個有效的電子郵件帳號"}
                            value={Account}
                            onChange={Accounthandler}
                            regExpResult={AccountregExpResult}
                            placeholder={"abe_wang@gmail.com"}
                            theme={administrators.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"管理員密碼"}
                            hint={"請輸入 4 ~ 16 位半形英文或數字"}
                            value={Pass}
                            pass
                            onChange={Passhandler}
                            regExpResult={PassregExpResult}
                            placeholder={"abeWang0911"}
                            theme={administrators.passFormCardTextInput(Pass.length)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"姓名"}
                            hint={""}
                            value={Name}
                            onChange={Namehandler}
                            regExpResult={NameregExpResult}
                            placeholder={"請輸入中文姓名"}
                            theme={administrators.nameFormCardTextInput}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"手機號碼"}
                            hint={""}
                            value={Phone}
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"請輸入手機號碼"}
                            theme={administrators.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardSelector
                            label={"服務門市"}
                            hint={""}
                            placeholder={"請選擇服務門市"}
                            value={Location}
                            isSearchable
                            options={[
                                { value: '1', label: '選項1' },//isDisabled: true 
                                { value: '2', label: '選項2' },
                                { value: '3', label: '選項3' }
                            ]}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { LocationResetValue(value) }}
                            regExpResult={LocationregExpResult}
                            theme={administrators.locationFormCardTextInput}
                        ></FormCardSelector>
                        <FormCardSelector
                            label={"管理員身份"}
                            hint={""}
                            placeholder={"請選擇管理員身份"}
                            value={Role}
                            isMulti
                            isSearchable
                            options={[
                                { value: '1', label: '選項1' },//isDisabled: true 
                                { value: '2', label: '選項2' },
                                { value: '3', label: '選項3' }
                            ]}
                            onChange={(values) => { RoleResetValue(values) }}
                            regExpResult={RoleregExpResult}
                            theme={administrators.locationFormCardTextInput}
                        ></FormCardSelector>
                    </FormRow>
                    {/* <FormRow>
                        <FormCardLeftIconSelector
                            //label={"時間"}
                            //hint={""}
                            placeholder={"請選擇時間"}
                            value={Role}
                            isMulti
                            isSearchable
                            options={[
                                { value: '1', label: '選項1' },//isDisabled: true 
                                { value: '2', label: '選項2' },
                                { value: '3', label: '選項3' },
                                { value: '4', label: '選項4' },
                                { value: '5', label: '選項5' },
                                { value: '6', label: '選項6' },
                                { value: '7', label: '選項7' },
                                { value: '8', label: '選項8' },
                                { value: '9', label: '選項9' },
                            ]}
                            onChange={(values) => { RoleResetValue(values) }}
                            regExpResult={RoleregExpResult}
                            theme={administrators.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"請選擇時間"}
                            placeholder={"請選擇時間"}
                            value={Role}
                            isMulti
                            isSearchable
                            options={[
                                { value: '1', label: '選項1' },//isDisabled: true 
                                { value: '2', label: '選項2' },
                                { value: '3', label: '選項3' }
                            ]}
                            onChange={(values) => { RoleResetValue(values) }}
                            regExpResult={RoleregExpResult}
                            theme={administrators.locationFormCardTextInput}
                        ></FormCardLeftIconSelector> 
                    </FormRow>*/}
                </FormControl>
            </FormCard>}
            {/* 編輯表單卡片 */}
            {
                OpenEditJumpDialog && <FormCard
                    title={"編輯管理員帳號"}
                    yes={() => { }}
                    yesText={"新增"}
                    no={() => { setOpenEditJumpDialog(false) }}
                    noText={"取消"}
                    close={() => { setOpenEditJumpDialog(false) }}
                >
                </FormCard>
            }
        </>
    )
}