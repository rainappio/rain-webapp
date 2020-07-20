export default {
    //#region 新增帳號與搜尋框
    addAndSearchFormRow: {
        direction: "row",
        justify: "flex-end",
    },
    addButtonSubContainer: {
        margin: "0 0rem 0 0",
    },
    //#endregion
    //#region 小於768px
    addAndSearchFormRowLessThan768: {
        direction: "row",
        justify: "space-between",
        padding: "0 1rem 0",
        margin: "0.75rem 0 0"
    },
    addButtonLessThan768: {
        backgroundColor: "#fff",
        display: "inline-block",
        width: "6.75rem",
        height: "2.25rem",
        lineHeight: "2.25rem",
        color: "#964f19",
        border: "1px solid #964f19",
        borderRadius: "1.25rem",
        textAlign: "center",
        hoverBackgroundColor: "#964f19",
        hoverColor: "#fff",
        fontSize: "0.875rem"
    },
    addButtonSubContainerLessThan768: {
        occupy: 12,
    },
    searchInputLessThan768: {
        inputSubContainer: {
            //dis
            occupy: 12,
            height: "2.25rem",
            textAlign: "center",
            margin: "0.5rem 0"
        },
        inputBasicContainer: {
            width: "100%",
            margin: "0 0 1.5rem 0",
            display: "inline-block",
            backgroundColor: "#fff",
            borderRadius: "20px"
        },
        input: {
            textAlign: "center",
            border: "1px solid #666",
            borderRadius: "20px",
            fontSize: ".875em",
            letterSpacing: "0.025rem",
            color: "#000",
            //focusBackgroundColor: "#fffcf4",
            inputHeight: "2.25rem", // 輸入框高度
            inputMarginLeft: "0.75rem", // 左方Label與輸入框 間格，預設 0.5rem
            inputMarginRight: "2rem", // 右方Label與輸入框 間格，預設 0.5rem
        },
    },
    //#endregion 
    //#region 匯出彈窗
    exportText: {
        display: "block",
        textAlign: "center",
        color: "#595959",
        fontSize: "1.875em",
        fontWeight: 900
    },
    highLightText: {
        display: "block",
        textAlign: "center",
        color: "#545454",
        fontSize: "1.125em",
        fontWeight: 500
    },
    //#endregion
}

