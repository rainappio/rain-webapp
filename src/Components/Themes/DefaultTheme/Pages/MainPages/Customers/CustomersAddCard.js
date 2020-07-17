export default {
    masterNoFormCardTextInput: () => {
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
                padding: "0 0.1rem 0 0.2rem"
            },
            inputBasicContainer: {
                width: "100%",
            }
        }
    },
    sexFormCardSelector: {
        selectSubContainer: {
            occupy: 4,
            padding: "0 0.1rem 0 0.2rem"
        },
        selectBasicContainer: {
            width: "100%",
        }
    },
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
                    padding: "0 0.1rem 0 0.2rem"
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
                    padding: "0 0.1rem 0 0.2rem"
                }
            }
        }
    },
    phoneFormCardTextInput: {
        input: {
            height: "2rem",
            lineHeight: "2rem",
            fontSize: "0.75rem",
            borderBottom: "#444444 1px solid",
            borderRadius: "0rem",
        },
        inputSubContainer: {
            occupy: 12,
            padding: "0 0.1rem 0 0.2rem"
        }
    },
    locationFormCardTextInput: {
        selectSubContainer: {
            occupy: 5,
            padding: "0 0.1rem 0 0"
        }
    },
    serviceAreaFormCardLabel: {
        cityCheckBoxGroupSubContainer: {
            occupy: 12,
            padding: "0 0.1rem 0 0.2rem"
        }
    },
    workTimeSubContainer: {
        occupy: 12,
        padding: "0.5rem 0 0 0.2rem",
    },
    workTimeText: {
        color: "#444",
        fontSize: "1rem",
        fontWeight: 700,
        userSelect: "none"
    },
    daySubContainer: {
        occupy: 1, padding: "0.38rem 0 0 0.3rem",
    },
    dayText: {
        color: "#666",
        fontSize: "0.75rem",
        fontWeight: 700,
        userSelect: "none"
    },
    splitSubContainer: {
        occupy: 1,
        padding: "0.38rem 0 0 0.3rem",
    },
    addformCard: {
        formCard: {
            zIndex: "1001",
            padding: "1.25rem 0rem 1.25rem 1.25rem",
            boxShadow: "0 2px 4px #0000001a",
            borderRadius: "4px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            minWidth: "0",
            width: "35rem",
            height: "calc( 100% - 18rem )",
            tablet: {
                borderRadius: "16px",
            }
        }
    }
}

