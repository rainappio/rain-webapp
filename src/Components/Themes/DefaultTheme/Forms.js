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
                //top: (props.value ?? []).length > 0 ? "0rem" : "0rem",//"-0.32rem"
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
        formCardTextInputLabel: {
            color: "#444",
            fontSize: "1rem",
            fontWeight: 700,
        },
        formCardTextInputHint: {
            padding: "0 0 0 2px",
            color: "#d25959",
            fontSize: "0.75rem",
        },

    }
}