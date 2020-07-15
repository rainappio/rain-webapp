import orderCards from './OrderCard'
import login from './Pages/MainPages/Login/Login'
import administrators from './Pages/MainPages/Administrators/Administrators'
import customers from './Pages/MainPages/Customers/Customers'
import dispatch from './Pages/MainPages/Dispatch/Dispatch'
import dispatchBoard from './Pages/MainPages/DispatchBoard/DispatchBoard'
import experts from './Pages/MainPages/Experts/Experts'
import home from './Pages/MainPages/Home/Home'
import locations from './Pages/MainPages/Locations/Locations'
import percentage from './Pages/MainPages/Percentage/Percentage'
import reservationList from './Pages/MainPages/ReservationList/ReservationList'
import test from './Pages/MainPages/Test/Test'
import error404 from './Pages/ErrorPages/Error404'
import forms from "./Forms";
import tags from "./Tags";
import buttons from "./Buttons";
import tables from "./Tables";
import jumpDialog from "./JumpDialog";
import jumpAlerts from "./JumpAlerts";
import formCard from "./FormCard";
import cardTable from "./CardTable";
import list from "./Lists";
import menuBar from "./MenuBar";

export default {
    ...orderCards,
    ...list,
    ...forms,
    ...tags,
    ...menuBar,
    ...tables,
    ...cardTable,
    ...jumpDialog,
    ...jumpAlerts,
    ...buttons,
    ...formCard,
    pages: {
        loginPage: {
            login,
        },
        administratorsPage: {
            administrators,
        },
        customersPage: {
            customers,
        },
        dispatchPage: {
            dispatch,
        },
        dispatchBoardPage: {
            dispatchBoard,
        },
        expertsPage: {
            experts,
        },
        homePage: {
            home,
        },
        locationsPage: {
            locations,
        },
        percentagePage: {
            percentage,
        },
        reservationListPage: {
            reservationList,
        },
        testPage: {
            test,
        },
    },
    errorPages: {
        error404
    }
}