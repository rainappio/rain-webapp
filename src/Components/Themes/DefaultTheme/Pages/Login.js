export default {
    loginContainer: {
        zIndex:"100",
        height: "100vh",
        backgroundColor: "#f7f1ed",
        //padding: "7rem 0 0 0",
        direction: "row",
        justify: "center",
        alignItems: "center",
    },
    loginCardContainer: {
        width: "20.5rem",
        tablet: {
            width: "27.5rem",
        }
    },
    imgContainer: {
        width: "100%",
        margin: "0 auto 0.75rem",
        textAlign: "center",
        tablet: {
            width: "100%",
            textAlign: "center",
            margin: "0 auto 1rem"
        }
    },
    BigTitle: {
        display: "block",
        width: "100%",
        fontWeight: "600",
        fontSize: "1.375rem",
        textAlign: "center",
        margin: "0 0 .15rem 0",
        color: "#444",
        userSelect:"none",
        tablet: {
            display: "block",
            width: "100%",
            fontWeight: "600",
            fontSize: "2rem",
            textAlign: "center",
            margin: "0 0 1rem 0",
            color: "#444",
            userSelect:"none"
        },
    },
    SubTitle: {
        display: "block",
        width: "100%",
        fontWeight: "600",
        fontSize: "1.125rem",
        textAlign: "center",
        color: "#444",
        userSelect:"none",
        tablet: {
            display: "block",
            width: "100%",
            fontWeight: "600",
            fontSize: "2rem",
            textAlign: "center",
            color: "#444",
            userSelect:"none"
        },
    },
    loginFormContainer: {
        width: "100%",
        boxShadow: "0 2px 4px #0000001a",
        backgroundColor: "#fff",
        border: "1px solid #eee",
        margin: "0.5rem 0 0 0",
        padding: "1.5rem 0",
        borderRadius: "8px",
        tablet: {
            width: "100%",
            boxShadow: "0 2px 4px #0000001a",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            margin: "2rem 0 0 0",
            padding: "3rem 0",
            borderRadius: "8px"
        }
    },
    loginForm: {
        width: "100%",
    },
    accountInput: {
        inputSubContainer: {
            occupy: 12,
            textAlign: "center",
        },
        inputBasicContainer: {
            width: "15rem",
            margin: "0 0 1.5rem 0",
            display: "inline-block",
            backgroundColor: "#fff",
            borderRadius: "20px"
        },
        input: {
            textAlign: "center",
            border: "1px solid #444",
            borderRadius: "20px",
            fontSize: ".875em",
            focusBackgroundColor: "#fffcf4",
            inputHeight: "2.5rem", // 輸入框高度
            inputWidth: "15rem", //輸入框寬度
            inputMarginLeft: "0.75rem", // 左方Label與輸入框 間格，預設 0.5rem
            inputMarginRight: "2rem", // 右方Label與輸入框 間格，預設 0.5rem
        },
    },
    loginButton: {
        backgroundColor: "#964f19",
        color: "#fff",
        borderRadius: "20px",
        textAlign: "center",
        fontSize: ".875em",
        cursor: "pointer",
        fontWeight: 400,
        width: "140px",
        height: "40px",
        lineHeight: "40px",
        margin: "auto auto 12px",
        hoverBackgroundColor: "#6d3f00",
    },
    forgetText: {
        height: "14px",
        fontSize: ".75em",
        lineHeight: "14px",
        color: "#666",
        margin: "8px 0 0 0",
        userSelect:"none"
    },
    forgetTextRight: {
        height: "14px",
        fontSize: ".75em",
        lineHeight: "14px",
        color: "#964f19",
        margin: "8px 0 0 0",
        userSelect:"none"
    }
}