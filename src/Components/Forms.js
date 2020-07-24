import React, { useState, useRef, useContext, useEffect, type ElementConfig } from 'react';
import styled from 'styled-components'
import { StyledIconButton } from './Buttons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SearchIcon from '@material-ui/icons/Search';
import { BasicContainer, Container, SubContainer } from './Containers';
import { Context } from '../Store/store'
import { Text } from './Texts';
import { Ul, Li } from './Lists';
import { TagClose } from './Tags';
import Select, { components } from 'react-select'
import { cityAndCounties } from '../Mappings/Mappings'

//#region  列表排序遞增遞減旋轉箭頭動畫
const ArrowDropUpIconTrans = styled(ArrowDropUpIcon).attrs((props) => ({}))`

&& {
    //動畫
    animation: ${props => props?.theme?.animation ?? 'initial'};
    animation-fill-mode: forwards;
    position: absolute;
    height: 100%;
    top: 0rem;
    right: 0.3rem;
    color: ${props => props?.theme?.color ?? '#606266'};

    @keyframes iconIncrease {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

    @keyframes iconDecrease {
        0% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }
}
`
//#endregion

//#region 表單控件重製

//#region 表單控件最外層包覆，支持Enter 提交
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 表單控件最外層包覆，支持Enter 提交
            可傳入props :
                onSubmit : 按Enter後執行的函數
                sumbit : Boolean //預設為 true ，即按Enter可以提交表單
                theme : { 
                    width: "100%",
                    minWidth: "32rem", //表格最小寬度，主要用來防止warp跑版
                }
*/
export const FormControl = (props) => {
    const { Theme } = useContext(Context);
    const { form } = Theme;

    return (
        <BasicContainer theme={props?.theme ?? form.formControl}>
            <form onSubmit={props?.onSubmit}>
                {props.children}
                {(props.sumbit ?? true) && <button style={{ display: "none" }} />}
            </form>
        </BasicContainer>
    )
}
//#endregion

//#region 表單控件內的列容器
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 表單控件內的列容器
*/
export const FormRow = (props) => {

    return (
        <Container theme={props?.theme ?? { direction: "row" }}>
            {props.children}
        </Container >
    )
}


//#endregion

//#region 一般輸入框
//#region 一般輸入框框基底
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: 一般輸入框框基底
*/
const TextInputBase = (props) => {
    //console.log(props)
    const ref = useRef();

    return (
        <>
            <SubContainer
                theme={props?.theme?.inputSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer theme={
                    props?.theme?.inputBasicContainer
                }>
                    <input autoComplete="off"
                        ref={ref}
                        name={props?.name}
                        disabled={props.disabled && "disabled"}
                        type={props.pass ? "password" : "text"}
                        value={props.value ?? ""}
                        onChange={props.onChange}
                        placeholder={props.placeholder} />
                    <BasicContainer theme={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        color: "#444",
                    }}>
                        {props.icon}
                    </BasicContainer>
                </BasicContainer>

            </SubContainer>
        </>
    )
}
//#endregion

//#region 輸入框組件 具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 輸入框，具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用

*/
export const TextInput = styled(TextInputBase).attrs((props) => ({}))`
    //固定屬性

    input {
        box-sizing: border-box;
        position: ${props => props?.theme?.input?.inputPosition ?? 'relative'};
        height: ${props => props?.theme?.input?.inputHeight ?? 'initial'}; 
        line-height: ${props => props?.theme?.input?.inputHeight ? `calc( ${props.theme.input.inputHeight} - .8rem )` : 'initial'}; 
        width: 100%; 
        font-size: ${props => props?.theme?.input?.fontSize ?? 'initial'}; 
        border: ${props => props?.theme?.input?.border ?? '1px solid #444'};
        border-radius: ${props => props?.theme?.input?.borderRadius ?? '20px'};
        color: ${props => props?.theme?.input?.color ?? '#606266'};
        font-family: ${props => props?.theme?.input?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
        font-weight: ${props => props?.theme?.input?.fontWeight ?? '500'};
        letter-spacing: ${props => props?.theme?.input?.letterSpacing ?? '0.0075em'};
        text-align: ${props => props?.theme?.input?.textAlign ?? 'initial'};

        &:focus {
            outline: ${props => props?.theme?.input?.focusOutline ?? '1px solid #409eff00'};
            background-color: ${props => props?.theme?.input?.focusBackgroundColor ?? 'initial'};
        }
    }
`
//#endregion
//#endregion

//#region 搜尋輸入框
//#region 搜尋輸入框框基底
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: 搜尋輸入框框基底
*/
const SearchTextInputBase = (props) => {
    //console.log(props)
    const searchLeft = {
        color: "#a4a4a4",
        position: "absolute",
        // right: "0",
        left: "0.5rem",
        top: "0.5rem",
        transition: "left .3s ease-in-out",
    }

    const searchRight = {
        color: "#444",
        position: "absolute",
        left: `calc( ${props?.theme?.inputBasicContainer.width} - 1.875rem )`,
        // left: "0",
        // right: "0.5rem",
        top: "0.5rem",
        transition: "left .3s ease-in-out",
    }

    const ref = useRef();
    const [SearchIconPosition, setSearchIconPosition] = useState(searchLeft);

    return (
        <>
            <SubContainer
                theme={props?.theme?.inputSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer theme={
                    props?.theme?.inputBasicContainer
                }>
                    <input autoComplete="off"
                        ref={ref}
                        name={props?.name}
                        disabled={props.disabled && "disabled"}
                        type={props.pass ? "password" : "text"}
                        value={props.value ?? ""}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        onFocus={() => { setSearchIconPosition(searchRight) }}
                        onBlur={() => {
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setSearchIconPosition(searchLeft)
                                    resolve();
                                }, 100, 'done');
                            });

                        }}
                    />
                    <SearchIcon style={SearchIconPosition} onClick={props?.searchOnClick} />
                </BasicContainer>
            </SubContainer>
        </>
    )
}
//#endregion

