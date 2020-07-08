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
// import { UserRoles } from '../Pages/MainPages/UserRoles';
// import { UserUsers } from '../Pages/MainPages/UserUsers';
// import { UserAuthority } from '../Pages/MainPages/UserAuthority';
//import { SystemMy } from '../Pages/MainPages/SystemMy';
import { Login } from '../Pages/MainPages/Login';

/* 
   Date   : 2020-06-17 14:08:30
   Author : Arhua Ho
   Content: icon的映射關係
*/
export const iconMap = {
   "fa-users": <PeopleIcon />,
   "fa-sitemap": <AccountTreeIcon />,
   SupervisedUserCircleIcon: <SupervisedUserCircleIcon />,
   DateRangeIcon: <DateRangeIcon />,
   AirportShuttleIcon: <AirportShuttleIcon />,
   ViewListIcon: <ViewListIcon />,
   FormatLineSpacingIcon: <FormatLineSpacingIcon />,
   ReplayIcon: <ReplayIcon />,
   SaveIcon: <SaveIcon />,
}

/* 
   Date   : 2020-06-17 15:28:31
   Author : Arhua Ho
   Content: 頂部導航列標題對應
*/
export const navbarTitleMapping = {
   "/User/Roles": "用戶角色管理 / 角色管理",
   "/User/Users": "用戶角色管理 / 用戶管理",
   "/User/Authority": "用戶角色管理 / 權限分配",
   "/Permission/Module": "菜單權限管理 / 接口管理",
   "/Permission/Permission": "菜單權限管理 / 菜單管理",
   "/Localation/Customer": "門市與人員名單 / 顧客名單",
   "/Localation/FootMaster": "門市與人員名單 / 足健師名單",
   "/Localation/Shop": "門市與人員名單 / 門市名單",
   "/Order/OrderList1": "預約狀況 / 預約件數",
   "/Order/OrderList2": "預約狀況 / 預約率總覽",
   "/Order/OrderList": "預約狀況 / 預約清單",
   "/Despatch/DespatchTable": "任務調度 / 派遣單總覽",
   "/Despatch/DespatchList": "任務調度 / 足健師派遣",
   "/New/From": "新增問券",
   "/System/My": "系統管理 / 個人中心",
   "/404": "無此分頁",
   "/": "歡迎您",
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
   "/": <Home />,
   "/404": < Error404 />,
   "/Login": <Login />,
};
