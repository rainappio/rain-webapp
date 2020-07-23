import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Context } from '../../../Store/store'
import { FormCardTextInput, FormControl, FormRow, FormCardSelector, CityCheckBoxGroup, FormCardLeftIconSelector } from '../../../Components/Forms';
import { getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { alertService } from '../../../Components/JumpAlerts';
import { FormCard } from '../../../Components/FormCard';
import { month, getDayByYearAndMonth, YearFrom1930to, Counties, cityAndCountiesLite, hours, day, cityAndCounties } from '../../../Mappings/Mappings';
import { SubContainer } from '../../../Components/Containers';
import { Text } from '../../../Components/Texts';
import { SingleDatePicker2 } from '../../../Components/DatePicker';
import { portalService } from '../../../Components/Portal';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';


//#region 時間選單連動
const getTimeList = (isLeft, nowTheirSelected) => {
    if (!!nowTheirSelected?.value) {
        if (isLeft) {
            return hours.filter((t) => (parseInt(t.value.replace(":", "")) < parseInt(nowTheirSelected.value.replace(":", ""))));
        } else {
            return hours.filter((t) => (parseInt(t.value.replace(":", "")) > parseInt(nowTheirSelected.value.replace(":", ""))));
        }
    } else {
        // nowTheirSelected===""
        return hours;
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
export const EditCard = (props) => {
    console.log("row", props.editAutoFill);

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { dispatchPage: { dispatchEditCard } } } = Theme;
    const [ShopListData, setShopListData] = useState([]); // 儲存分店列表
    let history = useHistory();

    //#region 表單狀態管理
    const [MasterNo, MasterNohandler, MasterNoregExpResult, MasterNoResetValue] = useForm("", ["^.{1,}$", "^[0-9]{1,}$", "^.{1,999}$"], ["請輸入工號", "工號限使用數字", "最長為999個數字"]); //足健師工號欄位
    const [Name, Namehandler, NameregExpResult, NameResetValue] = useForm("", ["^[\u4E00-\u9FA5]{1,}$", "^.{1,5}$"], ["請輸入足健師中文姓名", "姓名最長為5個中文字"]); // 足健師姓名欄位

    const [Phone, Phonehandler, PhoneregExpResult, PhoneResetValue] = useForm("", ["^.{1,}$", "^09[0-9]{8}$"], ["請輸入手機號碼", "請輸入正確手機格式"]); // 管理員手機欄位
    // const [Email, Emailhandler, EmailregExpResult, EmailResetValue] = useForm("", ["^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"], ["請輸入正確E-mail格式"]); // Email欄位
    // const [BirthYear, BirthYearhandler, BirthYearregExpResult, BirthYearResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日西元年"]); // 生日西元年欄位
    // const [BirthMonth, BirthMonthhandler, BirthMonthregExpResult, BirthMonthResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日月份"]);// 生日月份欄位
    // const [BirthDay, BirthDayhandler, BirthDayregExpResult, BirthDayResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇生日日期"]); // 生日日期欄位
    const [Time, Timehandler, TimeregExpResult, TimeResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇縣市"]); // 直轄地區欄位
    // const [District, Districthandler, DistrictregExpResult, DistrictResetValue] = useSelector("", [(value) => ((value?.value ?? "").toString()?.length > 0)], ["請選擇行政區"]); // 直轄地區欄位
    // const [Addr, Addrhandler, AddrregExpResult, AddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入詳細地址"]); // 地址欄位
    // const [NowServiceAddr, NowServiceAddrhandler, NowServiceAddrregExpResult, NowServiceAddrResetValue] = useForm("", ["^.{1,}$"], ["請輸入現職單位"]); // 現職單位欄位
    // const [ServiceArea, ServiceAreahandler, ServiceArearegExpResult, ServiceAreaResetValue] = useSelector("", [(value) => { /*console.log(value);*/ return (value ? value.length > 0 : false) }], ["請勾選服務地區"]); // 服務地區勾選欄位
    const [DateRegion, DateRegionhandler, DateRegionregExpResult, DateRegionResetValue] = useForm(new Date(), [""], [""]);//日期區間欄位


    useEffect(() => {
        let date = props?.editAutoFill?.mBirthDay ? new Date(props?.editAutoFill?.mBirthDay) : new Date();
        MasterNoResetValue(props?.editAutoFill?.CustomerName ?? '');
        NameResetValue(props?.editAutoFill?.ShopName ?? '');
        PhoneResetValue(props?.editAutoFill?.CustomerPhone ?? '');
        TimeResetValue(props?.editAutoFill?.ReservationDate ? { value: props?.editAutoFill?.ReservationDate.split('T')[1].slice(0, 5), label: props?.editAutoFill?.ReservationDate.split('T')[1].slice(0, 5) } : { value: '00:00', label: '00:00' });

        //console.log(props?.editAutoFill?.ServiceArea?.split(',')?.map((item) => { return { value: item, label: item.slice(3) } }));


    }, [])


    return (
        <>
            <FormCard
                title={"修改日期時間"}
                yes={() => {
                    portalService.normal({
                        autoClose: false,
                        yes: () => {
                            //console.log(props.tableData);
                            let newRow = { ...props.editAutoFill, ReservationDate: `${dateTrans(DateRegion)}T${Time.value}:00` };
                            let newTableData = { ...props.tableData };
                            newTableData.data = newTableData.data.map((item) => {
                                if (item.Id === newRow.Id)
                                    return newRow;
                                else
                                    return item;
                            });
                            //console.log(newTableData);
                            props?.editExecute && props.editExecute(newTableData);
                            props?.onClose && props.onClose(false);
                        },
                        yesText: "確定修改",
                        noText: "取消修改",
                        content: (
                            <>
                                <Text theme={dispatchEditCard.exportText}>
                                    確定要修改時間嗎？
                             </Text>
                                <Text theme={dispatchEditCard.exportTextSm}>
                                    *時間修改不代表派遣，請繼續操作並派遣足健師*
                             </Text>

                            </>)
                    })


                }}
                yesText={"儲存變更"}
                no={() => { props?.onClose && props.onClose(false); console.log(DateRegion, Time) }}
                noText={"放棄修改"}
                close={() => { props?.onClose && props.onClose(false); }}
                theme={dispatchEditCard.addformCard}
            >
                <FormControl
                    sumbit={false}
                    theme={{
                        maxHeight: "100%",
                        overflowY: "scroll",// 註解後關閉滾動
                        overflowX: "hidden",// 註解後關閉滾動
                        minWidth: "0",
                        padding: "0 1.25rem 0 0",
                        margin: "20px 0 0 0"
                    }}>
                    <FormRow>

                        <FormCardTextInput
                            label={"預約門市"}
                            hint={""}
                            value={Name}
                            disabled
                            onChange={Namehandler}
                            regExpResult={NameregExpResult}
                            placeholder={"請在此輸入中文姓名"}
                            theme={dispatchEditCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"顧客姓名"}
                            hint={""}
                            value={MasterNo}
                            disabled
                            onChange={MasterNohandler}
                            regExpResult={MasterNoregExpResult}
                            placeholder={"請在此輸入工號(數字)"}
                            theme={dispatchEditCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                        <FormCardTextInput
                            label={"顧客手機"}
                            hint={""}
                            value={Phone}
                            disabled
                            onChange={Phonehandler}
                            regExpResult={PhoneregExpResult}
                            placeholder={"0966888168"}
                            theme={dispatchEditCard.passFormCardTextInput(0)}
                        ></FormCardTextInput>
                    </FormRow>
                    <FormRow>
                        <SubContainer theme={{ occupy: 6 }}>
                            <SingleDatePicker2
                                getDate={DateRegionResetValue}
                                value={DateRegion}// [startDate,endDate]
                                doThings={(date) => {
                                    //props.execute(dateTrans(date[0]), dateTrans(date[1]), SearchWord);
                                    //props.setDateRange && props.setDateRange([date[0], date[1]]);
                                }}
                            //theme={{ margin: '5px 0 0 0' }}
                            ></SingleDatePicker2>
                        </SubContainer>
                        <FormCardLeftIconSelector
                            label={"預約時段"}
                            hint={""}
                            placeholder={"預約時段"}
                            value={Time}
                            isSearchable
                            isClearable
                            options={getTimeList()}
                            onChange={(values) => { TimeResetValue(values) }}
                            regExpResult={TimeregExpResult}
                            theme={dispatchEditCard.locationFormCardTextInput}
                        ></FormCardLeftIconSelector>
                    </FormRow>


                </FormControl>
            </FormCard>
        </>
    )
}