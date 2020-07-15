import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { Text } from '../../../Components/Texts';
import { EasyButton, JumpDialogButton } from '../../../Components/Buttons';
import { SearchTextInput, FormCardTextInput, FormControl, FormRow, FormCardSelector, FormCardLeftIconSelector } from '../../../Components/Forms';
import { getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';
import { cityAndCountiesLite, Counties, times } from '../../../Mappings/Mappings'

/* 
   Date   : 2020-07-15 11:16:14
   Author : Arhua Ho
   Content: 新增門市帳號表單卡片
            可傳入props : 
                execute : execute={(page, key) => { execute(page, key) }} // 重新查詢門市名單頁面表單內容函數
                onClose : onClose={(isOpen) => { setOpenAddJumpDialog(isOpen); ...其他動作 }} // 控制關閉新增門市帳號表單卡片的父組件狀態
*/
export const EditCard = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { administratorsPage: { editCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    const [Id, Idhandler, IdregExpResult, IdResetValue] = useForm("", [""], [""]); // Id欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入門市中文姓名", "姓名最長為5個中文字"]); // 門市姓名欄位
    const [ContactName, ContactNamehandler, ContactNameregExpResult, ContactNameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入門市中文姓名", "姓名最長為5個中文字"]); // 門市姓名欄位
    const [Pass, Passhandler, PassregExpResult, PassResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入手機號碼", "請輸入正確手機格式"]); // 門市手機欄位
    const [County, Countyhandler, CountyregExpResult, CountyResetValue] = useSelector([], [(value) => { console.log(value); return (value?.value ?? "").toString()?.length > 0 }], ["請選擇所在門市"]); // 門市門市欄位
    const [District, Districthandler, DistrictregExpResult, DistrictResetValue] = useSelector([], [(value) => { console.log(value); return (value?.value ?? "").toString()?.length > 0 }], ["請選擇所在門市"]); // 門市門市欄位
    const [Addr, Addrhandler, AddrregExpResult, AddrResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$"], ["請輸入地址"]); // 門市手機欄位
    const [lat, lathandler, latregExpResult, latResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [lon, lonhandler, lonregExpResult, lonResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [Role, Rolehandler, RoleregExpResult, RoleResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位

    const [MonStart, MonStarthandler, MonStartregExpResult, MonStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [MonEnd, MonEndhandler, MonEndregExpResult, MonEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [TueStart, TueStarthandler, TueStartregExpResult, TueStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [TueEnd, TueEndhandler, TueEndregExpResult, TueEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [WenStart, WenStarthandler, WenStartregExpResult, WenStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [WenEnd, WenEndhandler, WenEndregExpResult, WenEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [ThuStart, ThuStarthandler, ThuStartregExpResult, ThuStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [ThuEnd, ThuEndhandler, ThuEndregExpResult, ThuEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [FriStart, FriStarthandler, FriStartregExpResult, FriStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [FriEnd, FriEndhandler, FriEndregExpResult, FriEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [SatStart, SatStarthandler, SatStartregExpResult, SatStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [SatEnd, SatEndhandler, SatEndregExpResult, SatEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [SunStart, SunStarthandler, SunStartregExpResult, SunStartResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位
    const [SunEnd, SunEndhandler, SunEndregExpResult, SunEndResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位

    const [rowData, setrowData] = useState({});//修改表單的rowItem
    //#endregion

    //#region 重置表單欄位的State值
    const formValueReset = (rowData) => {
        IdResetValue(rowData?.Id);
        NameResetValue(rowData?.ShopName);//門市名稱
        ContactNameResetValue(rowData?.ContactName);//聯絡人姓名
        PhoneResetValue(rowData?.ShopTel);//門市電話
        //門市地址
        CountyResetValue({ value: rowData?.County, label: rowData?.County });
        DistrictResetValue({ value: rowData?.District, label: rowData?.District });
        AddrResetValue(rowData?.Addr);
        //門市地址
        latResetValue(rowData?.lat);
        lonResetValue(rowData?.lon);
        console.log(rowData?.ShopDate.split(','), rowData?.ShopDate?.split(',')[0]?.split('-'));
        MonStartResetValue({ value: rowData?.ShopDate?.split(',')[0]?.split('-')[0], label: rowData?.ShopDate?.split(',')[0]?.split('-')[0] });
        MonEndResetValue({ value: rowData?.ShopDate?.split(',')[0]?.split('-')[1], label: rowData?.ShopDate?.split(',')[0]?.split('-')[1] });


    }
    //#endregion

    //#region 修改用戶API
    const putAdminShops = useCallback(async (rowData, name, phone, County, role) => {
        formValueReset();
        props?.onClose && props.onClose(false);

        return await fetch(`${APIUrl}api/Shops/Put`,
            {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
                },
                body: JSON.stringify({
                    ...rowData,
                    age: 0,
                    uStatus: 0,
                    sex: 0,
                    tdIsDelete: false,
                    uUpdateTime: new Date(),
                    name: name,
                    uRealName: name,
                    //uLoginName: account,
                    //uLoginPWD: pass,
                    phone: phone,
                    //ShopIds: location?.value,
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
                    alertService.normal("修改門市成功", { autoClose: true });
                    return "修改門市成功"
                } else {
                    alertService.warn(PreResult.msg, { autoClose: true });
                    throw new Error("修改門市失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {
                props?.execute && props.execute(1);
            });

        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [PutAdminShopsExecute, PutAdminShopsPending] = useAsync(putAdminShops, false);
    //#endregion

    //#region 查詢對應ID的門市資料、全部分店資料
    const getAdministratorsById = useCallback(async (id = props.editWhoId, editAutoFill = props.editAutoFill) => {
        //#region 透過後端回傳值，返回符合格式的選項陣列
        let roleList = [
            { value: 1, label: '總門市' },//isDisabled: true 
            { value: 13, label: '分店門市' }
        ]
        const getRIDs = (roleListData) => {
            let res = [];
            roleListData.forEach(element => {
                res.push(...roleList.filter((r) => (r.value === element)))
            });
            return res;
        }
        let shopList = [];
        //#endregion
        //#region 全部分店API
        await fetch(`${APIUrl}api/Shops/GetList?key=`,
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
                    shopList = PreResult.response?.map(function (item, index, array) {
                        return { value: item?.Id, label: item?.ShopName };
                    });
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
        //#endregion
        //#region 透過後端回傳值，返回符合格式的選項陣列
        const getShopIds = (ShopIds) => {
            return shopList.filter((r) => (r.value.toString() === ShopIds))
        }
        //#endregion
        //#region 查詢對應ID的門市資料
        return () => {

            let rowData = { ...editAutoFill };
            formValueReset(rowData);
            setrowData(rowData);
            return "查詢全部分店成功"
        }
        //#endregion
        // 這裡要接著打refresh 延長Token存活期

    }, [APIUrl, history])

    const [ExecuteGetAdministratorsById, PendingGetAdministratorsById] = useAsync(getAdministratorsById, true);
    //#endregion

    return (
        <>
            <FormCard
                title={"修改門市資訊"}
                yes={() => {
                    //全部通過檢核才可放行

                    (PassregExpResult ? alertService.warn(PassregExpResult, { autoClose: true })
                        : (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })
                            : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                                : (CountyregExpResult ? alertService.warn(CountyregExpResult, { autoClose: true })
                                    : (RoleregExpResult ? alertService.warn(RoleregExpResult, { autoClose: true })
                                        : PutAdminShopsExecute(rowData, Name, Phone, County, Role)
                                    )
                                )
                            )
                        )
                    )

                }}
                yesText={"儲存"}
                no={() => { props?.onClose && props.onClose(false); formValueReset(); }}
                noText={"放棄"}
                close={() => { props?.onClose && props.onClose(false); formValueReset(); }}
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
                            label={"聯絡人姓名"}
                            //hint={"請輸入店長姓名"}
                            value={ContactName}
                            onChange={ContactNamehandler}
                            regExpResult={ContactNameregExpResult}
                            placeholder={"請輸入店長姓名"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"門市電話"}
                            hint={""}
                            value={Phone}
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"請輸入門市電話"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"門市名稱"}
                            hint={""}
                            value={Name}
                            onChange={Namehandler}
                            regExpResult={NameregExpResult}
                            placeholder={"請輸入門市名稱"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <BasicContainer>
                        <Text style={{
                            color: "#444",
                            fontSize: "1rem",
                            fontWeight: 700,
                            userSelect: "none"
                        }} >
                            門市地址
                        </Text>
                    </BasicContainer>
                    <FormRow>
                        <FormCardSelector
                            //label={"門市地址"}
                            //hint={""}
                            placeholder={"選擇縣市"}
                            value={County}
                            isSearchable
                            options={Counties.counties.map((item) => { return { value: item, label: item } })}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { CountyResetValue(value); console.log(value); DistrictResetValue('') }}
                            regExpResult={CountyregExpResult}
                            theme={editCard.locationFormCardTextInput}
                        ></FormCardSelector>
                        <FormCardSelector
                            //label={""}
                            //hint={""}
                            placeholder={"選擇行政區"}
                            value={District}

                            isSearchable
                            options={cityAndCountiesLite[County.value]}
                            onChange={(values) => { DistrictResetValue(values) }}
                            regExpResult={DistrictregExpResult}
                            theme={editCard.locationFormCardTextInput}
                        ></FormCardSelector>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            //label={""}
                            hint={"詳細地址請由道路開始填寫。"}
                            value={Addr}
                            onChange={Addrhandler}
                            regExpResult={AddrregExpResult}
                            placeholder={"請輸入店長姓名"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"門市經度"}
                            hint={"選填"}
                            value={lat}
                            onChange={lathandler}
                            regExpResult={latregExpResult}
                            placeholder={"門市地理位置之經度"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"門市緯度"}
                            hint={""}
                            value={lon}
                            onChange={lonhandler}
                            regExpResult={lonregExpResult}
                            placeholder={"門市地理位置之緯度"}
                            theme={editCard.nameFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardLeftIconSelector
                            label={"營業時間"}
                            //hint={""}
                            placeholder={"請選擇時間"}
                            value={MonStart}
                            //isMulti
                            isSearchable
                            options={times?.filter((item) => { return item.value < MonEnd.value })}
                            onChange={(values) => { MonStartResetValue(values) }}
                            regExpResult={MonStartregExpResult}
                            theme={editCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <FormCardLeftIconSelector
                            label={""}
                            //hint={"請選擇時間"}
                            placeholder={"請選擇時間"}
                            value={MonEnd}
                            //isMulti
                            isSearchable
                            options={times?.filter((item) => { return item.value > MonStart.value })}
                            onChange={(values) => { MonEndResetValue(values) }}
                            regExpResult={MonEndregExpResult}
                            theme={editCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                </FormControl>
            </FormCard>
        </>
    )
}