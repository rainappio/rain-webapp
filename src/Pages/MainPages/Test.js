import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Test = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { test } } = Theme;


    return (
        <>
            <BasicContainer theme={test.basicContainer}>
            Test
            </BasicContainer>
        </>
    )
}