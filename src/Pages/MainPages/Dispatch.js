import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Dispatch = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { dispatch } } = Theme;


    return (
        <>
            <BasicContainer theme={dispatch.basicContainer}>
                Dispatch
            </BasicContainer>
        </>
    )
}