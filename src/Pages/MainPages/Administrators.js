import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Administrators = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { administrators } } = Theme;


    return (
        <>
            <BasicContainer theme={administrators.basicContainer}>
                Administrators
            </BasicContainer>
        </>
    )
}