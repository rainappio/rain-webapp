import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { DispatchBoardPageTitleAddSearch } from './DispatchBoardPageTitleAddSearch';
import { DispatchBoardTable } from './DispatchBoardTable';
import { useAsync } from '../../../SelfHooks/useAsync';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { dateTrans } from '../../../Handlers/DateHandler';

export const DispatchBoard = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchBoardPage: { dispatchBoard } } } = Theme;

    let history = useHistory();
    const [TableData, setTableData] = useState([]);


    //#region 查詢列表API
    const getRoleByPageOrkey = useCallback(async (startDate = dateTrans(new Date()), endDate = dateTrans(new Date())) => {

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
            <BasicContainer theme={dispatchBoard.basicContainer}>
                <DispatchBoardPageTitleAddSearch execute={execute} />
                {/* 總覽時間表格 */}
                <BasicContainer theme={{ padding: "0 2rem 0 2.5rem" }}>
                    <DispatchBoardTable data={TableData} />
                </BasicContainer>
            </BasicContainer>
        </>
    )
}