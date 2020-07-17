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
    if (!!nowTheirSelected) {
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
export const CustomersEditCard = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { customersPage: { customersAddCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    //const [MasterNo, MasterNohandler, MasterNoregExpResult, MasterNoResetValue] = useForm("", ["^.{1,}$", "^[0-9]{1,}$", "^.{1,999}$"], ["請輸入工號", "工號限使用數字", "最長為999個數字"]); //足健師工號欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入中文完整姓名", "姓名最長為5個中文字"]); // 足健師姓名欄位
    //const [Sex, Sexhandler, SexregExpResult, SexResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇性別"]); // 足健師性別欄位
    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入正確手機號碼", "請輸入正確手機格式"]); // 管理員手機欄位
    const [Email, Emailhandler, EmailregExpResult, EmailResetValue] = useForm("", ["^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"], ["請輸入正確E-mail格式"]); // Email欄位
    const [BirthYear, BirthYearhandler, BirthYearregExpResult, BirthYearResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日西元年"]); // 生日西元年欄位
    const [BirthMonth, BirthMonthhandler, BirthMonthregExpResult, BirthMonthResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日月份"]);// 生日月份欄位
    const [BirthDay, BirthDayhandler, BirthDayregExpResult, BirthDayResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日日期"]); // 生日日期欄位
    const [County, Countyhandler, CountyregExpResult, CountyResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇縣市"]); // 直轄地區欄位
    const [District, Districthandler, DistrictregExpResult, DistrictResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇行政區"]); // 直轄地區欄位
    const [Addr, Addrhandler, AddrregExpResult, AddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入詳細地址"]); // 地址欄位
    useEffect(() => {
        let date = props?.editAutoFill?.cBirthDay ? new Date(props?.editAutoFill?.cBirthDay) : new Date();

        NameResetValue(props?.editAutoFill?.cRealName ?? '');
        PhoneResetValue(props?.editAutoFill?.cTel ?? '');
        EmailResetValue(props?.editAutoFill?.cEmail ?? '');
        BirthYearResetValue({ value: date.getFullYear(), label: `西元 ${date.getFullYear()} 年` });
        BirthMonthResetValue(month[date.getMonth()]);
        BirthDayResetValue(day[date.getDate() - 1]);
        CountyResetValue({ value: props?.editAutoFill?.CommCounty, label: props?.editAutoFill?.CommCounty });
        DistrictResetValue({ value: props?.editAutoFill?.CommDistrict, label: props?.editAutoFill?.CommDistrict });
        AddrResetValue(props?.editAutoFill?.CommAddr ?? '');



    }, [])

    return (
        <>
            <FormCard
                title={"修改顧客帳號"}
                yes={() => {
                    //全部通過檢核才可放行
                    (NameregExpResult ? alertService.warn(NameregExpResult, { autoClose: true })

                        : (PhoneregExpResult ? alertService.warn(PhoneregExpResult, { autoClose: true })
                            : (BirthYearregExpResult ? alertService.warn(BirthYearregExpResult, { autoClose: true })
                                : (BirthMonthregExpResult ? alertService.warn(BirthMonthregExpResult, { autoClose: true })
                                    : (BirthDayregExpResult ? alertService.warn(BirthDayregExpResult, { autoClose: true })
                                        : (EmailregExpResult ? alertService.warn(EmailregExpResult, { autoClose: true })
                                            : props.editAdminUserExecute(props.editAutoFill, Name, Phone, Email, BirthYear, BirthMonth, BirthDay, County, District, Addr)
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
                theme={customersAddCard.addformCard}
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
                            //hint={"請填寫真實姓名，以便確認您的預約資料"}
                            value={Name}
                            onChange={Namehandler}
                            regExpResult={NameregExpResult}
                            placeholder={"請在此輸入中文姓名"}
                            theme={customersAddCard.masterNoFormCardTextInput()}
                        ></FormCardTextInput>

                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"登入帳號"}
                            //hint={"email將作為您的登入帳號，日後不可修改"}
                            disabled
                            value={props?.editAutoFill?.cLoginName}
                            onChange={Emailhandler}
                            regExpResult={EmailregExpResult}
                            placeholder={"aso_service@gmail.com"}
                            theme={customersAddCard.phoneFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <FormCardTextInput
                            label={"聯絡電話"}
                            //hint={"手機號碼將作為您的登入密碼"}
                            value={Phone}
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"0966888168"}
                            theme={customersAddCard.phoneFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>

                    <FormRow>
                        <FormCardSelector
                            label={"出生年月日"}
                            hint={""}
                            placeholder={"西元年"}
                            value={BirthYear}
                            isSearchable
                            options={YearFrom1930to(2020)}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthYearResetValue(value); BirthMonthResetValue(''); BirthDayResetValue('') }}
                            regExpResult={BirthYearregExpResult}
                            theme={customersAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            label={""}
                            hint={""}
                            placeholder={"月份"}
                            value={BirthMonth}
                            isSearchable
                            options={month}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthMonthResetValue(value); BirthDayResetValue('') }}
                            regExpResult={BirthMonthregExpResult}
                            theme={customersAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            label={""}
                            hint={""}
                            placeholder={"日期"}
                            value={BirthDay}
                            isSearchable
                            options={getDayByYearAndMonth(BirthYear.value, BirthMonth.value)}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { BirthDayResetValue(value) }}
                            regExpResult={BirthDayregExpResult}
                            theme={customersAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                    </FormRow>
                    <FormRow>
                        <FormCardSelector
                            label={"通訊地址"}
                            //hint={""}
                            placeholder={"請選擇縣市"}
                            value={County}
                            isSearchable
                            options={Counties}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { CountyResetValue(value); DistrictResetValue('') }}
                            regExpResult={CountyregExpResult}
                            theme={customersAddCard.sexFormCardSelector}
                        ></FormCardSelector>
                        <FormCardSelector
                            label={""}
                            //hint={""}
                            placeholder={"請選擇行政區"}
                            value={District}
                            isSearchable
                            options={cityAndCountiesLite[County.value]}
                            //defaultValue={ { value: '1', label: 'Chocolate' }}
                            onChange={(value) => { DistrictResetValue(value) }}
                            regExpResult={DistrictregExpResult}
                            theme={customersAddCard.sexFormCardSelector}
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
                            theme={customersAddCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>

                    <FormRow>
                        <FormCardTextInput
                            label={"電子信箱Email"}
                            //hint={"email將作為您的登入帳號，日後不可修改"}
                            value={Email}
                            onChange={Emailhandler}
                            regExpResult={EmailregExpResult}
                            placeholder={"aso_service@gmail.com"}
                            theme={customersAddCard.phoneFormCardTextInput}
                        ></FormCardTextInput>
                    </FormRow>

                </FormControl>
            </FormCard>
        </>
    )
}