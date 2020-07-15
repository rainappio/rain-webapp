import React, { useContext } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';

export const Percentage = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { percentagePage: { percentage } } } = Theme;


    return (
        <>
            <BasicContainer theme={percentage.basicContainer}>
                Percentage
            </BasicContainer>
        </>
    )
}