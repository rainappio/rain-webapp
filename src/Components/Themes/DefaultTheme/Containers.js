export default {
    container: {
        //#region 登入畫面容器
        login: {
            height: "100vh",
            backgroundColor: "#79b7b6",
            padding: "7rem 0 0 0",
            direction: "row",
            justify: "center"
        },
        //#endregion
        //#region 頂部導航列
        navbar: {
            position: "fixed",
            width: "100%",
            direction: "row",
            justify: "space-between",
            alignItems: "center",
            backgroundColor: "#2f3e52",
            height: "4rem",
        },
        //#endregion
        //#region 頂部導航列，左方
        navbarLeft: {
            direction: "row",
            height: "4rem",
        },
        //#endregion
        //#region 頂部導航列，右方
        navbarRight: {
            padding: "0rem 1.5rem 0rem 0rem ",
            height: "4rem",
        }
        //#endregion
    },
    subContainer: {
        //#region 登入畫面卡片
        login: {
            width: "21.875rem",
            height: "20rem",
            backgroundColor: "#ffffff",
            border: "1px solid #eaeaea",
            boxShadow: " 0 0 25px #cac6c6",
            borderRadius: "5px",
            padding: "2rem",
        },
        //#endregion
        //#region 頂部導航列，左方
        navbarLeft: {
            height: "4rem",

            tablet: {
                padding: "0rem 0rem 0rem 1.5rem",
            }
        },
        //#endregion
        //#region 頂部導航列，右方
        navbarRight: {
            padding: "0.9rem 1.5rem 0rem 0rem ",
            height: "4rem",
        }
        //#endregion
    },
    basicContainer: {
        //#region 左側邊欄全展開
        leftSideFull: {
            position: 'fixed',
            top: "4rem",
            height: 'calc(100% - 4rem)',
            width: '13.5rem',
            backgroundColor: '#2f3e52',
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        //#endregion
        //#region 左側邊欄半展開
        leftSideSimple: {
            position: 'fixed',
            top: "4rem",
            height: 'calc(100% - 4rem)',
            width: '4rem',
            backgroundColor: '#2f3e52',
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'hidden',
        },
        //#endregion
        mainPageFull: {
            position: 'fixed',
            height: 'calc(100% - 6rem)',
            width: 'calc( 100% - 13.5rem )',
            left: '13.5rem',
            top: "6rem",
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'scroll',
            backgroundColor: '#fff',
            scrollHeight: ".8rem",
        },
        mainPageSimple: {
            position: 'fixed',
            height: 'calc(100% - 4rem)',
            width: 'calc( 100% - 13.5rem )',
            left: '13.5rem',
            top: "4rem",
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'scroll',
            backgroundColor: '#fff',
        },
        tabBar: {
            position: 'fixed',
            height: '2rem',
            width: 'calc( 100% - 13.5rem )',
            left: '13.5rem',
            top: "4rem",
            bottom: 0,
            overflowY: 'scroll',
            overflowX: 'scroll',
            backgroundColor: '#fff',
            scrollHeight: ".8rem",
            zIndex: "300"
        },
        tabBarFull: {
            padding: "0 0 0 .5rem",
            overflowX: "scroll",
            overflowY: 'hidden',
            whiteSpace: "nowrap",
            position: "fixed",
            top: "4rem",
            height: "2rem",
            right: "0rem",
            width: "inherit",
            backgroundColor: "#f0f0f0",
            scrollHeight: ".3rem",
            scrollUnhoverBackgroundColor: "#f0f0f000",
            zIndex: "inherit"
        },
    }
}