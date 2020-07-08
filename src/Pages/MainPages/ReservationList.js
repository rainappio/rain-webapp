import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const ReservationList = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { reservationList } } = Theme;


    return (
        <>
            <BasicContainer theme={reservationList.basicContainer}>
                ReservationList
            </BasicContainer>
        </>
    )
}