export default {
    passFormCardTextInput: (len) => {
        if (len > 0) {
            return {
                input: {
                    height: "2rem",
                    lineHeight: "2rem",
                    fontSize: "0.75rem",
                    borderBottom: "#444444 1px solid",
                    borderRadius: "0rem",
                    //letterSpacing: "0.5rem"
                },
                inputSubContainer: {
                    occupy: 6,
                }
            }
        } else {
            return {
                input: {
                    height: "2rem",
                    lineHeight: "2rem",
                    fontSize: "0.75rem",
                    borderBottom: "#444444 0px solid",
                    borderRadius: "0rem",
                },
                inputSubContainer: {
                    occupy: 4,
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
            //height: '2.25rem',
            padding: "0 0.1rem 0 0"
        },
        selectBasicContainer: {
            margin: '0 2rem 0 0',
            height: '2.25rem',
        }
    },
    addformCard: {
        formCard: {
            zIndex: "1001",
            padding: "1.25rem 0rem 0 1.25rem",
            boxShadow: "0 2px 4px #0000001a",
            borderRadius: "4px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            minWidth: "0",
            width: "35rem",
            height: "calc( 100% - 36rem )",
            tablet: {
                borderRadius: "16px",
            }
        },
        yesButton: {
            margin: "-0.2rem 0.5rem 0 0",
            backgroundColor: "#fff",
            display: "inline-block",
            width: "5.5rem",
            height: "2rem",
            lineHeight: "2rem",
            color: "#964f19",
            border: "1px solid #964f19",
            borderRadius: "1.25rem",
            textAlign: "center",
            hoverBackgroundColor: "#964f19",
            hoverColor: "#fff",
            fontSize: "0.875rem",
            cursor: "pointer",
        },
        noButton: {
            margin: "-0.2rem 0 0 0",
            backgroundColor: "#fff",
            display: "inline-block",
            width: "5.5rem",
            height: "2rem",
            lineHeight: "2rem",
            color: "#d25959",
            border: "1px solid #d25959",
            borderRadius: "1.25rem",
            textAlign: "center",
            hoverBackgroundColor: "#d25959",
            hoverColor: "#fff",
            fontSize: "0.875rem",
            cursor: "pointer",
        },
    },
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

}

