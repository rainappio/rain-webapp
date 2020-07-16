import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Context } from '../../../Store/store'
import { FormCardTextInput, FormControl, FormRow, FormCardSelector, CityCheckBoxGroup, FormCardLeftIconSelector } from '../../../Components/Forms';
import { getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';
import { month, getDayByYearAndMonth, YearFrom1930to, Counties, cityAndCountiesLite, times, day, cityAndCounties } from '../../../Mappings/Mappings';
import { SubContainer } from '../../../Components/Containers';
import { Text } from '../../../Components/Texts';

//#region 時間選單連動
const getTimeList = (isLeft, nowTheirSelected) => {
    if (!!nowTheirSelected?.value) {
        if (isLeft) {
            return times.filter((t) => (parseInt(t.value.replace(":", "")) < parseInt(nowTheirSelected.value.replace(":", ""))));
        } else {
            return times.filter((t) => (parseInt(t.value.replace(":", "")) > parseInt(nowTheirSelected.value.replace(":", ""))));
        }
    } else {
        // nowTheirSelected===""
        return times;
    }
}
//#endregion

/* 
   Date   : 2020-07-15 11:16:14
   Author : Arhua Ho
   Content: 新增足健師帳號表單卡片
            可傳入props : 
                execute : execute={(page, key) => { execute(page, key) }} // 重新查詢管理員名單頁面表單內容函數
                onClose : onClose={(isOpen) => { setOpenAddJumpDialog(isOpen); ...其他動作 }} // 控制關閉新增管理員帳號表單卡片的父組件狀態
*/
export const ExpertsEditCard = (props) => {
    console.log("row", props.editAutoFill);

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { expertsPage: { expertsAddCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    const [MasterNo, MasterNohandler, MasterNoregExpResult, MasterNoResetValue] = useForm("", ["^.{1,}$", "^[0-9]{1,}$", "^.{1,999}$"], ["請輸入工號", "工號限使用數字", "最長為999個數字"]); //足健師工號欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入足健師中文姓名", "姓名最長為5個中文字"]); // 足健師姓名欄位
    const [Sex, Sexhandler, SexregExpResult, SexResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇性別"]); // 足健師性別欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入手機號碼", "請輸入正確手機格式"]); // 管理員手機欄位
    const [Email, Emailhandler, EmailregExpResult, EmailResetValue] = useForm("", ["^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"], ["請輸入正確E-mail格式"]); // Email欄位
    const [BirthYear, BirthYearhandler, BirthYearregExpResult, BirthYearResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日西元年"]); // 生日西元年欄位
    const [BirthMonth, BirthMonthhandler, BirthMonthregExpResult, BirthMonthResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日月份"]);// 生日月份欄位
    const [BirthDay, BirthDayhandler, BirthDayregExpResult, BirthDayResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日日期"]); // 生日日期欄位
    const [County, Countyhandler, CountyregExpResult, CountyResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇縣市"]); // 直轄地區欄位
    const [District, Districthandler, DistrictregExpResult, DistrictResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇行政區"]); // 直轄地區欄位
    const [Addr, Addrhandler, AddrregExpResult, AddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入詳細地址"]); // 地址欄位
    const [NowServiceAddr, NowServiceAddrhandler, NowServiceAddrregExpResult, NowServiceAddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入現職單位"]); // 現職單位欄位
    const [ServiceArea, ServiceAreahandler, ServiceArearegExpResult, ServiceAreaResetValue] = useSelector("", [(value) => { /*console.log(value);*/ return (value ? value.length > 0 : false) }], ["請勾選服務地區"]); // 服務地區勾選欄位
    const [MonLeft, MonLefthandler, MonLeftregExpResult, MonLeftResetValue] = useSelector("", [], []);  // 週一左邊時間欄位  "請選擇週一開始工作時間"
    const [MonRight, MonRighthandler, MonRightregExpResult, MonRightResetValue] = useSelector("", [], []);  // 週一右邊時間欄位 "請選擇週一結束工作時間"
    const [TueLeft, TueLefthandler, TueLeftregExpResult, TueLeftResetValue] = useSelector("", [], []);  // 週二左邊時間欄位 "請選擇週二開始工作時間"
    const [TueRight, TueRighthandler, TueRightregExpResult, TueRightResetValue] = useSelector("", [], []);  // 週二右邊時間欄位 "請選擇週二結束工作時間"
    const [WenLeft, WenLefthandler, WenLeftregExpResult, WenLeftResetValue] = useSelector("", [], []);  // 週三左邊時間欄位 "請選擇週三開始工作時間"
    const [WenRight, WenRighthandler, WenRightregExpResult, WenRightResetValue] = useSelector("", [], []);  // 週三右邊時間欄位 "請選擇週三結束工作時間"
    const [ThuLeft, ThuLefthandler, ThuLeftregExpResult, ThuLeftResetValue] = useSelector("", [], []);  // 週四左邊時間欄位 "請選擇週四開始工作時間"
    const [ThuRight, ThuRighthandler, ThuRightregExpResult, ThuRightResetValue] = useSelector("", [], []);  // 週四右邊時間欄位 "請選擇週四結束工作時間"
    const [FriLeft, FriLefthandler, FriLeftregExpResult, FriLeftResetValue] = useSelector("", [], []);  // 週五左邊時間欄位 "請選擇週五開始工作時間"
    const [FriRight, FriRighthandler, FriRightregExpResult, FriRightResetValue] = useSelector("", [], []);  // 週五右邊時間欄位 "請選擇週五結束工作時間"
    const [SatLeft, SatLefthandler, SatLeftregExpResult, SatLeftResetValue] = useSelector("", [], []);  // 週六左邊時間欄位 "請選擇週六開始工作時間"
    const [SatRight, SatRighthandler, SatRightregExpResult, SatRightResetValue] = useSelector("", [], []);  // 週六右邊時間欄位 "請選擇週六結束工作時間"
    const [SunLeft, SunLefthandler, SunLeftregExpResult, SunLeftResetValue] = useSelector("", [], []);  // 週日左邊時間欄位 "請選擇週日開始工作時間"
    const [SunRight, SunRighthandler, SunRightregExpResult, SunRightResetValue] = useSelector("", [], []);  // 週日右邊時間欄位 "請選擇週日結束工作時間"

    useEffect(() => {
        let date = props?.editAutoFill?.mBirthDay ? new Date(props?.editAutoFill?.mBirthDay) : new Date();
        MasterNoResetValue(props?.editAutoFill?.MasterNo ?? '');
        NameResetValue(props?.editAutoFill?.mRealName ?? '');
        PhoneResetValue(props?.editAutoFill?.mTel ?? '');
        EmailResetValue(props?.editAutoFill?.mEmail ?? '');
        BirthYearResetValue({ value: date.getFullYear(), label: `西元 ${date.getFullYear()} 年` });
        BirthMonthResetValue(month[date.getMonth()]);
        BirthDayResetValue(day[date.getDate() - 1]);
        CountyResetValue({ value: props?.editAutoFill?.CommCounty, label: props?.editAutoFill?.CommCounty });
        DistrictResetValue({ value: props?.editAutoFill?.CommDistrict, label: props?.editAutoFill?.CommDistrict });
        AddrResetValue(props?.editAutoFill?.CommAddr ?? '');
        NowServiceAddrResetValue(props?.editAutoFill?.NowServiceAddr ?? '');
        ServiceAreaResetValue(props?.editAutoFill?.ServiceArea?.split(',')?.map((item) => { return { value: item, label: item.slice(3) } }));
        //console.log(props?.editAutoFill?.ServiceArea?.split(',')?.map((item) => { return { value: item, label: item.slice(3) } }));
        MonLeftResetValue({ value: props?.editAutoFill?.MondayService?.split('-')[0], label: props?.editAutoFill?.MondayService?.split('-')[0] });
        MonRightResetValue({ value: props?.editAutoFill?.MondayService?.split('-')[1], label: props?.editAutoFill?.MondayService?.split('-')[1] });
        TueLeftResetValue({ value: props?.editAutoFill?.TuesdayService?.split('-')[0], label: props?.editAutoFill?.TuesdayService?.split('-')[0] });
        TueRightResetValue({ value: props?.editAutoFill?.TuesdayService?.split('-')[1], label: props?.editAutoFill?.TuesdayService?.split('-')[1] });
        WenLeftResetValue({ value: props?.editAutoFill?.WednesdayService?.split('-')[0], label: props?.editAutoFill?.WednesdayService?.split('-')[0] });
        WenRightResetValue({ value: props?.editAutoFill?.WednesdayService?.split('-')[1], label: props?.editAutoFill?.WednesdayService?.split('-')[1] });
        ThuLeftResetValue({ value: props?.editAutoFill?.ThursdayService?.split('-')[0], label: props?.editAutoFill?.ThursdayService?.split('-')[0] });
        ThuRightResetValue({ value: props?.editAutoFill?.ThursdayService?.split('-')[1], label: props?.editAutoFill?.ThursdayService?.split('-')[1] });
        FriLeftResetValue({ value: props?.editAutoFill?.FridayService?.split('-')[0], label: props?.editAutoFill?.FridayService?.split('-')[0] });
        FriRightResetValue({ value: props?.editAutoFill?.FridayService?.split('-')[1], label: props?.editAutoFill?.FridayService?.split('-')[1] });
        SatLeftResetValue({ value: props?.editAutoFill?.SaturdayService?.split('-')[0], label: props?.editAutoFill?.SaturdayService?.split('-')[0] });
        SatRightResetValue({ value: props?.editAutoFill?.SaturdayService?.split('-')[1], label: props?.editAutoFill?.SaturdayService?.split('-')[1] });
        SunLeftResetValue({ value: props?.editAutoFill?.SundayService?.split('-')[0], label: props?.editAutoFill?.SundayService?.split('-')[0] });
        SunRightResetValue({ value: props?.editAutoFill?.SundayService?.split('-')[1], label: props?.editAutoFill?.SundayService?.split('-')[1] });

    }, [])
    //#endregion
    // CommAddr: "我說"
    // CommCounty: "臺北市"
    // CommDistrict: "大同區"
    // CreateTime: "2020-07-15T10:26:41.553Z"
    // DeviceId: ""
    // FridayService: "13,14"
    // Id: 0
    // IsDeleted: false
    // MasterNo: "0122"
    // MondayService: "12,13"
    // NowServiceAddr: "拉拉拉"
    // Remark: "0"
    // SaturdayService: "13,14,15,16,17,18,19,20,21,22"
    // ServiceArea: "臺北市中正區,臺北市大同區,新北市新莊區,新北市泰山區"
    // SundayService: "10,11,12,13,14,15,16,17,18,19,20,21"
    // ThursdayService: "11,12"
    // TuesdayService: "11,12"
    // WednesdayService: "12,13,14"
    // mBirthDay: "1931-02-02"
    // mEmail: "sdfsdf@ashdf.cas"
    // mLoginName: "0122"
    // mLoginPWD: "19310202"
    // mRealName: "我"
    // mTel: "0985445211"

    //API標準
    // "mLoginName": "string",
    // "mLoginPWD": "string",
    // "MasterNo": "string",
    // "DeviceId": "string",
    // "mRealName": "string",
    // "mBirthDay": "2020-07-15T10:32:51.556Z",
    // "mTel": "string",
    // "mSex": 0,
    // "mEmail": "string",
    // "NowServiceAddr": "string",
    // "CommCounty": "string",
    // "CommDistrict": "string",
    // "CommAddr": "string",
    // "ServiceArea": "string",
    // "MondayService": "string",
    // "TuesdayService": "string",
    // "WednesdayService": "string",
    // "ThursdayService": "string",
    // "FridayService": "string",
    // "SaturdayService": "string",
    // "SundayService": "string",
    // "Remark": "string",
    // "IsDeleted": true,
    // "CreateId": 0,
    // "CreateBy": "string",
    // "CreateTime": "2020-07-15T10:32:51.556Z",
    // "ModifyId": 0,
    // "ModifyBy": "string",
    // "ModifyTime": "2020-07-15T10:32:51.556Z",
    // "CheckCode": "string",
    // "ExpiredDate": "2020-07-15T10:32:51.556Z",
    // "Id": 0

    return (
        <>
            <FormCard
                title={"修改足健師帳號"}
                yes={() => {
                    //全部通過檢核才可放行
                    (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })
                        : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                            : (EmailregExpResult ? alertService.warn(EmailregExpResult, { autoClose: true })
                                : (BirthYearregExpResult ? alertService.warn(BirthYearregExpResult, { autoClose: true })
                                    : (BirthMonthregExpResult ? alertService.warn(BirthMonthregExpResult, { autoClose: true })
                                        : (BirthDayregExpResult ? alertService.warn(BirthDayregExpResult, { autoClose: true })
                                            : (CountyregExpResult ? alertService.warn(CountyregExpResult, { autoClose: true })
                                                : (DistrictregExpResult ? alertService.warn(DistrictregExpResult, { autoClose: true })
                                                    : (AddrregExpResult ? alertService.warn(AddrregExpResult, { autoClose: true })
                                                        : (NowServiceAddrregExpResult ? alertService.warn(NowServiceAddrregExpResult, { autoClose: true })
                                                            : (ServiceArearegExpResult ? alertService.warn(ServiceArearegExpResult, { autoClose: true })
                                                                : props.editAdminUserExecute(props.editAutoFill, Name, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr, NowServiceAddr, ServiceArea, MonLeft, MonRight, TueLeft, TueRight, WenLeft, WenRight, ThuLeft, ThuRight, FriLeft, FriRight, SatLeft, SatRight, SunLeft, SunRight)
                                                            )
                                                        )
                                                    )
                                                )
                                            )
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
                            label={"姓名"}
                            hint={""}
                            value={Name}
                            onChange={Namehandler}
                            regExpResult={NameregExpResult}
                            placeholder={"請在此輸入中文姓名"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>

                    </FormRow>
                    <FormRow>

                        <FormCardTextInput
                            label={"登入帳號"}
                            hint={""}
                            value={MasterNo}
                            disabled
                            onChange={MasterNohandler}
                            regExpResult={MasterNoregExpResult}
                            placeholder={"請在此輸入工號(數字)"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>

                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"聯絡電話"}
                            hint={""}
                            value={Phone}
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"0966888168"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"電子信箱 Email"}
                            hint={""}
                            value={Email}
                            onChange={Emailhandler}
                            regExpResult={EmailregExpResult}
                            placeholder={"aso_service@gmail.com"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.workTimeSubContainer}>
                            <Text theme={expertsAddCard.workTimeText}>出生年月日</Text>
                        </SubContainer>
                    </FormRow>
                    <FormRow>
                        <FormCardSelector
                            //label={"出生年月日"}
                            hint={""}
                            placeholder={"西元年"}
                            value={BirthYear}
                            isSearchable
                            options={YearFrom1930to(2020)}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthYearResetValue(value); BirthMonthResetValue(''); BirthDayResetValue('') }}
                            regExpResult={BirthYearregExpResult}
                            theme={expertsAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            //label={""}
                            hint={""}
                            placeholder={"月份"}
                            value={BirthMonth}
                            isSearchable
                            options={month}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthMonthResetValue(value); BirthDayResetValue('') }}
                            regExpResult={BirthMonthregExpResult}
                            theme={expertsAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            //label={""}
                            hint={""}
                            placeholder={"日期"}
                            value={BirthDay}
                            isSearchable
                            options={getDayByYearAndMonth(BirthYear.value, BirthMonth.value)}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthDayResetValue(value) }}
                            regExpResult={BirthDayregExpResult}
                            theme={expertsAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={expertsAddCard.workTimeSubContainer}>
                            <Text theme={expertsAddCard.workTimeText}>通訊地址</Text>
                        </SubContainer>
                    </FormRow>
                    <FormRow>
                        <FormCardSelector
                            //label={"通訊地址"}
                            //hint={""}
                            placeholder={"請選擇縣市"}
                            value={County}
                            isSearchable
                            options={Counties}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { CountyResetValue(value); DistrictResetValue('') }}
                            regExpResult={CountyregExpResult}
                            theme={expertsAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            //label={""}
                            //hint={""}
                            placeholder={"請選擇行政區"}
                            value={District}
                            isSearchable
                            options={cityAndCountiesLite[County.value]}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { DistrictResetValue(value) }}
                            regExpResult={DistrictregExpResult}
                            theme={expertsAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            //label={""}
                            hint={""}
                            value={Addr}
                            onChange={Addrhandler}
                            regExpResult={AddrregExpResult}
                            placeholder={"忠孝東路四段 100 號 3 樓"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"現職單位"}
                            hint={"請輸入您的現職單位地址，如 台北市大安區忠孝東路四段 100 號 3 樓"}
                            value={NowServiceAddr}
                            onChange={NowServiceAddrhandler}
                            regExpResult={NowServiceAddrregExpResult}
                            placeholder={"如 台北市大安區忠孝東路四段 100 號 3 樓"}
                            theme={expertsAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <CityCheckBoxGroup
                            label={"服務區域"}
                            value={ServiceArea}
                            onChange={(value) => { ServiceAreaResetValue(value) }}
                            theme={expertsAddCard.serviceAreaFormCardLabel}
                        ></CityCheckBoxGroup>
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