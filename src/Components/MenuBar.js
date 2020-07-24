import React, { useContext, useState } from 'react';
import { BasicContainer } from './Containers';
import { Context } from '../Store/store'
import { Text } from './Texts';
import { EasyButton } from './Buttons';
import { Ul, Li } from './Lists';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { iconMap, navbarTitleMapping } from '../Mappings/Mappings'
import SortIcon from '@material-ui/icons/Sort';
import { portalService } from './Portal';
import { clearlocalStorage } from '../Handlers/LocalStorageHandler';

export const MenuBar = (props) => {
    //document.documentElement.clientWidth ,can by js controll responed
    const { Theme } = useContext(Context);
    const { menuBar } = Theme;
    const [OpenMenu, setOpenMenu] = useState(false);
    let location = useLocation();
    let history = useHistory();

    return (
        <>
            {/* 大於768的側邊欄 */}
            {/* 超出大小設置沒做 */}
            <BasicContainer theme={menuBar.leftModeBasicContainer}>
                {/* 圖片 */}
                <BasicContainer theme={menuBar.leftModeImgContainer}>
                    <img alt="sdf" width="150" style={{ userSelect: "none" }} height="31.33" src={"/2db8549.png"}></img>
                </BasicContainer>
                {/* 標題 */}
                <BasicContainer theme={menuBar.leftModeTitleContainer}>
                    <Text theme={menuBar.leftModeTitleText}>
                        阿瘦集團活動管理系統
                    </Text>
                </BasicContainer>
                {/* 登入者名稱、登出按鈕 */}
                <BasicContainer theme={menuBar.leftModeLoginNameContainer}>
                    <Text theme={menuBar.leftModeLoginNameTitle}>
                        管理員
                    </Text>
                    <Text theme={menuBar.leftModeLoginNameText}>
                        {localStorage.getItem("LoginName")}
                    </Text>
                    <EasyButton theme={menuBar.leftModeLoginNameButton} text={"登出"}
                        onClick={() => {
                            portalService.normal({
                                autoClose: false,
                                yes: () => { clearlocalStorage(); history.push("/Login"); },
                                yesText: "是",
                                noText: "否",
                                content: (
                                    <>
                                        <Text theme={{
                                            display: "block",
                                            textAlign: "center",
                                            color: "#595959",
                                            fontSize: "1.5rem",
                                            fontWeight: 600
                                        }}>
                                            {`確定要登出嗎?`}
                                        </Text>

                                    </>)
                            })
                        }}
                    ></EasyButton>
                </BasicContainer>
                {/* 功能選單，寫死的 */}
                <BasicContainer theme={menuBar.leftModeMenuContainer}>
                    {/* 預約狀況 */}
                    <Text theme={menuBar.leftModeUlTitle}>預約狀況</Text>
                    <Ul theme={menuBar.leftModeMenuUl}>
                        <Link to={"/"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["預約件數"]}
                                <Text theme={(location.pathname === "/" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約件數</Text>
                            </Li>
                        </Link>
                        <Link to={"/Percentage"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Percentage" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["預約率總覽"]}
                                <Text theme={(location.pathname === "/Percentage" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約率總覽</Text>
                            </Li>
                        </Link>
                        <Link to={"/ReservationList"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/ReservationList" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["預約清單"]}
                                <Text theme={(location.pathname === "/ReservationList" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約清單</Text>
                            </Li>
                        </Link>
                    </Ul>
                    {/* 任務調度 */}
                    <Text theme={menuBar.leftModeUlTitle}>任務調度</Text>
                    <Ul theme={menuBar.leftModeMenuUl}>
                        <Link to={"/DispatchBoard"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/DispatchBoard" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["派遣單總覽"]}
                                <Text theme={(location.pathname === "/DispatchBoard" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>派遣單總覽</Text>
                            </Li>
                        </Link>
                        <Link to={"/Dispatch"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Dispatch" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["足健師派遣"]}
                                <Text theme={(location.pathname === "/Dispatch" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>足健師派遣</Text>
                            </Li>
                        </Link>
                    </Ul>
                    {/* 門市與人員名單 */}
                    <Text theme={menuBar.leftModeUlTitle}>門市與人員名單</Text>
                    <Ul theme={menuBar.leftModeMenuUl}>
                        <Link to={"/Customers"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Customers" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["顧客名單"]}
                                <Text theme={(location.pathname === "/Customers" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>顧客名單</Text>
                            </Li>
                        </Link>
                        <Link to={"/Experts"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Experts" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["足健師名單"]}
                                <Text theme={(location.pathname === "/Experts" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>足健師名單</Text>
                            </Li>
                        </Link>
                        <Link to={"/Locations"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Locations" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["門市名單"]}
                                <Text theme={(location.pathname === "/Locations" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>門市名單</Text>
                            </Li>
                        </Link>
                    </Ul>
                    {/* 管理設置 */}
                    <Text theme={menuBar.leftModeUlTitle}>管理設置</Text>
                    <Ul theme={menuBar.leftModeMenuUl}>
                        <Link to={"/Administrators"} style={{ textDecoration: "none", display: "block" }}>
                            <Li theme={(location.pathname === "/Administrators" ? menuBar.leftModeMenuLiClicked : menuBar.leftModeMenuLi)}>
                                {iconMap["管理員名單"]}
                                <Text theme={(location.pathname === "/Administrators" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>管理員名單</Text>
                            </Li>
                        </Link>
                    </Ul>
                </BasicContainer>
            </BasicContainer>

            {/* 小於768的頂部欄 */}
            <BasicContainer theme={menuBar.topModeBasicContainer}>
                {/* 開關功能選單按鈕與顯示目前功能名稱 */}
                <SortIcon onClick={() => { setOpenMenu((o) => (!o)) }} style={{ position: "absolute", left: "1rem", top: "1.5rem", cursor: "pointer" }} />
                <Text theme={{ color: "#444", lineHeight: "4.5rem", fontWeight: 600, fontSize: "1.25rem" }}>{navbarTitleMapping[location.pathname] ?? navbarTitleMapping[`/${location.pathname.split("/")[1]}/`]}</Text>
                {/* 功能選單，寫死的 */}
                <BasicContainer onClick={() => { setOpenMenu(false) }} theme={OpenMenu ? menuBar.topModeMenuContainerBackgroundExpand : menuBar.topModeMenuContainerBackgroundCollapse} >
                    <BasicContainer theme={OpenMenu ? menuBar.topModeMenuContainerExpand : menuBar.topModeMenuContainerCollapse}>

                        {/* 預約狀況 */}
                        <Ul theme={menuBar.topModeMenuUl}>
                            <Link to={"/"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["預約件數"]}
                                    <Text theme={(location.pathname === "/" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約件數</Text>
                                </Li>
                            </Link>
                            <Link to={"/Percentage"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Percentage" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["預約率總覽"]}
                                    <Text theme={(location.pathname === "/Percentage" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約率總覽</Text>
                                </Li>
                            </Link>
                            <Link to={"/ReservationList"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/ReservationList" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["預約清單"]}
                                    <Text theme={(location.pathname === "/ReservationList" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>預約清單</Text>
                                </Li>
                            </Link>
                        </Ul>
                        {/* 任務調度 */}
                        {/* <Ul theme={menuBar.topModeMenuUl}>
                            <Link to={"/DispatchBoard"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/DispatchBoard" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["派遣單總覽"]}
                                    <Text theme={(location.pathname === "/DispatchBoard" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>派遣單總覽</Text>
                                </Li>
                            </Link>
                            <Link to={"/Dispatch"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Dispatch" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["足健師派遣"]}
                                    <Text theme={(location.pathname === "/Dispatch" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>足健師派遣</Text>
                                </Li>
                            </Link>
                        </Ul> */}
                        {/* 門市與人員名單 */}
                        <Ul theme={menuBar.topModeMenuUl}>
                            <Link to={"/Customers"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Customers" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["顧客名單"]}
                                    <Text theme={(location.pathname === "/Customers" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>顧客名單</Text>
                                </Li>
                            </Link>
                            <Link to={"/Experts"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Experts" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["足健師名單"]}
                                    <Text theme={(location.pathname === "/Experts" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>足健師名單</Text>
                                </Li>
                            </Link>
                            <Link to={"/Locations"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Locations" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["門市名單"]}
                                    <Text theme={(location.pathname === "/Locations" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>門市名單</Text>
                                </Li>
                            </Link>
                        </Ul>
                        {/* 管理設置 */}
                        <Ul theme={menuBar.topModeMenuUl}>
                            <Link to={"/Administrators"} style={{ textDecoration: "none", display: "block" }}>
                                <Li onClick={() => { setOpenMenu(false) }} theme={(location.pathname === "/Administrators" ? menuBar.topModeMenuLiClicked : menuBar.topModeMenuLi)}>
                                    {iconMap["管理員名單"]}
                                    <Text theme={(location.pathname === "/Administrators" ? menuBar.leftModeMenuLiTtextClicked : menuBar.leftModeMenuLiTtext)}>管理員名單</Text>
                                </Li>
                            </Link>
                        </Ul>
                    </BasicContainer>
                </BasicContainer>
            </BasicContainer>
        </>
    )
}