//#region 搜尋輸入框組件 具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 搜尋輸入框，具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用

*/
export const SearchTextInput = styled(SearchTextInputBase).attrs((props) => ({}))`
    //固定屬性

    input {
        box-sizing: border-box;
        position: ${props => props?.theme?.input?.inputPosition ?? 'relative'};
        height: ${props => props?.theme?.input?.inputHeight ?? 'initial'}; 
        line-height: ${props => props?.theme?.input?.inputHeight ? `calc( ${props.theme.input.inputHeight} - .8rem )` : 'initial'}; 
        width: 100%; 
        font-size: ${props => props?.theme?.input?.fontSize ?? 'initial'}; 
        border: ${props => props?.theme?.input?.border ?? '1px solid #444'};
        border-radius: ${props => props?.theme?.input?.borderRadius ?? '20px'};
        color: ${props => props?.theme?.input?.color ?? '#606266'};
        font-family: ${props => props?.theme?.input?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
        font-weight: ${props => props?.theme?.input?.fontWeight ?? '500'};
        letter-spacing: ${props => props?.theme?.input?.letterSpacing ?? '0.0075em'};
        text-align: ${props => props?.theme?.input?.textAlign ?? 'initial'};

        &:focus {
            outline: ${props => props?.theme?.input?.focusOutline ?? '1px solid #409eff00'};
            background-color: ${props => props?.theme?.input?.focusBackgroundColor ?? 'initial'};
            border: ${props => props?.theme?.input?.focusBorder ?? '1px solid #d25959'};

        }
    }
`
//#endregion
//#endregion

