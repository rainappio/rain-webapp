export default {
    jumpAlerts: {
        //#region 預設樣式
        //#region 容器
        basicContainer: {
            zIndex: 1100,
            width: "fit-content",
            position: "fixed",
            top: "0rem",
            right: "0rem",
            padding: "0.3rem"
        },
        //#endregion
        //#region Alert本體容器
        alertContainer: {
            boxShadow: "0 2px 4px #0000001a",
            borderRadius: "4px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            width: "100%",
            height: "3.75rem",
            margin: "0.5rem 0",
            padding: "0 0.5rem 0 3rem",
        },
        //#region Alert文字樣式
        alertText: {
            display: "block",
            fontWeight: "600",
            color: "#444",
            userSelect: "none",
            height: "3.75rem",
            lineHeight: "3.75rem"
        }
        //#endregion
        //#endregion
        //#endregion
    }
}
