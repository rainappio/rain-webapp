export default {
    menuBar: {
        //#region 大於768的側邊欄
        //外層容器
        leftModeBasicContainer: {
            display: "none",
            tablet: {
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1,
                display: "inline-block",
                width: "13.5rem",
                backgroundColor: "#8c756a",
                color: "#fff",
                float: "left",
                //border-right: 1px solid #e5e5e5;
                height: "100vh",
                overflowY: 'scroll',
                overflowX: 'scroll',
            }
        },
        // 圖片容器
        leftModeImgContainer: {
            width: "100%",
            margin: "0 auto 0",
            textAlign: "center",
            padding: ".5rem 1rem 1rem",
            tablet: {
                width: "100%",
                textAlign: "center",
                margin: "0 auto 0",
                padding: ".5rem 1rem 1rem",
            }
        },
        // 標題容器
        leftModeTitleContainer: {
            padding: "0 0 0.5rem 1rem"
        },
        // 標題文字
        leftModeTitleText: {
            fontSize: " 1.125em",
            fontWeight: 550,
            color: "#fff",
            userSelect: "none"
        },
        // 登入者容器
        leftModeLoginNameContainer: {
            borderTop: "1px solid #ffffff3d",
            borderBottom: "1px solid #ffffff3d",
            padding: ".5rem 1rem 1rem"
        },
        // 登入者標題
        leftModeLoginNameTitle: {
            color: "#ffeec2",
            lineHeight: "1.25rem",
            height: "1.25rem",
            letterSpacing: "0rem",
            fontSize: ".875rem",
            fontWeight: 550,
            display: "block",
            margin: "0 0 0.2rem 0",
            userSelect: "none"
        },
        // 登入者文字
        leftModeLoginNameText: {
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fff",
            padding: "0.6rem 0",
            userSelect: "none"
        },
        // 登入者按鈕
        leftModeLoginNameButton: {
            display: "inline-block",
            margin: "0 0 0 1.875rem",
            fontSize: " 1.125em",
            fontWeight: 600,
            color: "#fff",
        },
        // 功能選單容器
        leftModeMenuContainer: {
            // display: "block",
            // listStyleType: "none",
            // marginBlockStart: "0rem",
            // marginBlockEnd: "0rem",
            // marginInlineStart: "0rem",
            // marginInlineEnd: "0rem",
            // paddingInlineStart: "0rem",
        },
        leftModeUlTitle: {
            color: "#ffeec2",
            lineHeight: "1.25rem",
            height: "1.25rem",
            letterSpacing: "0rem",
            fontSize: ".875rem",
            fontWeight: 550,
            display: "block",
            margin: "1rem 0 0.5rem 1rem",
            userSelect: "none"
        },
        // 功能選單Ul
        leftModeMenuUl: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
            userSelect: "none"
        },
        // 功能選單Li
        leftModeMenuLi: {
            paddingLeft: '1.6rem',
            fontSize: '0.875rem',
            color: '#fff',
            hoverColor: '#fff',
            display: "flex",
            alignItems: "center",
            height: "2.5rem",
            hoverBackgroundColor: "#a58b7f",
            userSelect: "none"
        },
        // 功能選單Li 被點擊
        leftModeMenuLiClicked: {
            paddingLeft: '1.6rem',
            fontSize: '0.875rem',
            color: '#d25959',
            hoverColor: '#d25959',
            display: "flex",
            alignItems: "center",
            height: "2.5rem",
            backgroundColor: "#f3f0eb",
            hoverBackgroundColor: "#f3f0eb",
            borderRight: "3px solid #d25959",
            userSelect: "none"
        },
        // 功能選單Li文字
        leftModeMenuLiTtext: {
            cursor: "inherit",
            color: "inherit",
            fontSize: "inherit",
            margin: "0 0 0 0.9rem",
            userSelect: "none"
        },
        // 功能選單Li文字 被點擊
        leftModeMenuLiTtextClicked: {
            cursor: "inherit",
            color: "#964f18",
            fontSize: "inherit",
            margin: "0 0 0 0.9rem",
            userSelect: "none"
        },
        //#endregion
        //#region 小於768的頂部欄
        //外層容器
        topModeBasicContainer: {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "inline-block",
            width: "100vw",
            backgroundColor: "#fff",
            color: "#444",
            textAlign: "center",
            borderBottom: ".5px solid #ddd",
            //border-right: 1px solid #e5e5e5;
            height: "4.5rem",
            tablet: {
                display: "none",
            }
        },
        //展開功能選單
        topModeMenuContainerExpand: {
            zIndex: 2,
            position: "fixed",
            top: "4.5rem",
            left: 0,
            display: "inline-block",
            width: "60%",
            backgroundColor: "#8c756a",
            color: "#fff",
            float: "left",
            height: "calc( 100vh - 4.5rem )",
            transition: "left .3s ease-in-out",
            tablet: {
                display: "none",
            }
        },
        //收合功能選單
        topModeMenuContainerCollapse: {
            zIndex: 2,
            position: "fixed",
            top: "4.5rem",
            display: "inline-block",
            width: "60%",
            backgroundColor: "#8c756a",
            color: "#fff",
            float: "left",
            height: "calc( 100vh - 4.5rem )",
            left: "-60%",
            transition: "left .3s ease-in-out",
            tablet: {
                display: "none",
            }
        },
        // 背景遮罩
        topModeMenuContainerBackgroundExpand: {
            position: "fixed",
            zIndex: 1,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#bbb8b6",
            left: "0",
            transition: "left 0s ease-in-out",
            tablet: {
                display: "none",
            }
        },
        // 背景遮罩
        topModeMenuContainerBackgroundCollapse: {
            position: "fixed",
            zIndex: 1,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#bbb8b6",
            left: "-100vw",
            transition: "left 0s ease-in-out",
            tablet: {
                display: "none",
            }
        },
        // 功能選單Ul
        topModeMenuUl: {
            zIndex: 3,
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
        },
        // 功能選單Li
        topModeMenuLi: {
            paddingLeft: '1.6rem',
            fontSize: '0.875rem',
            color: '#fff',
            hoverColor: '#fff',
            display: "flex",
            alignItems: "center",
            height: "2.5rem",
            hoverBackgroundColor: "#a58b7f",
            userSelect: "none"
        },
        // 功能選單Li 被點擊
        topModeMenuLiClicked: {
            paddingLeft: '1.6rem',
            fontSize: '0.875rem',
            color: '#d25959',
            hoverColor: '#d25959',
            display: "flex",
            alignItems: "center",
            height: "2.5rem",
            backgroundColor: "#f3f0eb",
            hoverBackgroundColor: "#f3f0eb",
            borderRight: "3px solid #d25959",
            userSelect: "none"
        },
        //border-bottom: .5px solid #ffffff26;

        //#endregion
    }
}