import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Customers = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { customers } } = Theme;


    return (
        <>
            <BasicContainer theme={customers.basicContainer}>
                Customers
            </BasicContainer>
        </>
    )
}