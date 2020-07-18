import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { ReservationListPageTitleAddSearch } from './ReservationListPageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'

export const ReservationList = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationList } } } = Theme;

    const [TableData, setTableData] = useState([]);
    const [SearchWord, setSearchWord] = useState(""); // 儲存關鍵字，供翻頁時的查詢用

    let history = useHistory();
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
                    //setTableData(PreResult.response);
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
    const [OpenExportJumpDialog, setOpenExportJumpDialog] = useState(false); // 開啟刪除彈窗

    return (
        <>
            {width > 768 && <BasicContainer theme={reservationList.basicContainer}>
                <ReservationListPageTitleAddSearch
                    execute={execute}
                    setSearchWord={setSearchWord}
                    switch={[OpenExportJumpDialog, (isOpen) => { setOpenExportJumpDialog(isOpen) }]}
                />
            </BasicContainer>}
            {width <= 768 && <BasicContainer theme={reservationList.basicContainer}>
                <ReservationListPageTitleAddSearch tableBasicContainerLessThan768
                    execute={execute}
                    setSearchWord={setSearchWord}
                    switch={[OpenExportJumpDialog, (isOpen) => { setOpenExportJumpDialog(isOpen) }]}
                />
            </BasicContainer>
            }
        </>
    )
}