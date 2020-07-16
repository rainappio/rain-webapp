import React, { useContext } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { ReservationListPageTitleAddSearch } from './ReservationListPageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'

export const ReservationList = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationList } } } = Theme;

    const [width] = useWindowSize();

    return (
        <>
            {width > 768 && <BasicContainer theme={reservationList.basicContainer}>
                <ReservationListPageTitleAddSearch
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
            </BasicContainer>}
            {width <= 768 && <BasicContainer theme={reservationList.basicContainer}>
                <ReservationListPageTitleAddSearch tableBasicContainerLessThan768
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
            </BasicContainer>
            }
        </>
    )
}