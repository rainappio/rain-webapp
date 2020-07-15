import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton, JumpDialogButton } from '../../../Components/Buttons';
import { SearchTextInput, FormCardTextInput, FormControl, FormRow, FormCardSelector, FormCardLeftIconSelector } from '../../../Components/Forms';
import { getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';

/* 
   Date   : 2020-07-15 11:16:14
   Author : Arhua Ho
   Content: 新增管理員帳號表單卡片
            可傳入props : 
                execute : execute={(page, key) => { execute(page, key) }} // 重新查詢管理員名單頁面表單內容函數
                onClose : onClose={(isOpen) => { setOpenAddJumpDialog(isOpen); ...其他動作 }} // 控制關閉新增管理員帳號表單卡片的父組件狀態
*/
export const AddCard = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { administratorsPage: { addCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入管理員中文姓名", "姓名最長為5個中文字"]); // 管理員姓名欄位
    const [Account, Accounthandler, AccountregExpResult, AccountResetValue] = useForm("", ["^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"], ["請輸入正確E-mail格式"]); // 管理員姓名欄位
    const [Pass, Passhandler, PassregExpResult, PassResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 管理員密碼欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入手機號碼", "請輸入正確手機格式"]); // 管理員手機欄位
    const [Location, Locationhandler, LocationregExpResult, LocationResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇所在門市"]); // 管理員門市欄位
    const [Role, Rolehandler, RoleregExpResult, RoleResetValue] = useSelector([], [(value) => { /*console.log(value);*/ return (value ? value.length > 0 : false) }], ["請選擇管理員身份"]); // 管理員身分欄位
    //#endregion



    //#region 查詢全部分店API
    const getAllShop = useCallback(async (key) => {
        return await fetch(`${APIUrl}api/Shops/GetList?key=`,
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
                    let shopList = PreResult.response?.map(function (item, index, array) {
                        return { value: item?.Id, label: item?.ShopName };
                    });
                    console.log(shopList)
                    setShopListData(shopList);
                    return "查詢全部分店成功"
                } else {
                    throw new Error("查詢全部分店失敗");
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

    const [executeGetAllShop, PendingGetAllShop] = useAsync(getAllShop, true);
    //#endregion

    return (
        <>
            <FormCard
                title={"新增管理員帳號"}
                yes={() => {
                    //全部通過檢核才可放行
                    (AccountregExpResult ? alertService.warn(AccountregExpResult, { autoClose: true })
                        : (PassregExpResult ? alertService.warn(PassregExpResult, { autoClose: true })
                            : (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })
                                : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                                    : (LocationregExpResult ? alertService.warn(LocationregExpResult, { autoClose: true })
                                        : (RoleregExpResult ? alertService.warn(RoleregExpResult, { autoClose: true })
                                            : props.addAdminUserExecute(Name, Account, Pass, Phone, Location, Role)
                                        )
                                    )
                                )
                            )
                        )
                    )
                }}
                yesText={"新增"}
                no={() => { props?.onClose && props.onClose(false); }}
                noText={"取消"}
                close={() => { props?.onClose && props.onClose(false); }}
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
                            theme={addCard.passFormCardTextInput(0)}
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
                            theme={addCard.passFormCardTextInput(Pass.length)}
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
                            theme={addCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"手機號碼"}
                            hint={""}
                            value={Phone}
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"請輸入手機號碼"}
                            theme={addCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardSelector
                            label={"服務門市"}
                            hint={""}
                            placeholder={"請選擇服務門市"}
                            value={Location}
                            isSearchable
                            options={ShopListData}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { LocationResetValue(value) }}
                            regExpResult={LocationregExpResult}
                            theme={addCard.locationFormCardTextInput}
                        ></FormCardSelector>
                        <FormCardSelector
                            label={"管理員身份"}
                            hint={""}
                            placeholder={"請選擇管理員身份"}
                            value={Role}
                            isMulti
                            isSearchable
                            options={[
                                { value: 1, label: '總管理員' },//isDisabled: true 
                                { value: 13, label: '分店管理員' }
                            ]}
                            onChange={(values) => { RoleResetValue(values) }}
                            regExpResult={RoleregExpResult}
                            theme={addCard.locationFormCardTextInput}
                        ></FormCardSelector>
                    </FormRow>
                </FormControl>
            </FormCard>
        </>
    )
}