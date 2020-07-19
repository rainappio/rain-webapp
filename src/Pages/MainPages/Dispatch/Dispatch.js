import React, { useContext } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { DispatchPageTitleAddSearch } from './DispatchPageTitleAddSearch';

export const Dispatch = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { dispatchPage: { dispatch } } } = Theme;


    return (
        <>
            <BasicContainer theme={dispatch.basicContainer}>
                <DispatchPageTitleAddSearch />
            </BasicContainer>
        </>
    )
}