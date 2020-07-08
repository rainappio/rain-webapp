import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Experts = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { experts } } = Theme;


    return (
        <>
            <BasicContainer theme={experts.basicContainer}>
                Experts
            </BasicContainer>
        </>
    )
}