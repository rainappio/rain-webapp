export default {
    form: {
        formControl: {
            minWidth: "50rem",
        },
        selectotUlContainer: {
            overflowY: "scroll",
            maxHeight: "11.25rem",
            boxShadow: "0 2px 12px 0 #0000001a",
            borderRadius: "4px",
            border: "1px solid #e4e7ed",
            position: "absolute",
            zIndex: 2, width: "100%",
            backgroundColor: "#fff"
        },
        selectotUl: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
            margin: "0.5rem 0",
        },
        selectotInlineLi: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0.5rem",
            fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',

        },
        selectotLi: {
            color: "#606266",
            hoverBackgroundColor: "#f5f7fa",
            hoverColor: "#606266"
        },
        SearchSelectorInputContainer: (props, inputFocus) => (
            {
                padding: "0 1.5rem 0 0",
                width: props?.theme?.selector?.selectorWidth ? `calc( ${props.theme.selector.selectorWidth} - .5rem )` : '14rem',
                display: "inline-block",
                backgroundColor: props?.theme?.selector?.backgroundColor ?? "initial",
                borderRadius: props?.theme?.selector?.borderRadius ?? '4px',
                border: props.regExpResult ? props?.theme?.selector?.errorBorder ?? '1px solid #f56c6c' : (inputFocus ? props?.theme?.selector?.focusOutline ?? '1px solid #409eff' : props?.theme?.selector?.border ?? '1px solid #dcdfe6'),
            }
        ),
        SearchSelectorTag: {
            backgroundColor: "#ecf5ff",
            borderColor: "#d9ecff",
            color: "#409eff",
            height: "1.75rem",
            lineHeight: "1.75rem",
            borderRadius: "4px",
            border: "1px solid #f443363b",
            padding: "0 1rem 0 0.5rem",
            fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
            fontSize: "0.75rem",
            display: "inline-block",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            width: "initial",
            margin: "0.2rem"

        },
        formCardTextInputLabel: (props) => ({
            color: props.label === "" ? "#00000000" : "#444",
            fontSize: "1rem",
            fontWeight: 700,
            userSelect: "none"
        }),
        formCardTextInputHint: (props) => ({
            padding: props.hint === "" ? "0 0 0 2px" : "initial",
            color: props.hint === "" ? "#00000000" : "#d25959",
            fontSize: "0.75rem",
        }),
        //#region FormCardSelector組件樣式
        select: (props) => (
            {
                container: (provided, state) => ({
                    ...provided,
                    width: "100%",
                    height: props?.isMulti ? "fit-content" : "2rem",
                    lineHeight: props?.isMulti ? "initial" : "2rem",
                    borderRadius: "0rem",
                    fontSize: "0.75rem",
                    '&:focus': {
                        outline: "none",
                        border: "0px solid #00000000",
                    },
                    '&:hover': {
                        outline: "none",
                        border: "0px solid #00000000",
                    },
                }),
                control: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "initial" : "2rem",
                    minHeight: props?.isMulti ? "2rem" : "2rem",
                    lineHeight: props?.isMulti ? "initial" : "2rem",
                    boxShadow: state.isFocused ? "0 0 0 2px #444" : "none",
                    border: "0px solid #00000000",
                    borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                    borderRadius: state.isFocused ? "4px" : "0rem",
                    '&:focus': {
                        border: "0px solid #00000000",
                        borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                        borderRadius: state.isFocused ? "4px" : "0rem",
                    },
                    '&:hover': {
                        border: "0px solid #00000000",
                        borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                        borderRadius: state.isFocused ? "4px" : "0rem",
                    }
                }),
                indicatorSeparator: () => ({
                    display: "none"
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "fit-content" : "2rem",
                    lineHeight: props?.isMulti ? "fit-content" : "2rem",
                    padding: "0 0 0 2px;"
                }),
                input: (provided, state) => ({
                    ...provided,
                    margin: '0px',
                }),
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    // height: "2rem",
                    // lineHeight: "2rem",
                    transition: 'all .2s ease',
                    transform: state.isFocused ? 'rotate(-180deg)' : null
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "calc( 2rem - 1px )" : "2rem",
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    marginTop: "0.2rem",
                    marginLeft: "0rem",
                    color: "#444"
                }),
                multiValue: (provided, state) => ({
                    //容器
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    backgroundColor: "#f4f4f5",
                    border: "1px solid #e9e9eb",
                    borderRadius: "4px",
                    height: "1.625rem",
                }),
                multiValueLabel: (provided, state) => ({
                    //label
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    //padding: "0",
                    color: "#444",
                    height: "1.6rem",
                    lineHeight: "1.6rem"
                }),
                multiValueRemove: (provided, state) => ({
                    //icon
                    ...provided,
                    marginTop: "0.5rem",
                    marginLeft: "0rem",
                    color: "#909399",
                    backgroundColor: "#c0c4cc",
                    border: "1px solid #e9e9eb",
                    borderRadius: "8px",
                    width: "0.8rem",
                    height: "0.8rem",
                    padding: "0",
                    marginRight: "0.1rem",
                    ":hover": {
                        color: "#fff",
                        backgroundColor: "#c0c4cc",
                    }
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    marginTop: "0.2rem",
                    marginLeft: "0rem",
                }),
                option: (provided, { data, isDisabled, isFocused, isSelected }) => {
                    // data 所有選項
                    // isDisabled 是否禁用
                    // isFocused 是否注焦
                    // isSelected 是否被選
                    //console.log(data)
                    return {
                        ...provided,
                        height: "2rem",
                        lineHeight: "2rem",
                        backgroundColor: isDisabled ? null : isSelected ? "#f5f7fa" : isFocused ? "#f5f7fa" : null,
                        color: isDisabled ? '#ccc' : isSelected ? "#964f19" : "#606266",
                        cursor: isDisabled ? 'not-allowed' : 'default',
                        fontWeight: "600",
                        textAlign: "center",
                        paddingTop: "0rem",
                        fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                        ":hover": {
                            backgroundColor: isDisabled ? "initial" : '#f5f7fa',
                        },
                    };
                },
            }
        ),
        //#endregion
        //#region FormCardLeftIconSelectorBase組件樣式
        leftIconSelect: (props) => (
            {
                container: (provided, state) => ({
                    ...provided,
                    width: "100%",
                    height: props?.isMulti ? "fit-content" : "2rem",
                    lineHeight: props?.isMulti ? "initial" : "2rem",
                    borderRadius: "0rem",
                    fontSize: "0.75rem",
                    '&:focus': {
                        outline: "none",
                        border: "0px solid #00000000",
                    },
                    '&:hover': {
                        outline: "none",
                        border: "0px solid #00000000",
                    },
                }),
                control: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "initial" : "2rem",
                    minHeight: props?.isMulti ? "2rem" : "2rem",
                    lineHeight: props?.isMulti ? "initial" : "2rem",
                    boxShadow: state.isFocused ? "0 0 0 2px #444" : "none",
                    border: "0px solid #00000000",
                    borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                    borderRadius: state.isFocused ? "4px" : "0rem",
                    position: "relative",//
                    '&:focus': {
                        border: "0px solid #00000000",
                        borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                        borderRadius: state.isFocused ? "4px" : "0rem",
                    },
                    '&:hover': {
                        border: "0px solid #00000000",
                        borderBottom: !state.isFocused ? "#444444 1px solid" : "none",
                        borderRadius: state.isFocused ? "4px" : "0rem",
                    }
                }),
                indicatorSeparator: () => ({
                    display: "none"
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "fit-content" : "2rem",
                    lineHeight: props?.isMulti ? "fit-content" : "2rem",
                    padding: "0 0 0 2.125rem",
                }),
                input: (provided, state) => ({
                    ...provided,
                    margin: '0px',
                }),
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    // height: "2rem",
                    // lineHeight: "2rem",
                    //transition: 'all .2s ease',
                    //transform: state.isFocused ? 'rotate(-180deg)' : null,
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: props?.isMulti ? "calc( 2rem - 1px )" : "2rem",
                    position: "absolute",//
                    left: "0rem",//
                    padding: "10px 14px 6px 2px",
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    marginTop: "0.2rem",
                    marginLeft: "0rem",
                    color: "#444"
                }),
                multiValue: (provided, state) => ({
                    //容器
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    backgroundColor: "#f4f4f5",
                    border: "1px solid #e9e9eb",
                    borderRadius: "4px",
                    height: "1.625rem",
                }),
                multiValueLabel: (provided, state) => ({
                    //label
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    //padding: "0",
                    color: "#444",
                    height: "1.6rem",
                    lineHeight: "1.6rem"
                }),
                multiValueRemove: (provided, state) => ({
                    //icon
                    ...provided,
                    marginTop: "0.5rem",
                    marginLeft: "0rem",
                    color: "#909399",
                    backgroundColor: "#c0c4cc",
                    border: "1px solid #e9e9eb",
                    borderRadius: "8px",
                    width: "0.8rem",
                    height: "0.8rem",
                    padding: "0",
                    marginRight: "0.1rem",
                    ":hover": {
                        color: "#fff",
                        backgroundColor: "#c0c4cc",
                    }
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                    marginTop: "0.1rem",
                    marginLeft: "0rem",
                }),
                option: (provided, { data, isDisabled, isFocused, isSelected }) => {
                    // data 所有選項
                    // isDisabled 是否禁用
                    // isFocused 是否注焦
                    // isSelected 是否被選
                    //console.log(data)
                    return {
                        ...provided,
                        height: "2rem",
                        lineHeight: "2rem",
                        backgroundColor: isDisabled ? null : isSelected ? "#f5f7fa" : isFocused ? "#f5f7fa" : null,
                        color: isDisabled ? '#ccc' : isSelected ? "#964f19" : "#606266",
                        cursor: isDisabled ? 'not-allowed' : 'default',
                        fontWeight: "600",
                        textAlign: "center",
                        paddingTop: "0rem",
                        fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
                        ":hover": {
                            backgroundColor: isDisabled ? "initial" : '#f5f7fa',
                        },
                    };
                },
            }
        ),
        //#endregion    
    }
}