//#region FormCard表單卡片內的 輸入框
//#region FormCard表單卡片內的輸入框基底
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: FormCard表單卡片內的輸入框基底
*/
const FormCardTextInputBase = (props) => {
    //console.log(props)
    const { Theme } = useContext(Context);
    const { form } = Theme;
    const ref = useRef();

    return (
        <>
            <SubContainer
                theme={props?.theme?.inputSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer>
                    <Text theme={props?.theme?.formCardTextInputLabel ?? form.formCardTextInputLabel(props)} >
                        {props.label === "" ? "0" : props.label}
                    </Text>
                </BasicContainer>
                <BasicContainer theme={
                    props?.theme?.inputBasicContainer
                }>
                    <input autoComplete="off"
                        ref={ref}
                        name={props?.name}
                        disabled={props.disabled && "disabled"}
                        type={props.pass ? "password" : "text"}
                        value={props.value ?? ""}
                        onChange={props.onChange}
                        placeholder={props.placeholder} />
                    {/* <BasicContainer theme={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        color: "#444",
                    }}>
                        {props.icon}
                    </BasicContainer> */}
                </BasicContainer>
                <BasicContainer theme={{ margin: "0 0 0.5rem 0" }}>
                    <Text theme={props?.theme?.formCardTextInputHint ?? form.formCardTextInputHint(props)}>
                        {props.hint === "" ? "0" : props.hint}
                    </Text>
                </BasicContainer>
            </SubContainer>
        </>
    )
}
//#endregion

//#region FormCard表單卡片內的輸入框組件，請搭配useForm使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: FormCard表單卡片內的輸入框組件，請搭配useForm使用

    formCardTextInputLabel(props)
    formCardTextInputHint
    input

*/
export const FormCardTextInput = styled(FormCardTextInputBase).attrs((props) => ({}))`
    //固定屬性

    input {
        box-sizing: border-box;
        position: ${props => props?.theme?.input?.inputPosition ?? 'relative'};
        height: ${props => props?.theme?.input?.height ?? 'initial'}; 
        line-height: ${props => props?.theme?.input?.lineHeight ? `calc( ${props.theme.input.lineHeight} - .8rem )` : 'initial'}; 
        width: 100%; 
        font-size: ${props => props?.theme?.input?.fontSize ?? 'initial'}; 
        border: ${props => props?.theme?.input?.border ?? 'initial'};
        border-bottom: ${props => props?.theme?.input?.borderBottom};
        border-radius: ${props => props?.theme?.input?.borderRadius ?? '20px'};
        color: ${props => props?.theme?.input?.color ?? '#606266'};
        font-family: ${props => props?.theme?.input?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
        font-weight: ${props => props?.theme?.input?.fontWeight ?? '500'};
        letter-spacing: ${props => props?.theme?.input?.letterSpacing ?? '0.0075em'};
        text-align: ${props => props?.theme?.input?.textAlign ?? 'initial'};

        &:focus {
            outline: ${props => props?.theme?.input?.focusOutline ?? '1px solid #409eff00'};
            border: ${props => props?.theme?.input?.focusBorder ?? '2px solid #444'};
            border-bottom: ${props => props?.theme?.input?.focusBorderBottom};
            border-radius: ${props => props?.theme?.input?.focusBorderRadius ?? '4px'};
            background-color: ${props => props?.theme?.input?.focusBackgroundColor ?? 'initial'};
        }
    }
`
//#endregion
//#endregion

//#region FormCard表單卡片內的 選擇框
//#region 繼承 react-select 的 Select
const SelectExtend = styled(Select).attrs((props) => ({}))`
    && {
        [class*="menu"] {
            div:nth-child(1) {
                //滾動條美化
                ::-webkit-scrollbar {
                    width: 0.5em;
                    height: ${props => props?.theme?.scrollHeight ?? 'initial'}; //scroll-x 的高度
                }
                ::-webkit-scrollbar-track {
                    -webkit-border-radius: 10px;
                    border-radius: 10px;
                    margin:0px 0.1rem 5px 0;
                }
                ::-webkit-scrollbar-thumb {
                    -webkit-border-radius: 4px;
                    border-radius: 4px;
                    background: ${props => props?.theme?.scrollUnhoverBackgroundColor ?? '#9093994d'};
                }
                &:hover::-webkit-scrollbar-thumb {
                    -webkit-border-radius: 4px;
                    border-radius: 4px;
                    background: ${props => props?.theme?.scrollHoverBackgroundColor ?? '#9093994d'};
                }
            }
        }
    }
`
//#endregion
//#region FormCard表單卡片內的 選擇框 基底
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: FormCard表單卡片內的 選擇框 基底
*/
const FormCardSelectorBase = (props) => {
    //console.log(props)
    const { Theme } = useContext(Context);
    const { form } = Theme;

    return (
        <>
            <SubContainer
                theme={props?.theme?.selectSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer>
                    <Text theme={props?.theme?.formCardSelectLabel ?? form.formCardTextInputLabel(props)} >
                        {props.label === "" ? "0" : props.label}
                    </Text>
                </BasicContainer>
                <BasicContainer theme={
                    props?.theme?.selectBasicContainer
                }>
                    <SelectExtend
                        isSearchable={props?.isSearchable ?? false}
                        isClearable={props?.isClearable ?? false}
                        isMulti={props?.isMulti ?? false}
                        defaultValue={props?.defaultValue}
                        options={props?.options}
                        value={props.value}
                        maxMenuHeight={props?.maxMenuHeight ?? "12.5rem"}
                        //onChange={(e, t) => { console.log(e, t) }}
                        onChange={(values, action) => {
                            // console.log(values);
                            // console.log(action);
                            (props?.isMulti ?
                                props?.onChange && props.onChange(values ?? [])
                                :
                                props?.onChange && props.onChange(values))
                        }}
                        menuPosition="fixed"
                        noOptionsMessage={() => (props?.noOptionsMessage ?? "無符合資料")}
                        placeholder={props?.placeholder}
                        styles={props?.theme?.select ?? form.select(props)}></SelectExtend>
                </BasicContainer>
                <BasicContainer theme={{ margin: "0 0 0.5rem 0" }}>
                    <Text theme={props?.theme?.formCardSelectHint ?? form.formCardTextInputHint(props)}>
                        {props.hint === "" ? "0" : props.hint}
                    </Text>
                </BasicContainer>
            </SubContainer>
        </>
    )
}
//#endregion
//#region FormCard表單卡片內的 選擇框，請搭配useSelector使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: FormCard表單卡片內的 選擇框，請搭配useSelector使用
            可傳入props : 
                label : (ReactDom 或 文字) //標題
                isSearchable : Boolean 下拉選單是否可搜尋 ， 預設false，不可搜尋
                isClearable : Boolean 下拉選單是否可清除內容 ，預設false，不可清除內容
                isMulti : Boolean 下拉選單是否可多選 ，預設false，不可多選
                defaultValue : { value: "給後端的值", label: "顯示的值" ,isDisabled: "選填，是否禁止選擇" } //下拉選單預設選中項，無預設值
                options : [{ value: "給後端的值", label: "顯示的值" ,isDisabled: "選填，是否禁止選擇" }, {}, ...] //下拉選單選項
                value : useSelector第一個參數
                onChange : (value) => { useSelector第四個參數(value); ...其他動作 }，固定傳入本函數，"其他動作" 為選擇選項後，要執行的其他函數
                noOptionsMessage : 當無選項或搜尋無選項時要顯示的訊息
                placeholder : 提示字元
                maxMenuHeight : "rem" //選單最高高度
                theme: {
                    selectSubContainer : {}, //SubContainer容器樣式
                    formCardSelectLabel : {}, //標題樣式
                    selectBasicContainer : {} //選框容器樣式(BasicContainer)
                    formCardSelectHint : {} // 下方提示字串樣式
                    select :{} //選擇框樣式
                }
*/
export const FormCardSelector = styled(FormCardSelectorBase).attrs((props) => ({}))`
`
//#endregion
//#endregion

//#region FormCard表單卡片內的 時間選擇框 (icon 在左方)
//#region 時間icon
const DropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
    console.log(props)
    return (
        <components.DropdownIndicator style={{ position: "absolute", left: "11rem" }} {...props}>
            <AccessTimeIcon style={{ height: "20px", width: "20px" }} />
        </components.DropdownIndicator>
    );
};
//#endregion
//#region FormCard表單卡片內的 時間選擇框 (icon 在左方)
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: FormCard表單卡片內的 時間選擇框 (icon 在左方)
*/
const FormCardLeftIconSelectorBase = (props) => {
    //console.log(props)
    const { Theme } = useContext(Context);
    const { form } = Theme;

    return (
        <>
            <SubContainer
                theme={props?.theme?.selectSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer>
                    <Text theme={props?.theme?.formCardSelectLabel ?? form.formCardTextInputLabel(props)} >
                        {props.label === "" ? "0" : props.label}
                    </Text>
                </BasicContainer>
                <BasicContainer theme={
                    props?.theme?.selectBasicContainer
                }>
                    <SelectExtend
                        className={"selector"}
                        isSearchable={props?.isSearchable ?? false}
                        isClearable={props?.isClearable ?? false}
                        isMulti={props?.isMulti ?? false}
                        defaultValue={props?.defaultValue}
                        options={props?.options}
                        value={props.value}
                        maxMenuHeight={props?.maxMenuHeight ?? "12.5rem"}
                        //onChange={(e, t) => { console.log(e, t) }}
                        onChange={(values, action) => {
                            // console.log(values);
                            // console.log(action);
                            (props?.isMulti ?
                                props?.onChange && props.onChange(values ?? [])
                                :
                                props?.onChange && props.onChange(values))
                        }}
                        menuPosition="fixed"
                        components={{ DropdownIndicator }}
                        noOptionsMessage={() => (props?.noOptionsMessage ?? "無符合資料")}
                        placeholder={props?.placeholder}
                        styles={props?.theme?.select ?? form.leftIconSelect(props)}></SelectExtend>
                </BasicContainer>
                <BasicContainer theme={{ margin: "0 0 0.5rem 0" }}>
                    <Text theme={props?.theme?.formCardSelectHint ?? form.formCardTextInputHint(props)}>
                        {props.hint === "" ? "0" : props.hint}
                    </Text>
                </BasicContainer>
            </SubContainer>
        </>
    )
}
//#endregion
//#region FormCard表單卡片內的 時間選擇框 (icon 在左方)，請搭配useSelector使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: FormCard表單卡片內的 時間選擇框 (icon 在左方)，請搭配useSelector使用
            可傳入props : 
                label : (ReactDom 或 文字) //標題
                isSearchable : Boolean 下拉選單是否可搜尋 ， 預設false，不可搜尋
                isClearable : Boolean 下拉選單是否可清除內容 ，預設false，不可清除內容
                isMulti : Boolean 下拉選單是否可多選 ，預設false，不可多選
                defaultValue : { value: "給後端的值", label: "顯示的值" ,isDisabled: "選填，是否禁止選擇" } //下拉選單預設選中項，無預設值
                options : [{ value: "給後端的值", label: "顯示的值" ,isDisabled: "選填，是否禁止選擇" }, {}, ...] //下拉選單選項
                value : useSelector第一個參數
                onChange : (value) => { useSelector第四個參數(value); ...其他動作 }，固定傳入本函數，"其他動作" 為選擇選項後，要執行的其他函數
                noOptionsMessage : 當無選項或搜尋無選項時要顯示的訊息
                placeholder : 提示字元
                maxMenuHeight : "rem" //選單最高高度
                clearIconLeft : "rem" //清除按鈕位置 (absolute,left)
                theme: {
                    selectSubContainer : {}, //SubContainer容器樣式
                    formCardSelectLabel : {}, //標題樣式
                    selectBasicContainer : {} //選框容器樣式(BasicContainer)
                    formCardSelectHint : {} // 下方提示字串樣式
                    select : {
                    } //選擇框樣式
                }
*/
export const FormCardLeftIconSelector = styled(FormCardLeftIconSelectorBase).attrs((props) => ({}))`
    .selector {

            [class*="control"] {
                //color: red;
                div:nth-child(2){
                    div:nth-child(1):not([style^="display: inline-block;"]){
                        position: absolute;
                        left: ${props => props?.clearIconLeft ?? "11rem"};//必須因應寬度不同調整
                    }
                }
            }   

    }
`
//#endregion
//#endregion

//#region FormCard表單卡片內的 區域選擇Checkbox群組
//#region 單一CheckBox製作
const CheckboxContainer = styled.div`
  display: inline-block;
  width: 0.8125rem;
  height: 0.8125rem;
  position: relative;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  padding: 0;
  top: 0rem;
  position: absolute;
  white-space: nowrap;
  width: 0.8125rem;
  height: 0.8125rem;
  margin : 0rem;
`
const SingleCheckBox = ({ className, ...props }) => {
    //console.log(className, props)
    return (
        <CheckboxContainer className={className}>
            <HiddenCheckbox  {...props} />
        </CheckboxContainer>
    )
}
//#endregion
//#region 吐回分成四個一組的地區陣列函數
const remixArrayFour = (data) => {
    let res = [];
    let totalStep = Math.ceil((data ?? []).length / 4);
    for (let i = 0; i < totalStep; i++) {
        res.push([...data.slice(i * 4, i * 4 + 4)]);
    }
    //console.log(res)
    return res;
}
//#endregion
//#region FormCard表單卡片內的 區域選擇Checkbox群組基底
const CityCheckBoxGroupBase = (props) => {

    const { Theme } = useContext(Context);
    const { form } = Theme;
    const [WhichExpand, setWhichExpand] = useState("");
    const [Checked, setChecked] = useState([]);

    useEffect(() => {
        setChecked(props.value === "" ? [] : props.value)
    }, [props.value])

    return (
        <>
            <SubContainer
                theme={props?.theme?.cityCheckBoxGroupSubContainer}
                className={props.className} >
                {/* 標題 */}
                <BasicContainer>
                    <Text theme={props?.theme?.formCardCityCheckBoxGroupLabel ?? form.formCardTextInputLabel(props)} >
                        {props.label === "" ? "0" : props.label}
                    </Text>
                    <Text theme={props?.theme?.formCardHowManyCheckedText ?? form.formCardHowManyCheckedText(props)} >
                        {props.label === "" ? "0" : `共選了 ${Checked.length} 個區域`}
                    </Text>
                </BasicContainer>
                {/* 地區勾選群 */}
                <BasicContainer theme={
                    props?.theme?.cityCheckBoxGroupBasicContainer ?? form.cityCheckBoxGroupBasicContainer
                }>
                    {/* 地區容器 */}
                    {/* 開始遍歷 */}
                    {Object.keys(cityAndCounties).map((item, index, arr) => {
                        return (
                            <React.Fragment key={index}>
                                {/* 地區標題 */}
                                <BasicContainer
                                    onClick={() => { setWhichExpand((w) => ((w === item) ? "" : item)) }}
                                    theme={props?.theme?.cityTitleBasicContainer ?? form.cityTitleBasicContainer}>
                                    <Text theme={props?.theme?.cityTitleText ?? form.cityTitleText}>{item}</Text>
                                </BasicContainer>
                                {/* 子地區勾選 ，每四個換一列*/}
                                {
                                    (WhichExpand === item) && remixArrayFour(cityAndCounties[item]).map((subitem, subindex) => (
                                        <Container
                                            key={subindex}
                                            className={WhichExpand === item ? "expand" : "collapse"}
                                            theme={form.countiesRowContainer}>
                                            {subitem.map((subitem1, subindex1) => (
                                                <SubContainer theme={{ occupy: 3 }} key={subitem1.label}>
                                                    <SingleCheckBox
                                                        name={subitem1.label}
                                                        value={subitem1.value}
                                                        checked={(props?.value && props.value.filter(e => e.value === subitem1.value).length > 0) ?? Checked.filter(e => e.value === subitem1.value).length > 0}
                                                        onChange={(event) => {
                                                            //console.log(event.target.value);
                                                            //console.log(event.target.checked);
                                                            setChecked((c) => {
                                                                return (c.filter(e => e.value === subitem1.value).length > 0) ? c.filter(e => e.value !== subitem1.value) : [...c, { value: subitem1.value, label: subitem1.label }]
                                                            })
                                                            props?.onChange && props.onChange((Checked.filter(e => e.value === subitem1.value).length > 0) ? Checked.filter(e => e.value !== subitem1.value) : [...Checked, { value: subitem1.value, label: subitem1.label }])
                                                        }}>
                                                    </SingleCheckBox>
                                                    <Text theme={props?.theme?.checkBoxLabel ?? form.checkBoxLabel}>{subitem1.label}</Text>
                                                </SubContainer>
                                            ))}
                                        </Container>
                                    )
                                    )
                                }
                            </React.Fragment>
                        )
                    })
                    }
                </BasicContainer>
                {/* 底部提示 */}
                <BasicContainer theme={{ margin: "0 0 0.5rem 0" }}>
                    <Text theme={props?.theme?.formCardCityCheckBoxGroupHint ?? form.formCardTextInputHint(props)}>
                        {props.hint === "" ? "0" : props.hint}
                    </Text>
                </BasicContainer>
            </SubContainer>
        </>
    )
}
//#endregion
//#region FormCard表單卡片內的 區域選擇Checkbox群組組件
/* 
   Date   : 2020-07-15 01:11:42
   Author : Arhua Ho
   Content: FormCard表單卡片內的 區域選擇Checkbox群組組件，請搭配useSelector使用
            可傳入props : 
                label : (ReactDom 或 文字) //標題
                value : useSelector第一個參數，若有預設值格式應為 [{ value: "給後端的值", label: "顯示的值" ,isDisabled: "選填，是否禁止選擇" }, {}, ...]
                onChange : (value) => { useSelector第四個參數(value); ...其他動作 }，固定傳入本函數，"其他動作" 為選擇選項後，要執行的其他函數
                theme: {
                    cityCheckBoxGroupSubContainer : {}, //SubContainer容器樣式
                    formCardCityCheckBoxGroupLabel : {}, //標題樣式
                    formCardHowManyCheckedText : {}, //選擇了幾個區域文字樣式
                    cityCheckBoxGroupBasicContainer : {} //整個地區勾選群組區域容器樣式 (BasicContainer) ，可用來調整體高度
                    cityTitleBasicContainer : {} //地區標題容器樣式 (BasicContainer)
                    cityTitleText : {} //地區標題文字樣式
                    checkBoxLabel : {} //勾選項文字樣式
                    formCardCityCheckBoxGroupHint : {} // 下方提示字串樣式
                }
*/
export const CityCheckBoxGroup = styled(CityCheckBoxGroupBase).attrs((props) => ({}))`
    .expand {
        max-height: 1000rem;
        transition: max-height .3s ease-in-out;
    }

    .collapse {
        max-height: 0rem;
        transition: max-height .3s ease-in-out;
    }
`
//#endregion
//#endregion

//#region 一般下拉式選單
//#region 一般下拉式選單基底  
const SelectorBase = (props) => {

    const [OpenSelect, setOpenSelect] = useState(null);
    const [Select, setSelect] = useState({});//存放當頁所有id
    const ref = useRef();
    const { Theme } = useContext(Context);
    const { form } = Theme;

    useEffect(() => {
        let obj = {};
        (props.selectList ?? []).forEach((item, index) => (
            obj[item.key] = item.value
        ))
        setSelect(obj)
    }, [props.selectList])


    return (
        <SubContainer
            style={{
                ...(props.hidden ? { display: "none" } : {}),
                ...(props?.theme?.marginTop ? { marginTop: props.theme.marginTop } : { marginTop: "0rem" }),
                ...(props?.theme?.marginBottom ? { marginBottom: props.theme.marginBottom } : { marginBottom: "0rem" }),
                ...(props?.theme?.marginRight ? { marginRight: props.theme.marginRight } : { marginRight: "0.5rem" }),
                ...(props?.theme?.marginLeft ? { marginLeft: props.theme.marginLeft } : { marginLeft: "0.5rem" }),
            }}
            theme={{
                ...(props?.theme?.occupy ? { occupy: props.theme.occupy } : {}),
                ...(props?.theme?.height ? { height: props.theme.height } : { height: `calc( ${props.theme?.selector?.selectorHeight ?? "1.357rem"} + ${props.theme?.selector?.selectorHeight ?? "4rem"} * 0.25 )` }),
                //margin: `0 ${props?.theme?.marginRight ?? "0.5rem"} 0 ${props?.theme?.marginLeft ?? "0.5rem"}`,
            }}
            className={props.className} >
            {/* 左方Label */}
            {props.labelStart && <BasicContainer className={"labelStart"} >
                {props.labelStart}
            </BasicContainer>}
            {/* 下拉選單本體 */}
            <BasicContainer theme={{
                width: props?.theme?.selector?.selectorWidth ? `calc( ${props.theme.selector.selectorWidth} - .5rem )` : '14rem',
                display: "inline-block", backgroundColor: props?.theme?.selector?.backgroundColor ?? "initial", borderRadius: props?.theme?.selector?.borderRadius ?? '4px'
            }}>
                {/* <Text >下拉選單Input本體</Text> */}
                <input autoComplete="off" ref={ref} className={"selector"} name={props?.name} value={Select[props.value] ?? ""} disabled={props.disabled && "disabled"} readOnly="readonly" onBlur={() => { setOpenSelect(false) }} onClick={() => { setOpenSelect(!OpenSelect) }} placeholder={props.placeholder} ></input>
                <ArrowDropUpIconTrans
                    theme={{
                        animation: ((OpenSelect ?? "") === "") ? "" : (OpenSelect ? "iconIncrease .5s 1" : "iconDecrease .5s 1")
                        , color: props?.theme?.selector?.color ?? "#606266"
                    }}
                //onClick={() => {setOpenSelect(!OpenSelect); }}
                ></ArrowDropUpIconTrans>
                {!props.nonValid && <span className={`regSpan`}>{props.regExpResult}</span>}
                {/* 下拉選單 */}
                <BasicContainer theme={{ ...form.selectotUlContainer, display: (OpenSelect ? null : "none"), }}>
                    <Ul theme={form.selectotUl}>
                        {((props.selectList ?? []).length > 1 ? (props.selectList ?? []) : [{ key: undefined, value: "暫無資料" }]).map((item, index) => (
                            <Li key={index}
                                onMouseDown={
                                    () => {
                                        //當選擇的是查無資料則不對選中資料做任何改變
                                        if (!(item.key === undefined)) {
                                            props.onSelect(item.key);
                                        }
                                    }
                                }
                                theme={{ ...form.selectotLi, ...((item.key === props.value) ? { color: "#409eff" } : {}), ...(props?.theme?.selector?.selectorHeight ? { fontSize: `calc( ${props.theme.selector.selectorHeight} * 0.45 )` } : {}) }}
                                style={{ ...form.selectotInlineLi, padding: "0.25rem 0 0 0.5rem" }}>{item.value}</Li>
                        ))}
                    </Ul>
                </BasicContainer>
            </BasicContainer>
            {/* 左方Label */}
            {
                props.labelEnd && <BasicContainer className={"labelEnd"}>
                    {props.labelEnd}
                </BasicContainer>
            }

        </SubContainer >
    )
}
//#endregion

//#region 一般下拉式選單組件 
export const Selector = styled(SelectorBase).attrs((props) => ({}))`
 
.selector {
    cursor: default;
    box-sizing: border-box;
    z-index: 1;
    padding-right: 1rem;
    background-color: transparent;
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.selector?.selectorPosition ?? 'relative'};
    height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    //width: ${props => props?.theme?.selector?.selectorWidth ? `calc( ${props.theme.selector.selectorWidth} - .5rem )` : '14rem'}; 
    width: 100%;
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.45 )` : 'initial'}; 
    border: ${props => props.regExpResult ? props?.theme?.selector?.errorBorder ?? '1px solid #f56c6c' : props?.theme?.selector?.border ?? '1px solid #dcdfe6'};
    border-radius: ${props => props?.theme?.selector?.borderRadius ?? '4px'};
    color: transparent;
    text-shadow: ${props => props?.theme?.selector?.color ? `0 0 0 ${props.theme.selector.color}` : '0 0 0 #606266'};
    font-family: ${props => props?.theme?.selector?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.selector?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.selector?.letterSpacing ?? '0.0075em'};

    &:focus {
        outline: ${props => props.regExpResult ? (props?.theme?.selector?.selectorErrorOutline ?? (props?.theme?.selector?.errorBorder ?? '1px solid #f56c6c')) : props?.theme?.selector?.focusOutline ?? '1px solid #409eff'};
    }
}

