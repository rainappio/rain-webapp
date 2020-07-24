import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer, SubContainer } from '../../../Components/Containers';
import { PageTitle } from '../../../Components/PageTitle';
import { EasyButton, JumpDialogButton } from '../../../Components/Buttons';
import { Text } from '../../../Components/Texts';
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
export const AddCard = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { administratorsPage: { editCard } }, pages: { expertsPage: { expertsAddCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    const [Id, Idhandler, IdregExpResult, IdResetValue] = useForm("", [""], [""]); // Id欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^.{1,}$"], ["請輸入門市名稱"]); // 門市姓名欄位
    const [ContactName, ContactNamehandler, ContactNameregExpResult, ContactNameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入店長中文姓名", "姓名最長為5個中文字"]); // 門市姓名欄位
    const [Pass, Passhandler, PassregExpResult, PassResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$"], ["請輸入門市電話"]); // 門市手機欄位
    const [County, Countyhandler, CountyregExpResult, CountyResetValue] = useSelector([], [(value) => { /*console.log(value);*/ return (value?.value ?? "").toString()?.length > 0 }], ["請選擇門市所在縣市"]); // 門市門市欄位
    const [District, Districthandler, DistrictregExpResult, DistrictResetValue] = useSelector([], [(value) => { /*console.log(value);*/ return (value?.value ?? "").toString()?.length > 0 }], ["請選擇門市所在行政區"]); // 門市門市欄位
    const [Addr, Addrhandler, AddrregExpResult, AddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入地址"]); // 門市手機欄位
    const [lat, lathandler, latregExpResult, latResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [lon, lonhandler, lonregExpResult, lonResetValue] = useForm("", ["^.{1,}$"], ["請輸入正確密碼格式"]); // 門市密碼欄位
    const [Role, Rolehandler, RoleregExpResult, RoleResetValue] = useSelector([], [(value) => (value.length > 0)], ["請選擇門市身份"]); // 門市身分欄位

    const [MonLeft, MonLefthandler, MonLeftregExpResult, MonLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週一開始工作時間"]);  // 週一左邊時間欄位
    const [MonRight, MonRighthandler, MonRightregExpResult, MonRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週一結束工作時間"]);  // 週一右邊時間欄位
    const [TueLeft, TueLefthandler, TueLeftregExpResult, TueLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週二開始工作時間"]);  // 週二左邊時間欄位
    const [TueRight, TueRighthandler, TueRightregExpResult, TueRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週二結束工作時間"]);  // 週二右邊時間欄位
    const [WenLeft, WenLefthandler, WenLeftregExpResult, WenLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週三開始工作時間"]);  // 週三左邊時間欄位
    const [WenRight, WenRighthandler, WenRightregExpResult, WenRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週三結束工作時間"]);  // 週三右邊時間欄位
    const [ThuLeft, ThuLefthandler, ThuLeftregExpResult, ThuLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週四開始工作時間"]);  // 週四左邊時間欄位
    const [ThuRight, ThuRighthandler, ThuRightregExpResult, ThuRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週四結束工作時間"]);  // 週四右邊時間欄位
    const [FriLeft, FriLefthandler, FriLeftregExpResult, FriLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週五開始工作時間"]);  // 週五左邊時間欄位
    const [FriRight, FriRighthandler, FriRightregExpResult, FriRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週五結束工作時間"]);  // 週五右邊時間欄位
    const [SatLeft, SatLefthandler, SatLeftregExpResult, SatLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週六開始工作時間"]);  // 週六左邊時間欄位
    const [SatRight, SatRighthandler, SatRightregExpResult, SatRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週六結束工作時間"]);  // 週六右邊時間欄位
    const [SunLeft, SunLefthandler, SunLeftregExpResult, SunLeftResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週日開始工作時間"]);  // 週日左邊時間欄位
    const [SunRight, SunRighthandler, SunRightregExpResult, SunRightResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇週日結束工作時間"]);  // 週日右邊時間欄位

    const [rowData, setrowData] = useState({});//修改表單的rowItem
    //#endregion

    //#region 時間選單連動
    const getTimeList = (isLeft, nowTheirSelected) => {
        if (!!nowTheirSelected?.value) {
            if (isLeft) {
                return times.filter((t) => (parseInt(t.value?.replace(":", "")) < parseInt(nowTheirSelected.value?.replace(":", ""))));
            } else {
                return times.filter((t) => (parseInt(t.value?.replace(":", "")) > parseInt(nowTheirSelected.value?.replace(":", ""))));
            }
        } else {
            // nowTheirSelected===""
            return times;
        }
    }
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
                    //console.log(shopList)
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
                title={"修改門市資訊"}
                yes={() => {
                    //全部通過檢核才可放行

                    (ContactNameregExpResult ? alertService.warn(ContactNameregExpResult, { autoClose: true })
                        : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                            : (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })
                                : (CountyregExpResult ? alertService.warn(CountyregExpResult, { autoClose: true })
                                    : (DistrictregExpResult ? alertService.warn(DistrictregExpResult, { autoClose: true })
                                        : (AddrregExpResult ? alertService.warn(AddrregExpResult, { autoClose: true })
                                            : props.addAdminUserExecute(ContactName, Phone, Name, County, District, Addr, lat, lon, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight)
                                        )
                                    )
                                )
                            )
                        )
                    )

                }}
                yesText={"儲存"}
                no={() => { props?.onClose && props.onClose(false); }}
                noText={"放棄"}
                close={() => { props?.onClose && props.onClose(false); }}
                theme={expertsAddCard.addformCard}
            >
                <FormControl
                    sumbit={false}
                    theme={{
                        maxHeight: "calc( 100% - 3.25rem )",
                        overflowY: "scroll",// 註解後關閉滾動
                        overflowX: "hidden",// 註解後關閉滾動
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
                            options={Counties}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { CountyResetValue(value); /*console.log(value);*/ DistrictResetValue('') }}
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
                            placeholder={"忠孝東路四段100號3樓"}
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
                        <SubContainer theme={expertsAddCard.workTimeSubContainer}>
                            <Text theme={expertsAddCard.workTimeText}>工作時間</Text>
                        </SubContainer>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週一</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={MonLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, MonRight)}
                            onChange={(values) => { MonLeftResetValue(values) }}
                            regExpResult={MonLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={MonRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, MonLeft)}
                            onChange={(values) => { MonRightResetValue(values) }}
                            regExpResult={MonRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週二</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={TueLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, TueRight)}
                            onChange={(values) => { TueLeftResetValue(values) }}
                            regExpResult={TueLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={TueRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, TueLeft)}
                            onChange={(values) => { TueRightResetValue(values) }}
                            regExpResult={TueRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週三</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={WenLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, WenRight)}
                            onChange={(values) => { WenLeftResetValue(values) }}
                            regExpResult={WenLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={WenRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, WenLeft)}
                            onChange={(values) => { WenRightResetValue(values) }}
                            regExpResult={WenRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週四</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={ThuLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, ThuRight)}
                            onChange={(values) => { ThuLeftResetValue(values) }}
                            regExpResult={ThuLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={ThuRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, ThuLeft)}
                            onChange={(values) => { ThuRightResetValue(values) }}
                            regExpResult={ThuRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週五</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={FriLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, FriRight)}
                            onChange={(values) => { FriLeftResetValue(values) }}
                            regExpResult={FriLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={FriRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, FriLeft)}
                            onChange={(values) => { FriRightResetValue(values) }}
                            regExpResult={FriRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週六</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={SatLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, SatRight)}
                            onChange={(values) => { SatLeftResetValue(values) }}
                            regExpResult={SatLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={SatRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, SatLeft)}
                            onChange={(values) => { SatRightResetValue(values) }}
                            regExpResult={SatRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.daySubContainer}>
                            <Text theme={expertsAddCard.dayText}>週日</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={SunLeft}
                            isSearchable
                            isClearable
                            options={getTimeList(true, SunRight)}
                            onChange={(values) => { SunLeftResetValue(values) }}
                            regExpResult={SunLeftregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                        <SubContainer theme={expertsAddCard.splitSubContainer}>
                            <Text theme={expertsAddCard.dayText}>~</Text>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            //label={""}
                            //hint={"開始工作時間"}
                            placeholder={"開始工作時間"}
                            value={SunRight}
                            isSearchable
                            isClearable
                            options={getTimeList(false, SunLeft)}
                            onChange={(values) => { SunRightResetValue(values) }}
                            regExpResult={SunRightregExpResult}
                            theme={expertsAddCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>
                </FormControl>
            </FormCard>
        </>
    )
}