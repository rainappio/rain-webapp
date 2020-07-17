import React, { useContext } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { PercentagePageTitleAddSearch } from './PercentagePageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'

export const Percentage = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { percentagePage: { percentage } } } = Theme;

    const [width] = useWindowSize();

    return (
        <>
            {width > 768 && <BasicContainer theme={percentage.basicContainer}>
                <PercentagePageTitleAddSearch
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
            </BasicContainer>}
            {width <= 768 && <BasicContainer theme={percentage.basicContainer}>
                <PercentagePageTitleAddSearch tableBasicContainerLessThan768
                //  setOpenAddJumpDialog={setOpenAddJumpDialog} 
                //  execute={execute}
                //   setSearchWord={setSearchWord}
                />
            </BasicContainer>
            }
        </>
    )
}