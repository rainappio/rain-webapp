import orderCards from './OrderCard'
import login from './Pages/Login/Login'
import administrators from './Pages/Administrators/Administrators'
import customers from './Pages/Customers/Customers'
import dispatch from './Pages/Dispatch/Dispatch'
import dispatchBoard from './Pages/DispatchBoard/DispatchBoard'
import experts from './Pages/Experts/Experts'
import home from './Pages/Home/Home'
import locations from './Pages/Locations/Locations'
import percentage from './Pages/Percentage/Percentage'
import reservationList from './Pages/ReservationList/ReservationList'
import test from './Pages/Test/Test'
import error404 from './ErrorPages/Error404'
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