export default {

    //#region 大於等於768px
    //#region 最外層容器
    basicContainer: {
        height: "calc( 100% - 4.5rem )",
        //backgroundColor: "#f7f1ed",
        width: "100%",
        position: "fixed",
        top: "4.5rem",
        bottom: 0,
        overflowY: 'scroll',
        overflowX: 'scroll',
        backgroundColor: '#fff',
        scrollHeight: ".8rem",
        tablet: {
            height: "100%",
            //backgroundColor: "#f7f1ed",
            width: "calc( 100% - 13.5rem )",
            position: "fixed",
            top: "0rem",
            right: "0rem",
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'scroll',
            backgroundColor: '#fff',
            scrollHeight: ".8rem",
        }
    },
    //#endregion
    //#region 新增帳號與搜尋框
    addAndSearchFormRow: {
        direction: "row",
        justify: "flex-end",
        padding: "0 2.5rem 0 0"
    },
    addButtonSubContainer: {
        margin: "0 0.75rem 0 0"
    },
    addButton: {
        backgroundColor: "#fff",
        display: "inline-block",
        width: "9.25rem",
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
    searchInput: {
        inputSubContainer: {
            //dis
            //occupy: 12,
            height: "2.25rem",
            textAlign: "center",
        },
        inputBasicContainer: {
            width: "12.875rem",
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
    //#region 表格容器
    tableBasicContainer: {
        padding: "2rem 2.5rem 2.5rem 2.5rem"
    },
    //#endregion
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
    tableBasicContainerLessThan768: {
        padding: "0.75rem 1rem 0"
    },
    addButtonSubContainerLessThan768: {

    },
    //#endregion 
}