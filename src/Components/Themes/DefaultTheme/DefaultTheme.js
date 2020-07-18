import orderCards from './OrderCard'
import login from './Pages/MainPages/Login/Login'
import administrators from './Pages/MainPages/Administrators/Administrators'
import addCard from './Pages/MainPages/Administrators/AddCard'
import editCard from './Pages/MainPages/Administrators/EditCard'
import delDialog from './Pages/MainPages/Administrators/DelDialog'
import pageTitleAddSearch from './Pages/MainPages/Administrators/PageTitleAddSearch'
import customers from './Pages/MainPages/Customers/Customers'
import customersAddCard from './Pages/MainPages/Customers/CustomersAddCard'
import dispatch from './Pages/MainPages/Dispatch/Dispatch'
import dispatchBoard from './Pages/MainPages/DispatchBoard/DispatchBoard'
import experts from './Pages/MainPages/Experts/Experts'
import expertsAddCard from './Pages/MainPages/Experts/ExpertsAddCard'
import expertsEditCard from './Pages/MainPages/Experts/ExpertsEditCard'
import expertsDelDialog from './Pages/MainPages/Experts/ExpertsDelDialog'
import expertsPageTitleAddSearch from './Pages/MainPages/Experts/ExpertsPageTitleAddSearch'
import home from './Pages/MainPages/Home/Home'
import locations from './Pages/MainPages/Locations/Locations'
import percentage from './Pages/MainPages/Percentage/Percentage'
import percentageAddCard from './Pages/MainPages/Percentage/PercentageAddCard'
import percentageEditCard from './Pages/MainPages/Percentage/PercentageEditCard'
import percentageDelDialog from './Pages/MainPages/Percentage/PercentageDelDialog'
import percentagePageTitleAddSearch from './Pages/MainPages/Percentage/PercentagePageTitleAddSearch'
import reservationList from './Pages/MainPages/ReservationList/ReservationList'
import reservationListAddCard from './Pages/MainPages/ReservationList/ReservationListAddCard'
import reservationListEditCard from './Pages/MainPages/ReservationList/ReservationListEditCard'
import reservationListPageTitleAddSearch from './Pages/MainPages/ReservationList/ReservationListPageTitleAddSearch'
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
import portal from "./Portal";

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
    ...portal,
    pages: {
        loginPage: {
            login,
        },
        administratorsPage: {
            administrators,
            addCard,
            editCard,
            delDialog,
            pageTitleAddSearch,
        },
        customersPage: {
            customers,
            customersAddCard,
        },
        dispatchPage: {
            dispatch,
        },
        dispatchBoardPage: {
            dispatchBoard,
        },
        expertsPage: {
            experts,
            expertsAddCard,
            expertsEditCard,
            expertsDelDialog,
            expertsPageTitleAddSearch,
        },
        homePage: {
            home,
        },
        locationsPage: {
            locations,
        },
        percentagePage: {
            percentage,
            percentageAddCard,
            percentageDelDialog,
            percentageEditCard,
            percentagePageTitleAddSearch
        },
        reservationListPage: {
            reservationList,
            reservationListAddCard,
            reservationListEditCard,
            reservationListPageTitleAddSearch,
        },
        testPage: {
            test,
        },
    },
    errorPages: {
        error404
    }
}