.labelEnd {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelEnd?.textAlign ?? 'left'};
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelEnd?.position ?? 'relative'};
    height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelEnd?.width ? `calc( ${props.theme.labelEnd.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginRight ? `0 0 0 ${props.theme.selector.selectorMarginRight}` : '0 0 0 0.5rem'}; 
    font-size: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelEnd?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelEnd?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelEnd?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelEnd?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelEnd?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelEnd?.letterSpacing ?? '0.0075em'};
}

.labelStart {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelStart?.textAlign ?? 'right'};
    display: ${props => props?.theme?.labelStart?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelStart?.position ?? 'relative'};
    height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelStart?.width ? `calc( ${props.theme.labelStart.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginLeft ? `0 ${props.theme.selector.selectorMarginLeft} 0 0` : '0 0.5rem 0 0'}; 
    font-size: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelStart?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelStart?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelStart?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelStart?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelStart?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelStart?.letterSpacing ?? '0.0075em'};
}

.regSpan {
    display: inline-block;
    position: ${props => props?.theme?.regSpan?.position ?? 'absolute'};//absolute relative
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.25 )` : '0.625rem'}; 
    color: ${props => props?.theme?.regSpan?.color ?? '#ff6347'};
    width : 100%;
    left: 0.3rem;
    top: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - 0.5rem )` : '1.375rem'}; 
}
`
//#endregion

//#endregion

//#region 可搜尋式下拉選單 支援多選、單選
//#region 可搜尋式下拉選單基底 支援多選、單選
const SearchSelectorBase = (props) => {

    const { Theme } = useContext(Context);
    const { form } = Theme;
    const [Search, setSearch] = useState("");
    //const [InputFocus, setInputFocus] = useState(false);
    const [SelectList, setSelectList] = useState(props.selectList ?? []);
    const [SelectMapping, setSelectMapping] = useState({});//存放當頁所有id
    const [OpenSelect, setOpenSelect] = useState(null);

    useEffect(() => {
        let obj = {};
        (props.selectList ?? []).forEach((item, index) => (
            obj[item.key] = item.value
        ))
        setSelectMapping(obj)
        setSelectList(props.selectList)
    }, [props.selectList])

    const ref = useRef();

    //#region 處理搜尋與選中後的下拉選單
    let selectListHandler = (selectList) => {
        let res = (selectList ?? []).filter(it => (it.value.search(Search) > -1 && !(props.value ?? []).includes(it.key)));
        if (res.length > 0) {
            return res
        } else {
            return [{ key: undefined, value: "暫無資料" }]
        }
    }
    //#endregion

    return (
        <SubContainer
            style={{
                ...(props.hidden ? { display: "none" } : {}),
                ...(props?.theme?.marginTop ? { marginTop: props.theme.marginTop } : { marginTop: "0rem" }),
                //待調整錯誤訊息高度
                ...(props?.theme?.marginBottom ? { marginBottom: `calc(${props.theme?.marginBottom ?? "1.357rem"} + 1.357rem)` } : { marginBottom: "1.357rem" }),
                ...(props?.theme?.marginRight ? { marginRight: props.theme.marginRight } : { marginRight: "0.5rem" }),
                ...(props?.theme?.marginLeft ? { marginLeft: props.theme.marginLeft } : { marginLeft: "0.5rem" }),
            }}
            theme={{
                ...(props?.theme?.occupy ? { occupy: props.theme.occupy } : {}),
                //...(props?.theme?.height ? { height: props.theme.height } : { height: `calc( ${props.theme?.selector?.selectorHeight ?? "1.357rem"} + ${props.theme?.selector?.selectorHeight ?? "4rem"} * 0.25 )` }),
                //margin: `0 ${props?.theme?.marginRight ?? "0.5rem"} 0 ${props?.theme?.marginLeft ?? "0.5rem"}`,
            }}
            className={props.className} >
            {/* 左方Label */}
            {props.labelStart && <BasicContainer className={"labelStart"} >
                {props.labelStart}
            </BasicContainer>}
            {/* 下拉選單本體 */}
            <BasicContainer
                onClick={() => { ref.current.focus(); }}//1//4
                onFocus={() => {
                    //setOpenSelect(true)
                }}//3
                theme={form.SearchSelectorInputContainer(props, OpenSelect)}>
                <Container theme={{ direction: "row", alignItems: "center" }}>
                    {/* 沒東西要margin -0.32rem */}
                    {/* 遍歷選中項 */}
                    {(props.value ?? []).map((item, index) => (
                        <TagClose close={() => {
                            props.onSelect((s) => {
                                //標籤關閉時同時將選中項自陣列中移除
                                let arr = [...(s ?? [])]
                                let newArr = arr.filter((i) => (i !== item))
                                if (newArr.length === 0) { newArr = null }//重置無選中時為驗證成功邊框
                                return newArr;
                            })
                        }} key={index} theme={{ ...form.SearchSelectorTag }}>{SelectMapping[item] ?? ""}</TagClose>
                    ))}

                    <SubContainer>
                        <input
                            style={{ width: `${Search.length * 1.5 + 0.5}rem` }}
                            ref={ref}
                            autoComplete="off"
                            className={"search"}
                            name={props?.name}
                            value={Search}
                            disabled={props.disabled && "disabled"}
                            readOnly={(props?.search ?? true) ? false : "readonly"}  //作為搜尋開關，預設開啟
                            onFocus={() => {
                                setOpenSelect(true)
                            }}//2//5
                            onBlur={() => {
                                setOpenSelect(false);
                                setSearch("");
                            }}//3
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder={props.placeholder} ></input>
                    </SubContainer>
                </Container>
                <ArrowDropUpIconTrans
                    theme={{
                        animation: ((OpenSelect ?? "") === "") ? "" : (OpenSelect ? "iconIncrease .5s 1" : "iconDecrease .5s 1"),
                        color: props?.theme?.selector?.color ?? "#606266"
                    }}
                //onClick={() => {setOpenSelect(!OpenSelect); }}
                ></ArrowDropUpIconTrans>
                {!props.nonValid && <span className={`regSpan`}>{props.regExpResult}</span>}
                {/* 下拉選單 */}
                <BasicContainer theme={{ ...form.selectotUlContainer, display: (OpenSelect ? null : "none"), }}>
                    <Ul theme={form.selectotUl}>
                        {(selectListHandler(SelectList)).map((item, index) => (
                            <Li key={index}
                                onMouseDown={() => {
                                    if (!(item.key === undefined)) {
                                        //當選擇的是查無資料則不對選中資料做任何改變
                                        if (props.multiple) {
                                            //如果是多選，則增加key至陣列
                                            props.onSelect((s) => {
                                                let arr = [...(s ?? [])]
                                                arr.push(item.key)
                                                return arr;
                                            })
                                        } else {
                                            //若為單選擇取代key
                                            props.onSelect([item.key])
                                        }
                                    }
                                }}
                                theme={{ ...form.selectotLi, ...((item.key === props.value) ? { color: "#409eff" } : {}), ...(props?.theme?.selector?.selectorHeight ? { fontSize: `calc( ${props.theme.selector.selectorHeight} * 0.45 )` } : {}) }}
                                style={{ ...form.selectotInlineLi, padding: "0.25rem 0 0 0.5rem" }}>{item.value}</Li>
                        ))}
                    </Ul>
                </BasicContainer>
            </BasicContainer >
            {/* 左方Label */}
            {
                props.labelEnd && <BasicContainer className={"labelEnd"}>
                    {props.labelEnd}
                </BasicContainer>
            }

        </SubContainer >
    )
}
//#endregion

//#region 可搜尋式下拉選單 支援多選、單選
export const SearchSelector = styled(SearchSelectorBase).attrs((props) => ({}))`
 
