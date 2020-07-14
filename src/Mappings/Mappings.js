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
import { Test } from "../Pages/MainPages/Test";
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
   "/Test": "測試組件頁面",// 測試組件頁面
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
   "/Test": <Test />,// 測試組件頁面
   "/404": < Error404 />,
   "/Login": <Login />,
};

//#region 地區與轄下區域
export const cityAndCounties = {
   //#region 臺北市
   臺北市: [
      { value: "臺北市中正區", label: "中正區" },
      { value: "臺北市大同區", label: "大同區" },
      { value: "臺北市中山區", label: "中山區" },
      { value: "臺北市萬華區", label: "萬華區" },
      { value: "臺北市信義區", label: "信義區" },
      { value: "臺北市松山區", label: "松山區" },
      { value: "臺北市大安區", label: "大安區" },
      { value: "臺北市南港區", label: "南港區" },
      { value: "臺北市北投區", label: "北投區" },
      { value: "臺北市內湖區", label: "內湖區" },
      { value: "臺北市士林區", label: "士林區" },
      { value: "臺北市文山區", label: "文山區" },
   ],
   //#endregion
   //#region 新北市
   新北市: [
      { value: "新北市板橋區", label: "板橋區" },
      { value: "新北市新莊區", label: "新莊區" },
      { value: "新北市泰山區", label: "泰山區" },
      { value: "新北市林口區", label: "林口區" },
      { value: "新北市淡水區", label: "淡水區" },
      { value: "新北市金山區", label: "金山區" },
      { value: "新北市八里區", label: "八里區" },
      { value: "新北市萬里區", label: "萬里區" },
      { value: "新北市石門區", label: "石門區" },
      { value: "新北市三芝區", label: "三芝區" },
      { value: "新北市瑞芳區", label: "瑞芳區" },
      { value: "新北市汐止區", label: "汐止區" },
      { value: "新北市平溪區", label: "平溪區" },
      { value: "新北市貢寮區", label: "貢寮區" },
      { value: "新北市雙溪區", label: "雙溪區" },
      { value: "新北市深坑區", label: "深坑區" },
      { value: "新北市石碇區", label: "石碇區" },
      { value: "新北市新店區", label: "新店區" },
      { value: "新北市坪林區", label: "坪林區" },
      { value: "新北市烏來區", label: "烏來區" },
      { value: "新北市中和區", label: "中和區" },
      { value: "新北市永和區", label: "永和區" },
      { value: "新北市土城區", label: "土城區" },
      { value: "新北市三峽區", label: "三峽區" },
      { value: "新北市樹林區", label: "樹林區" },
      { value: "新北市鶯歌區", label: "鶯歌區" },
      { value: "新北市三重區", label: "三重區" },
      { value: "新北市蘆洲區", label: "蘆洲區" },
      { value: "新北市五股區", label: "五股區" },
   ],
   //#endregion
   //#region 基隆市
   基隆市: [
      { value: "基隆市仁愛區", label: "仁愛區" },
      { value: "基隆市中正區", label: "中正區" },
      { value: "基隆市信義區", label: "信義區" },
      { value: "基隆市中山區", label: "中山區" },
      { value: "基隆市安樂區", label: "安樂區" },
      { value: "基隆市暖暖區", label: "暖暖區" },
      { value: "基隆市七堵區", label: "七堵區" },
   ],
   //#endregion
   //#region 桃園市
   桃園市: [
      { value: "桃園市桃園區", label: "桃園區" },
      { value: "桃園市中壢區", label: "中壢區" },
      { value: "桃園市平鎮區", label: "平鎮區" },
      { value: "桃園市八德區", label: "八德區" },
      { value: "桃園市楊梅區", label: "楊梅區" },
      { value: "桃園市蘆竹區", label: "蘆竹區" },
      { value: "桃園市龜山區", label: "龜山區" },
      { value: "桃園市龍潭區", label: "龍潭區" },
      { value: "桃園市大溪區", label: "大溪區" },
      { value: "桃園市大園區", label: "大園區" },
      { value: "桃園市觀音區", label: "觀音區" },
      { value: "桃園市新屋區", label: "新屋區" },
      { value: "桃園市復興區", label: "復興區" },
   ],
   //#endregion
   //#region 新竹縣
   新竹縣: [
      { value: "新竹縣竹北市", label: "竹北市" },
      { value: "新竹縣竹東鎮", label: "竹東鎮" },
      { value: "新竹縣新埔鎮", label: "新埔鎮" },
      { value: "新竹縣關西鎮", label: "關西鎮" },
      { value: "新竹縣峨眉鄉", label: "峨眉鄉" },
      { value: "新竹縣寶山鄉", label: "寶山鄉" },
      { value: "新竹縣北埔鄉", label: "北埔鄉" },
      { value: "新竹縣橫山鄉", label: "橫山鄉" },
      { value: "新竹縣芎林鄉", label: "芎林鄉" },
      { value: "新竹縣湖口鄉", label: "湖口鄉" },
      { value: "新竹縣新豐鄉", label: "新豐鄉" },
      { value: "新竹縣尖石鄉", label: "尖石鄉" },
      { value: "新竹縣五峰鄉", label: "五峰鄉" },
   ],
   //#endregion
   //#region 新竹市
   新竹市: [
      { value: "新竹市東區", label: "東區" },
      { value: "新竹市北區", label: "北區" },
      { value: "新竹市香山區", label: "香山區" },
   ],
   //#endregion
   //#region 苗栗縣
   苗栗縣: [
      { value: "苗栗縣苗栗市", label: "苗栗市" },
      { value: "苗栗縣通霄鎮", label: "通霄鎮" },
      { value: "苗栗縣苑裡鎮", label: "苑裡鎮" },
      { value: "苗栗縣竹南鎮", label: "竹南鎮" },
      { value: "苗栗縣頭份鎮", label: "頭份鎮" },
      { value: "苗栗縣後龍鎮", label: "後龍鎮" },
      { value: "苗栗縣卓蘭鎮", label: "卓蘭鎮" },
      { value: "苗栗縣西湖鄉", label: "西湖鄉" },
      { value: "苗栗縣頭屋鄉", label: "頭屋鄉" },
      { value: "苗栗縣公館鄉", label: "公館鄉" },
      { value: "苗栗縣銅鑼鄉", label: "銅鑼鄉" },
      { value: "苗栗縣三義鄉", label: "三義鄉" },
      { value: "苗栗縣造橋鄉", label: "造橋鄉" },
      { value: "苗栗縣三灣鄉", label: "三灣鄉" },
      { value: "苗栗縣南庄鄉", label: "南庄鄉" },
      { value: "苗栗縣大湖鄉", label: "大湖鄉" },
      { value: "苗栗縣獅潭鄉", label: "獅潭鄉" },
      { value: "苗栗縣泰安鄉", label: "泰安鄉" },
   ],
   //#endregion
   //#region 臺中市
   臺中市: [
      { value: "臺中市中區", label: "中區" },
      { value: "臺中市東區", label: "東區" },
      { value: "臺中市南區", label: "南區" },
      { value: "臺中市西區", label: "西區" },
      { value: "臺中市北區", label: "北區" },
      { value: "臺中市北屯區", label: "北屯區" },
      { value: "臺中市西屯區", label: "西屯區" },
      { value: "臺中市南屯區", label: "南屯區" },
      { value: "臺中市太平區", label: "太平區" },
      { value: "臺中市大里區", label: "大里區" },
      { value: "臺中市霧峰區", label: "霧峰區" },
      { value: "臺中市烏日區", label: "烏日區" },
      { value: "臺中市豐原區", label: "豐原區" },
      { value: "臺中市后里區", label: "后里區" },
      { value: "臺中市東勢區", label: "東勢區" },
      { value: "臺中市石岡區", label: "石岡區" },
      { value: "臺中市新社區", label: "新社區" },
      { value: "臺中市和平區", label: "和平區" },
      { value: "臺中市神岡區", label: "神岡區" },
      { value: "臺中市潭子區", label: "潭子區" },
      { value: "臺中市大雅區", label: "大雅區" },
      { value: "臺中市大肚區", label: "大肚區" },
      { value: "臺中市龍井區", label: "龍井區" },
      { value: "臺中市沙鹿區", label: "沙鹿區" },
      { value: "臺中市梧棲區", label: "梧棲區" },
      { value: "臺中市清水區", label: "清水區" },
      { value: "臺中市大甲區", label: "大甲區" },
      { value: "臺中市外埔區", label: "外埔區" },
      { value: "臺中市大安區", label: "大安區" },
   ],
   //#endregion
   //#region 南投縣
   南投縣: [
      { value: "南投縣南投市", label: "南投市" },
      { value: "南投縣埔里鎮", label: "埔里鎮" },
      { value: "南投縣草屯鎮", label: "草屯鎮" },
      { value: "南投縣竹山鎮", label: "竹山鎮" },
      { value: "南投縣集集鎮", label: "集集鎮" },
      { value: "南投縣名間鄉", label: "名間鄉" },
      { value: "南投縣鹿谷鄉", label: "鹿谷鄉" },
      { value: "南投縣中寮鄉", label: "中寮鄉" },
      { value: "南投縣魚池鄉", label: "魚池鄉" },
      { value: "南投縣國姓鄉", label: "國姓鄉" },
      { value: "南投縣水里鄉", label: "水里鄉" },
      { value: "南投縣信義鄉", label: "信義鄉" },
      { value: "南投縣仁愛鄉", label: "仁愛鄉" },
   ],
   //#endregion
   //#region 彰化縣
   彰化縣: [
      { value: "彰化縣彰化市", label: "彰化市" },
      { value: "彰化縣員林鎮", label: "員林鎮" },
      { value: "彰化縣和美鎮", label: "和美鎮" },
      { value: "彰化縣鹿港鎮", label: "鹿港鎮" },
      { value: "彰化縣溪湖鎮", label: "溪湖鎮" },
      { value: "彰化縣二林鎮", label: "二林鎮" },
      { value: "彰化縣田中鎮", label: "田中鎮" },
      { value: "彰化縣北斗鎮", label: "北斗鎮" },
      { value: "彰化縣花壇鄉", label: "花壇鄉" },
      { value: "彰化縣芬園鄉", label: "芬園鄉" },
      { value: "彰化縣大村鄉", label: "大村鄉" },
      { value: "彰化縣永靖鄉", label: "永靖鄉" },
      { value: "彰化縣伸港鄉", label: "伸港鄉" },
      { value: "彰化縣線西鄉", label: "線西鄉" },
      { value: "彰化縣福興鄉", label: "福興鄉" },
      { value: "彰化縣秀水鄉", label: "秀水鄉" },
      { value: "彰化縣埔心鄉", label: "埔心鄉" },
      { value: "彰化縣埔鹽鄉", label: "埔鹽鄉" },
      { value: "彰化縣大城鄉", label: "大城鄉" },
      { value: "彰化縣芳苑鄉", label: "芳苑鄉" },
      { value: "彰化縣竹塘鄉", label: "竹塘鄉" },
      { value: "彰化縣社頭鄉", label: "社頭鄉" },
      { value: "彰化縣二水鄉", label: "二水鄉" },
      { value: "彰化縣田尾鄉", label: "田尾鄉" },
      { value: "彰化縣埤頭鄉", label: "埤頭鄉" },
      { value: "彰化縣溪州鄉", label: "溪州鄉" },
   ],
   //#endregion
   //#region 雲林縣
   雲林縣: [
      { value: "雲林縣斗六市", label: "斗六市" },
      { value: "雲林縣斗南鎮", label: "斗南鎮" },
      { value: "雲林縣虎尾鎮", label: "虎尾鎮" },
      { value: "雲林縣西螺鎮", label: "西螺鎮" },
      { value: "雲林縣土庫鎮", label: "土庫鎮" },
      { value: "雲林縣北港鎮", label: "北港鎮" },
      { value: "雲林縣莿桐鄉", label: "莿桐鄉" },
      { value: "雲林縣林內鄉", label: "林內鄉" },
      { value: "雲林縣古坑鄉", label: "古坑鄉" },
      { value: "雲林縣大埤鄉", label: "大埤鄉" },
      { value: "雲林縣崙背鄉", label: "崙背鄉" },
      { value: "雲林縣二崙鄉", label: "二崙鄉" },
      { value: "雲林縣麥寮鄉", label: "麥寮鄉" },
      { value: "雲林縣臺西鄉", label: "臺西鄉" },
      { value: "雲林縣東勢鄉", label: "東勢鄉" },
      { value: "雲林縣褒忠鄉", label: "褒忠鄉" },
      { value: "雲林縣四湖鄉", label: "四湖鄉" },
      { value: "雲林縣口湖鄉", label: "口湖鄉" },
      { value: "雲林縣水林鄉", label: "水林鄉" },
      { value: "雲林縣元長鄉", label: "元長鄉" },
   ],
   //#endregion
   //#region 嘉義縣
   嘉義縣: [
      { value: "嘉義縣太保市", label: "太保市" },
      { value: "嘉義縣朴子市", label: "朴子市" },
      { value: "嘉義縣布袋鎮", label: "布袋鎮" },
      { value: "嘉義縣大林鎮", label: "大林鎮" },
      { value: "嘉義縣民雄鄉", label: "民雄鄉" },
      { value: "嘉義縣溪口鄉", label: "溪口鄉" },
      { value: "嘉義縣新港鄉", label: "新港鄉" },
      { value: "嘉義縣六腳鄉", label: "六腳鄉" },
      { value: "嘉義縣東石鄉", label: "東石鄉" },
      { value: "嘉義縣義竹鄉", label: "義竹鄉" },
      { value: "嘉義縣鹿草鄉", label: "鹿草鄉" },
      { value: "嘉義縣水上鄉", label: "水上鄉" },
      { value: "嘉義縣中埔鄉", label: "中埔鄉" },
      { value: "嘉義縣竹崎鄉", label: "竹崎鄉" },
      { value: "嘉義縣梅山鄉", label: "梅山鄉" },
      { value: "嘉義縣番路鄉", label: "番路鄉" },
      { value: "嘉義縣大埔鄉", label: "大埔鄉" },
      { value: "嘉義縣阿里山鄉", label: "阿里山鄉" },
   ],
   //#endregion
   //#region 嘉義市
   嘉義市: [
      { value: "嘉義市東區", label: "東區" },
      { value: "嘉義市西區", label: "西區" },
   ],
   //#endregion
   //#region 臺南市
   臺南市: [
      { value: "臺南市中西區", label: "中西區" },
      { value: "臺南市東區", label: "東區" },
      { value: "臺南市南區", label: "南區" },
      { value: "臺南市北區", label: "北區" },
      { value: "臺南市安平區", label: "安平區" },
      { value: "臺南市安南區", label: "安南區" },
      { value: "臺南市永康區", label: "永康區" },
      { value: "臺南市歸仁區", label: "歸仁區" },
      { value: "臺南市新化區", label: "新化區" },
      { value: "臺南市左鎮區", label: "左鎮區" },
      { value: "臺南市玉井區", label: "玉井區" },
      { value: "臺南市楠西區", label: "楠西區" },
      { value: "臺南市南化區", label: "南化區" },
      { value: "臺南市仁德區", label: "仁德區" },
      { value: "臺南市關廟區", label: "關廟區" },
      { value: "臺南市龍崎區", label: "龍崎區" },
      { value: "臺南市官田區", label: "官田區" },
      { value: "臺南市麻豆區", label: "麻豆區" },
      { value: "臺南市佳里區", label: "佳里區" },
      { value: "臺南市西港區", label: "西港區" },
      { value: "臺南市七股區", label: "七股區" },
      { value: "臺南市將軍區", label: "將軍區" },
      { value: "臺南市學甲區", label: "學甲區" },
      { value: "臺南市北門區", label: "北門區" },
      { value: "臺南市新營區", label: "新營區" },
      { value: "臺南市後壁區", label: "後壁區" },
      { value: "臺南市白河區", label: "白河區" },
      { value: "臺南市東山區", label: "東山區" },
      { value: "臺南市六甲區", label: "六甲區" },
      { value: "臺南市下營區", label: "下營區" },
      { value: "臺南市柳營區", label: "柳營區" },
      { value: "臺南市鹽水區", label: "鹽水區" },
      { value: "臺南市善化區", label: "善化區" },
      { value: "臺南市大內區", label: "大內區" },
      { value: "臺南市山上區", label: "山上區" },
      { value: "臺南市新市區", label: "新市區" },
      { value: "臺南市安定區", label: "安定區" },
   ],
   //#endregion
   //#region 高雄市
   高雄市: [
      { value: "高雄市楠梓區", label: "楠梓區" },
      { value: "高雄市左營區", label: "左營區" },
      { value: "高雄市鼓山區", label: "鼓山區" },
      { value: "高雄市三民區", label: "三民區" },
      { value: "高雄市鹽埕區", label: "鹽埕區" },
      { value: "高雄市前金區", label: "前金區" },
      { value: "高雄市新興區", label: "新興區" },
      { value: "高雄市苓雅區", label: "苓雅區" },
      { value: "高雄市前鎮區", label: "前鎮區" },
      { value: "高雄市小港區", label: "小港區" },
      { value: "高雄市旗津區", label: "旗津區" },
      { value: "高雄市鳳山區", label: "鳳山區" },
      { value: "高雄市大寮區", label: "大寮區" },
      { value: "高雄市鳥松區", label: "鳥松區" },
      { value: "高雄市林園區", label: "林園區" },
      { value: "高雄市仁武區", label: "仁武區" },
      { value: "高雄市大樹區", label: "大樹區" },
      { value: "高雄市大社區", label: "大社區" },
      { value: "高雄市岡山區", label: "岡山區" },
      { value: "高雄市路竹區", label: "路竹區" },
      { value: "高雄市橋頭區", label: "橋頭區" },
      { value: "高雄市梓官區", label: "梓官區" },
      { value: "高雄市彌陀區", label: "彌陀區" },
      { value: "高雄市永安區", label: "永安區" },
      { value: "高雄市燕巢區", label: "燕巢區" },
      { value: "高雄市田寮區", label: "田寮區" },
      { value: "高雄市阿蓮區", label: "阿蓮區" },
      { value: "高雄市茄萣區", label: "茄萣區" },
      { value: "高雄市湖內區", label: "湖內區" },
      { value: "高雄市旗山區", label: "旗山區" },
      { value: "高雄市美濃區", label: "美濃區" },
      { value: "高雄市內門區", label: "內門區" },
      { value: "高雄市杉林區", label: "杉林區" },
      { value: "高雄市甲仙區", label: "甲仙區" },
      { value: "高雄市六龜區", label: "六龜區" },
      { value: "高雄市茂林區", label: "茂林區" },
      { value: "高雄市桃源區", label: "桃源區" },
      { value: "高雄市那瑪夏區", label: "那瑪夏區" }
   ],
   //#endregion
   //#region 屏東縣
   屏東縣: [
      { value: "屏東縣屏東市", label: "屏東市" },
      { value: "屏東縣潮州鎮", label: "潮州鎮" },
      { value: "屏東縣東港鎮", label: "東港鎮" },
      { value: "屏東縣恆春鎮", label: "恆春鎮" },
      { value: "屏東縣萬丹鄉", label: "萬丹鄉" },
      { value: "屏東縣長治鄉", label: "長治鄉" },
      { value: "屏東縣麟洛鄉", label: "麟洛鄉" },
      { value: "屏東縣九如鄉", label: "九如鄉" },
      { value: "屏東縣里港鄉", label: "里港鄉" },
      { value: "屏東縣鹽埔鄉", label: "鹽埔鄉" },
      { value: "屏東縣高樹鄉", label: "高樹鄉" },
      { value: "屏東縣萬巒鄉", label: "萬巒鄉" },
      { value: "屏東縣內埔鄉", label: "內埔鄉" },
      { value: "屏東縣竹田鄉", label: "竹田鄉" },
      { value: "屏東縣新埤鄉", label: "新埤鄉" },
      { value: "屏東縣枋寮鄉", label: "枋寮鄉" },
      { value: "屏東縣新園鄉", label: "新園鄉" },
      { value: "屏東縣崁頂鄉", label: "崁頂鄉" },
      { value: "屏東縣林邊鄉", label: "林邊鄉" },
      { value: "屏東縣南州鄉", label: "南州鄉" },
      { value: "屏東縣佳冬鄉", label: "佳冬鄉" },
      { value: "屏東縣琉球鄉", label: "琉球鄉" },
      { value: "屏東縣車城鄉", label: "車城鄉" },
      { value: "屏東縣滿州鄉", label: "滿州鄉" },
      { value: "屏東縣枋山鄉", label: "枋山鄉" },
      { value: "屏東縣霧台鄉", label: "霧台鄉" },
      { value: "屏東縣瑪家鄉", label: "瑪家鄉" },
      { value: "屏東縣泰武鄉", label: "泰武鄉" },
      { value: "屏東縣來義鄉", label: "來義鄉" },
      { value: "屏東縣春日鄉", label: "春日鄉" },
      { value: "屏東縣獅子鄉", label: "獅子鄉" },
      { value: "屏東縣牡丹鄉", label: "牡丹鄉" },
      { value: "屏東縣三地門鄉", label: "三地門鄉" },
   ],
   //#endregion
   //#region 宜蘭縣
   宜蘭縣: [
      { value: "宜蘭縣宜蘭市", label: "宜蘭市" },
      { value: "宜蘭縣羅東鎮", label: "羅東鎮" },
      { value: "宜蘭縣蘇澳鎮", label: "蘇澳鎮" },
      { value: "宜蘭縣頭城鎮", label: "頭城鎮" },
      { value: "宜蘭縣礁溪鄉", label: "礁溪鄉" },
      { value: "宜蘭縣壯圍鄉", label: "壯圍鄉" },
      { value: "宜蘭縣員山鄉", label: "員山鄉" },
      { value: "宜蘭縣冬山鄉", label: "冬山鄉" },
      { value: "宜蘭縣五結鄉", label: "五結鄉" },
      { value: "宜蘭縣三星鄉", label: "三星鄉" },
      { value: "宜蘭縣大同鄉", label: "大同鄉" },
      { value: "宜蘭縣南澳鄉", label: "南澳鄉" },
   ],
   //#endregion
   //#region 花蓮縣
   花蓮縣: [
      { value: "花蓮縣花蓮市", label: "花蓮市" },
      { value: "花蓮縣鳳林鎮", label: "鳳林鎮" },
      { value: "花蓮縣玉里鎮", label: "玉里鎮" },
      { value: "花蓮縣新城鄉", label: "新城鄉" },
      { value: "花蓮縣吉安鄉", label: "吉安鄉" },
      { value: "花蓮縣壽豐鄉", label: "壽豐鄉" },
      { value: "花蓮縣秀林鄉", label: "秀林鄉" },
      { value: "花蓮縣光復鄉", label: "光復鄉" },
      { value: "花蓮縣豐濱鄉", label: "豐濱鄉" },
      { value: "花蓮縣瑞穗鄉", label: "瑞穗鄉" },
      { value: "花蓮縣萬榮鄉", label: "萬榮鄉" },
      { value: "花蓮縣富里鄉", label: "富里鄉" },
      { value: "花蓮縣卓溪鄉", label: "卓溪鄉" },
   ],
   //#endregion
   //#region 臺東縣
   臺東縣: [
      { value: "臺東縣臺東市", label: "臺東市" },
      { value: "臺東縣成功鎮", label: "成功鎮" },
      { value: "臺東縣關山鎮", label: "關山鎮" },
      { value: "臺東縣長濱鄉", label: "長濱鄉" },
      { value: "臺東縣海端鄉", label: "海端鄉" },
      { value: "臺東縣池上鄉", label: "池上鄉" },
      { value: "臺東縣東河鄉", label: "東河鄉" },
      { value: "臺東縣鹿野鄉", label: "鹿野鄉" },
      { value: "臺東縣延平鄉", label: "延平鄉" },
      { value: "臺東縣卑南鄉", label: "卑南鄉" },
      { value: "臺東縣金峰鄉", label: "金峰鄉" },
      { value: "臺東縣大武鄉", label: "大武鄉" },
      { value: "臺東縣達仁鄉", label: "達仁鄉" },
      { value: "臺東縣綠島鄉", label: "綠島鄉" },
      { value: "臺東縣蘭嶼鄉", label: "蘭嶼鄉" },
      { value: "臺東縣太麻里鄉", label: "太麻里鄉" },
   ],
   //#endregion
   //#region 澎湖縣
   澎湖縣: [
      { value: "澎湖縣馬公市", label: "馬公市" },
      { value: "澎湖縣湖西鄉", label: "湖西鄉" },
      { value: "澎湖縣白沙鄉", label: "白沙鄉" },
      { value: "澎湖縣西嶼鄉", label: "西嶼鄉" },
      { value: "澎湖縣望安鄉", label: "望安鄉" },
      { value: "澎湖縣七美鄉", label: "七美鄉" },
   ],
   //#endregion
   //#region 金門縣
   金門縣: [
      { value: "金門縣金城鎮", label: "金城鎮" },
      { value: "金門縣金湖鎮", label: "金湖鎮" },
      { value: "金門縣金沙鎮", label: "金沙鎮" },
      { value: "金門縣金寧鄉", label: "金寧鄉" },
      { value: "金門縣烈嶼鄉", label: "烈嶼鄉" },
      { value: "金門縣烏坵鄉", label: "烏坵鄉" },
   ],
   //#endregion
   //#region 連江縣
   連江縣: [
      { value: "連江縣南竿鄉", label: "南竿鄉" },
      { value: "連江縣北竿鄉", label: "北竿鄉" },
      { value: "連江縣莒光鄉", label: "莒光鄉" },
      { value: "連江縣東引鄉", label: "東引鄉" },
   ]
   //#endregion
};
//#endregion
//#region 地區
export const Counties = {
   counties: [
      "臺北市",
      "新北市",
      "基隆市",
      "桃園市",
      "新竹縣",
      "新竹市",
      "苗栗縣",
      "臺中市",
      "南投縣",
      "彰化縣",
      "雲林縣",
      "嘉義縣",
      "嘉義市",
      "臺南市",
      "高雄市",
      "屏東縣",
      "宜蘭縣",
      "花蓮縣",
      "臺東縣",
      "澎湖縣",
      "金門縣",
      "連江縣"
   ]
};
//#endregion