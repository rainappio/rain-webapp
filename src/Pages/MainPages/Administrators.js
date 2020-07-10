import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer, SubContainer } from '../../Components/Containers';
import { PageTitle } from '../../Components/PageTitle';
import { EasyButton } from '../../Components/Buttons';
import AddIcon from '@material-ui/icons/Add';
import { SearchTextInput, FormControl, FormRow } from '../../Components/Forms';
import { TableBasic } from '../../Components/Tables';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { useForm } from '../../SelfHooks/useForm'
import { useWindowSize } from '../../SelfHooks/useWindowSize'
import { Text } from '../../Components/Texts'
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CardTable } from '../../Components/CardTable';

export const Administrators = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { administrators } } = Theme;
    let history = useHistory();
    const [TableData, setTableData] = useState([]);

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

    return (
        <>
            {/* 寬度大於等於768時渲染的組件 */}
            {width >= 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>管理員名單</PageTitle>
                <FormControl theme={{}}>
                    <FormRow theme={administrators.addAndSearchFormRow}>
                        <SubContainer theme={administrators.addButtonSubContainer}>
                            <EasyButton
                                onClick={() => { console.log("sadf") }}
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
                                    <Text theme={{
                                        color: "#444",
                                        fontWeight: "550",
                                        cursor: "default",
                                        fontSize: "1rem"
                                    }}>{item}</Text>))
                            },
                            "phone": {
                                // width: "45rem",
                                width: "20%",
                                order: true,// 是否開啟排序，預設為不開啟
                                render: (item, id) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontWeight: "550",
                                        cursor: "default",
                                        fontSize: "1rem"
                                    }}>{item}</Text>))
                            },
                            "uCreateTime": {
                                // width: "20rem",
                                width: "20%",
                                order: true,
                                render: (item, id) => ((item &&
                                    <Text theme={{
                                        color: "#444",
                                        fontWeight: "550",
                                        cursor: "default",
                                        fontSize: "1rem"
                                    }}>{item.split("T")[0]}</Text>))
                            },
                            "controll": {
                                // width: "20rem",
                                width: "40%",
                                //order: true,
                                render: (item, id, rowItem) => {
                                    return (
                                        <BasicContainer theme={{ textAlign: "right" }}>
                                            {[
                                                <CreateIcon key={`${item}1`} style={{ cursor: "pointer", color: "#964f19", margin: "0 1rem 0 0" }} />,
                                                <DeleteForeverIcon key={`${item}2`} style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }} />
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
            {width < 768 && <BasicContainer theme={administrators.basicContainer}>
                <FormControl theme={{}}>
                    <FormRow theme={administrators.addAndSearchFormRowLessThan768}>
                        <SearchTextInput
                            value={SearchWord}
                            onChange={SearchWordhandler}
                            regExpResult={SearchWordregExpResult}
                            placeholder={"搜尋姓名、電話、Email"}
                            theme={administrators.searchInput}
                        />
                        <SubContainer theme={administrators.addButtonSubContainerLessThan768}>
                            <EasyButton
                                onClick={() => { console.log("sadf") }}
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
                                                <CreateIcon key={`${item}1`} style={{ cursor: "pointer", color: "#964f19", margin: "0 1rem 0 0" }} />,
                                                <DeleteForeverIcon key={`${item}2`} style={{ cursor: "pointer", color: "#d25959", margin: "0 1rem 0 0" }} />
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