.search {
    box-sizing: border-box;
    z-index: 1;
    background-color: transparent;
    max-width: 100%;
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.selector?.selectorPosition ?? 'relative'};
    height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.45 )` : 'initial'}; 
    border: 1px solid #f56c6c00;//隱藏邊框
    color: ${props => props?.theme?.selector?.color ?? '#606266'};
    font-family: ${props => props?.theme?.selector?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.selector?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.selector?.letterSpacing ?? '0.0075em'};

    &:focus {
        outline: 1px solid #f56c6c00;//隱藏邊框
    }
}

.labelEnd {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelEnd?.textAlign ?? 'left'};
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelEnd?.position ?? 'relative'};
    height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelEnd?.width ? `calc( ${props.theme.labelEnd.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginRight ? `0 0 0 ${props.theme.selector.selectorMarginRight}` : '0 0 0 0.5rem'}; 
    font-size: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelEnd?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelEnd?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelEnd?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelEnd?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelEnd?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelEnd?.letterSpacing ?? '0.0075em'};
}

.labelStart {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelStart?.textAlign ?? 'right'};
    display: ${props => props?.theme?.labelStart?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelStart?.position ?? 'relative'};
    height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelStart?.width ? `calc( ${props.theme.labelStart.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginLeft ? `0 ${props.theme.selector.selectorMarginLeft} 0 0` : '0 0.5rem 0 0'}; 
    font-size: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelStart?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelStart?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelStart?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelStart?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelStart?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelStart?.letterSpacing ?? '0.0075em'};
}

.regSpan {
    display: inline-block;
    position: ${props => props?.theme?.regSpan?.position ?? 'absolute'};//absolute relative
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.25 )` : '0.625rem'}; 
    color: ${props => props?.theme?.regSpan?.color ?? '#ff6347'};
    width : 100%;
    left: 0.3rem;
    bottom: -1.4rem;
}
`
//#endregion

//#endregion

