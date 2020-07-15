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
    tableBasicContainerLessThan768: {
        padding: "0.75rem 1rem 0"
    },
    //#region 表格容器
    tableBasicContainer: {
        padding: "2rem 2.5rem 2.5rem 2.5rem"
    },
    //#endregion
    //#endregion 
    passFormCardTextInput: (len) => {
        if (len > 0) {
            return {
                input: {
                    height: "2rem",
                    lineHeight: "2rem",
                    fontSize: "0.75rem",
                    borderBottom: "#444444 1px solid",
                    borderRadius: "0rem",
                    letterSpacing: "0.5rem"
                },
                inputSubContainer: {
                    occupy: 12,
                }
            }
        } else {
            return {
                input: {
                    height: "2rem",
                    lineHeight: "2rem",
                    fontSize: "0.75rem",
                    borderBottom: "#444444 1px solid",
                    borderRadius: "0rem",
                },
                inputSubContainer: {
                    occupy: 12,
                }
            }
        }
    },
    nameFormCardTextInput: {
        input: {
            height: "2rem",
            lineHeight: "2rem",
            fontSize: "0.75rem",
            borderBottom: "#444444 1px solid",
            borderRadius: "0rem",
        },
        inputSubContainer: {
            occupy: 6,
            padding: "0 0.1rem 0 0"
        }
    },
    locationFormCardTextInput: {
        selectSubContainer: {
            occupy: 6,
            padding: "0 0.1rem 0 0"
        }
    },
}

