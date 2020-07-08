import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';

export const Locations = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { locations } } = Theme;


    return (
        <>
            <BasicContainer theme={locations.basicContainer}>
                Locations
            </BasicContainer>
        </>
    )
}