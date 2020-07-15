export default {
    pageTitleBarKeyWord: {
        height: "2.5rem",
        width: "12.625rem",
        padding: "0",
        display: "initial"
    },
    //#region 各頁面通用標題的 查詢按鈕
    pageTitleBarSearch: {
        justify: "center",
        fontSize: "0.8rem",
        height: "1.95rem",
        width: "4.375rem",
        hoverBackgroundColor: "#409eff",
        backgroundColor: "#409eff",
        borderRadius: "4px",
        margin: "-0.2rem .2rem 0  0"
    },
    //#endregion
    //#region 各頁面通用標題的 查詢按鈕
    pageTitleBarAdd: {
        justify: "center",
        fontSize: "0.8rem",
        height: "1.95rem",
        width: "4.375rem",
        hoverBackgroundColor: "#409eff",
        backgroundColor: "#409eff",
        borderRadius: "4px",
        margin: "-0.2rem .2rem 0  0"
    },
    //#endregion
    //#region  編輯按鈕
    pageTitleBarEdit: {
        justify: "center",
        fontSize: "0.8rem",
        height: "1.95rem",
        width: "3.375rem",
        hoverBackgroundColor: "#ecf5ff",
        backgroundColor: "#fff",
        borderRadius: "4px",
        border: "1px solid #dcdfe6",
        color: "#606266",
        hoverColor: "#409eff",
        hoverBorder: "1px solid #c6e2ff",
        margin: "0rem .4rem 0  0"
    },
    //#endregion
    //#region 刪除按鈕
    pageTitleBarDel: {
        justify: "center",
        fontSize: "0.8rem",
        height: "1.95rem",
        width: "3.375rem",
        hoverBackgroundColor: "#f78989",
        backgroundColor: "#f56c6c",
        borderRadius: "4px",
        border: "1px solid #f56c6c",
        hoverBorder: "1px solid #f78989",
        margin: "0rem .4rem 0  0"
    },
    //#endregion
    tableContainer: {
        padding: "0 0.5rem 0 0.8rem"
    },
    enableTag: {
        backgroundColor: "#f0f9eb",
        borderColor: "#e1f3d8",
        color: "#67c23a",
        height: "1.75rem",
        lineHeight: "1.75rem",
        borderRadius: "4px",
        border: "1px solid #e1f3d8",
        padding: "0 10px",
        fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
        fontSize: "0.75rem",
        display: "inline-block",
        boxSizing: "border-box",
        whiteSpace: "nowrap"
    },
    disableTag: {
        backgroundColor: "#f4433654",
        borderColor: "#e1f3d8",
        color: "#f44336c9",
        height: "1.75rem",
        lineHeight: "1.75rem",
        borderRadius: "4px",
        border: "1px solid #f443363b",
        padding: "0 10px",
        fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif',
        fontSize: "0.75rem",
        display: "inline-block",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
    },
    addFormControl: {
        minWidth: "37rem",
    },
    addCardNameInput: {
        //height: "8rem",
        occupy: 12,
        marginTop: "0rem",
        marginBottom: "0rem",
        marginLeft: "0.5rem", // 包含Label與輸入框 最左方間格，預設 0.5rem
        marginRight: "0.5rem", // 包含Label與輸入框最右方間格，預設 0.5rem
        input: {
            inputHeight: "3rem", // 輸入框高度
            inputWidth: "calc( 100% - 4.25rem )", //輸入框寬度
            inputMarginLeft: "0.75rem", // 左方Label與輸入框 間格，預設 0.5rem
            inputMarginRight: "2rem", // 右方Label與輸入框 間格，預設 0.5rem
        },
        labelStart: {
            height: "3rem",
            width: "4.25rem",
            //border: "1px solid #dcdfe6",
            //borderRadius: "4px"
        },
        labelEnd: {
            height: "3rem",
            width: "15.625rem",//右方Label寬度，若有使用右方Label，此寬度為必傳
            border: "1px solid #dcdfe6",
            borderRadius: "4px"
        },
    },
    addCardEnabledSelector: {
        //height: "8rem",
        occupy: 12,
        marginTop: "0rem",
        marginBottom: "0rem",
        marginLeft: "0.5rem", // 包含Label與輸入框 最左方間格，預設 0.5rem
        marginRight: "0.5rem", // 包含Label與輸入框最右方間格，預設 0.5rem
        selector: {
            selectorHeight: "3rem", // 輸入框高度
            selectorWidth: "calc( 100% - 4.25rem - 15.625rem - 2rem)", //輸入框寬度
            selectorMarginLeft: "0.75rem", // 左方Label與輸入框 間格，預設 0.5rem
            selectorMarginRight: "2rem", // 右方Label與輸入框 間格，預設 0.5rem
        },
        labelStart: {
            height: "3rem",
            width: "4.25rem",
            //border: "1px solid #dcdfe6",
            //borderRadius: "4px"
        },
        labelEnd: {
            height: "3rem",
            width: "15.625rem",//右方Label寬度，若有使用右方Label，此寬度為必傳
            border: "1px solid #dcdfe6",
            borderRadius: "4px"
        },
    },
}