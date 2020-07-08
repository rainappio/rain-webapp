export default {
    ul: {
        //#region 左側邊欄展開父層ul樣式
        leftSideFullUl: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
        },
        //#endregion
        //#region 左側邊欄展開子層ul樣式
        leftSideFullUlSub: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "3rem",
        },
        //#endregion
        //#region 左側邊欄收合父層ul樣式
        leftSideSimpleUl: {
            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0.4rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
        },
        //#endregion
        //#region 左側邊欄收合子層ul樣式
        leftSideSimpleUlSub: {
            position: "absolute",
            top: "4.1rem",
            backgroundColor: "#2f3e52",
            left: "3.4rem",
            zIndex: 400,
            width: '15rem',
            borderRadius: "0.3rem",

            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
        },
        //#endregion
        //#region 頂部導航列ul樣式
        navbarMenuUl: {
            position: "absolute",
            top: "3rem",
            backgroundColor: "#fff",
            right: "2.4rem",
            zIndex: 301,
            width: '6rem',
            borderRadius: "0.3rem",
            border: "1px solid #ebeef5",
            boxShadow: "0 2px 12px 0 #0000001a",

            display: "block",
            listStyleType: "none",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginInlineStart: "0rem",
            marginInlineEnd: "0rem",
            paddingInlineStart: "0rem",
        },
        //#endregion
    },
    li: {
        //#region 左側邊欄展開父層li樣式
        leftSideFullLi: {
            paddingLeft: '0.5rem',
            fontSize: '1rem',
            color: '#fff',
            hoverColor: '#ffd04b',
        },
        //#endregion
        //#region 左側邊欄展開子層li樣式
        leftSideFullLiSub: {
            paddingLeft: '0.5rem',
            fontSize: '1rem',
            color: '#fff',
            hoverColor: '#ffd04b',
        },
        //#endregion
        //#region 左側邊欄展開父層li樣式
        leftSideSimpleLi: {
            paddingLeft: '0.5rem',
            fontSize: '1rem',
            color: '#fff',
            hoverColor: '#ffd04b',
        },
        //#endregion
        //#region 左側邊欄展開子層li樣式
        leftSideSimpleLiSub: {
            paddingLeft: '0.5rem',
            fontSize: '1rem',
            color: '#fff',
            hoverColor: '#ffd04b',
        },
        //#endregion
        //#region 左側邊欄展開父層li樣式
        navbarMenuLi: {
            paddingLeft: '0.5rem',
            fontSize: '0.8rem',
            color: "#606266",
            hoverColor: "#66b1ff",
        },
        //#endregion
    }
}