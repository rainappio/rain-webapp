import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const DispatchBoard = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { dispatchBoard } } = Theme;


    return (
        <>
            <BasicContainer theme={dispatchBoard.basicContainer}>
                DispatchBoard
            </BasicContainer>
        </>
    )
}