/* 
   Date   : 2020-06-09 15:47:33
   Author : Arhua Ho
   Content: 映射拆分管理
*/
import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import ViewListIcon from '@material-ui/icons/ViewList';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import { Error404 } from '../Pages/ErrorPages/Error404';
import { Home } from '../Pages/MainPages/Home';
import { Administrators } from "../Pages/MainPages/Administrators";
import { Locations } from "../Pages/MainPages/Locations";
import { Experts } from "../Pages/MainPages/Experts";
import { Customers } from "../Pages/MainPages/Customers";
import { Dispatch } from "../Pages/MainPages/Dispatch";
import { DispatchBoard } from "../Pages/MainPages/DispatchBoard";
import { ReservationList } from "../Pages/MainPages/ReservationList";
import { Percentage } from "../Pages/MainPages/Percentage";
// import { UserRoles } from '../Pages/MainPages/UserRoles';
// import { UserUsers } from '../Pages/MainPages/UserUsers';
// import { UserAuthority } from '../Pages/MainPages/UserAuthority';
//import { SystemMy } from '../Pages/MainPages/SystemMy';
import { Login } from '../Pages/MainPages/Login';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StoreIcon from '@material-ui/icons/Store';
import SettingsIcon from '@material-ui/icons/Settings';

/* 
   Date   : 2020-06-17 14:08:30
   Author : Arhua Ho
   Content: icon的映射關係
*/
export const iconMap = {
   "預約件數": <DoneAllIcon />,
   "預約率總覽": <ViewListOutlinedIcon />,
   "預約清單": <ListAltIcon />,
   "派遣單總覽": <ViewQuiltIcon />,
   "足健師派遣": <BusinessCenterOutlinedIcon />,
   "顧客名單": <PeopleIcon />,
   "足健師名單": <AssignmentIndIcon />,
   "門市名單": <StoreIcon />,
   "管理員名單": <SettingsIcon />,
}

/* 
   Date   : 2020-06-17 15:28:31
   Author : Arhua Ho
   Content: 頂部導航列標題對應
*/
export const navbarTitleMapping = {
   "/Administrators": "管理員名單",// 管理員名單
   "/Locations": "門市名單",// 門市名單
   "/Experts": "足健師名單",// 足健師名單
   "/Customers": "顧客名單",// 顧客名單
   "/Dispatch": "足健師派遣",// 足健師派遣
   "/DispatchBoard": "派遣單總覽",// 派遣單總覽
   "/ReservationList": "預約清單",// 預約清單
   "/Percentage": "預約率總覽",// 預約率總覽
   "/": "預約件數",// 預約件數
   "/404": "錯誤頁面",
   "/Login": "登入頁面",
};

export const urlMapping = {
   // "/User/Roles": <UserRoles />,
   // "/User/Users": <UserUsers />,
   // "/User/Authority": <UserAuthority />,
   // "/Permission/Module": <PermissionModule />,
   // "/Permission/Permission": <PermissionPermission />,
   // "/Localation/Customer": <LocalationCustomer />,
   // "/Localation/FootMaster": <LocalationFootMaster />,
   // "/Localation/Shop": <LocalationShop />,
   // "/Order/OrderList1": <OrderOrderList1 />,
   // "/Order/OrderList2": <OrderOrderList2 />,
   // "/Order/OrderList": <OrderOrderList />,
   // "/Despatch/DespatchTable": <DespatchDespatchTable />,
   // "/Despatch/DespatchList": <DespatchDespatchList />,
   // "/New/From": <NewFrom />,
   // "/System/My": <SystemMy />,
   "/Administrators": <Administrators />,// 管理員名單
   "/Locations": <Locations />,// 門市名單
   "/Experts": <Experts />,// 足健師名單
   "/Customers": <Customers />,// 顧客名單
   "/Dispatch": <Dispatch />,// 足健師派遣
   "/DispatchBoard": <DispatchBoard />,// 派遣單總覽
   "/ReservationList": <ReservationList />,// 預約清單
   "/Percentage": <Percentage />,// 預約率總覽
   "/": <Home />,// 預約件數
   "/404": < Error404 />,
   "/Login": <Login />,
};
