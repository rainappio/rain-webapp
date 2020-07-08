import React, { useContext, useCallback } from 'react';
import { Context } from '../../Store/store';
import { Container, BasicContainer } from '../../Components/Containers'
import { Text } from '../../Components/Texts'
import { FormControl, FormRow, TextInput } from '../../Components/Forms'
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../Handlers/LocalStorageHandler'
import { useForm } from '../../SelfHooks/useForm'
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { EasyButton } from '../../Components/Buttons';
import { Redirect } from 'react-router-dom';
import { useLoginAsync } from '../../SelfHooks/useAsync';

export const Login = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const { pages: { login } } = Theme;
    const [Account, Accounthandler, AccountregExpResult] = useForm("", ["^.{1,}$"], ["必須輸入名稱"]);
    const [Pass, Passhandler, PassregExpResult] = useForm("", ["^.{1,}$"], ["必須輸入名稱"]);
    //let history = useHistory();

    const loginVerification = useCallback(async () => {
        //let uid = "";
        await fetch(`${APIUrl}/api/Login/JWTToken?name=${Account}&pass=${Pass}`)//取得Token
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.success) {
                    setItemlocalStorage("Auth", PreResult.token);
                } else {
                    console.log(PreResult)
                    if (PreResult?.message) {
                        //setMessage(PreResult.message);
                    }
                    throw new Error("取得Token失敗");
                }
            })
            .catch((Error) => {
                throw Error;
            })
            .finally(() => {
                //Switch();//觸發LS路由重新更新
            });

        await fetch(`${APIUrl}/api/User/GetInfoByToken?token=${getItemlocalStorage("Auth")}`)//透過Token取得使用者資訊
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                console.log(PreResult)
                if (PreResult.success) {
                    //儲存 跨組件State LoginName: "test",
                    setItemlocalStorage("LoginName", PreResult.response.uRealName);
                    //uid = PreResult.response.Id;
                } else {
                    clearlocalStorage();
                    throw new Error("取得使用者資訊失敗");
                }
            })
            .catch((Error) => {
                clearlocalStorage();
                throw Error;
            })
            .finally(() => {
                Switch();//觸發LS路由重新更新
            });
        //#region slllc多打的API、取回側邊欄、單位資料
        // await fetch(`${APIUrl}api/Permission/GetNavigationBar?uid=${uid}`,
        //     {
        //         headers: {
        //             'content-type': 'application/json',
        //             'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
        //         },
        //     }
        // )//側邊欄請求
        //     .then(Result => {
        //         const ResultJson = Result.clone().json();//Respone.clone()
        //         return ResultJson;
        //     })
        //     .then((PreResult) => {
        //         if (PreResult.success) {
        //             setItemlocalStorage("LeftSideData", JSON.stringify(PreResult.response.children))

        //             let pagesCanUseButtonByRole = {};
        //             (PreResult?.response?.children ?? []).forEach((item, index) => {
        //                 if (item.path === "-") {
        //                     //從用戶角色管理 下 具子列表
        //                     (item.children ?? []).forEach((subItem, subIndex) => {
        //                         let arr = [];
        //                         (subItem.children ?? []).forEach((sub1Item, sub1Index) => {
        //                             arr.push(sub1Item.name)
        //                         })
        //                         pagesCanUseButtonByRole[subItem.name] = arr;
        //                     })
        //                 } else {
        //                     //從用戶角色管理 下 不具子列表
        //                     //考慮第一層要加
        //                 }
        //             })
        //             setItemlocalStorage("PagesCanUseButtonByRole", JSON.stringify(pagesCanUseButtonByRole));

        //         } else {
        //             clearlocalStorage();
        //             throw new Error("側邊欄請求失敗");
        //         }
        //         //history.push("/");
        //     })
        //     .catch((Error) => {
        //         clearlocalStorage();
        //         throw Error;
        //     })
        //     .finally(() => {
        //         //Switch();//觸發LS路由重新更新
        //     });

        // return await fetch(`${APIUrl}api/School/GetUnits`,
        //     {
        //         headers: {
        //             'content-type': 'application/json',
        //             'Authorization': `Bearer ${getItemlocalStorage("Auth")}`
        //         },
        //     }
        // )//單位獲取
        //     .then(Result => {
        //         const ResultJson = Result.clone().json();//Respone.clone()
        //         return ResultJson;
        //     })
        //     .then((PreResult) => {
        //         setItemlocalStorage("GetUnits", JSON.stringify(PreResult));
        //         return "登入成功"

        //         //history.push("/");
        //     })
        //     .catch((Error) => {
        //         clearlocalStorage();
        //         throw Error;
        //     })
        //     .finally(() => {
        //         Switch();//觸發LS路由重新更新
        //     });
        //#endregion

    }, [Account, APIUrl, Pass, Switch])

    const [execute] = useLoginAsync(loginVerification, false);
    return (
        <>
            {(localStorage.getItem("Auth") === null) ? (<Container theme={login.loginContainer}>
                <BasicContainer theme={login.loginCardContainer}>
                    <BasicContainer theme={login.imgContainer}>
                        <img alt="sdf" width="200" style={{ userSelect: "none" }} height="42.36" src={"./bdcb328.png"}></img>
                    </BasicContainer>
                    <Text theme={login.BigTitle}>阿瘦集團足健管理系統</Text>
                    <Text theme={login.SubTitle}>管理員登入</Text>
                    <BasicContainer theme={login.loginFormContainer}>
                        <FormControl theme={login.loginForm} sumbit={true} onSubmit={(e) => { e.preventDefault(); execute(); }}>
                            <FormRow>
                                <TextInput
                                    icon={<PersonIcon style={{ width: "1.2rem" }} />}
                                    value={Account}
                                    onChange={Accounthandler}
                                    regExpResult={AccountregExpResult}
                                    placeholder={"管理員帳號"}
                                    theme={{ ...login.accountInput }}>
                                </TextInput>

                            </FormRow>
                            <FormRow>
                                <TextInput
                                    icon={<VpnKeyIcon style={{ width: "1.2rem" }} />}
                                    value={Pass}
                                    onChange={Passhandler}
                                    regExpResult={PassregExpResult}
                                    placeholder={"管理員密碼"}
                                    pass
                                    theme={{
                                        ...login.accountInput, input: {
                                            ...login.accountInput.input,
                                            ...(Pass.length > 0 ? { letterSpacing: "0.5rem" } : {})
                                        }
                                    }}>
                                </TextInput>
                            </FormRow>
                            <FormRow>
                                <EasyButton theme={login.loginButton} text={"立即登入"} onClick={() => { console.log("sdf") }}></EasyButton>
                            </FormRow>
                            <FormRow>
                                <BasicContainer theme={{ textAlign: "center", width: "100%" }}>
                                    <Text theme={login.forgetText}>忘記密碼了嗎？</Text>
                                    <Text theme={login.forgetTextRight}> 寄送 Email 重設密碼</Text>
                                </BasicContainer>
                            </FormRow>
                        </FormControl>
                    </BasicContainer>
                </BasicContainer>
            </Container>
            ) :
                <Redirect to={{ pathname: "/" }} />
            }
        </>
    )
}