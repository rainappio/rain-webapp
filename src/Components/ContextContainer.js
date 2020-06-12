import React, { useContext } from 'react'
import { Routers } from '../Routers/Routers'
import { Context } from '../Store/store'

/* 
   Date   : 2020-06-09 14:40:41
   Author : Arhua Ho
   Content: 需要一層轉發Context
*/
export const ContextContainer = (props) => {

    const { Theme, setTheme } = useContext(Context);
    //const { } = Theme;

    return (
        <>
            {/* 
              Date   : 2020-06-12 12:18:46
              Author : Arhua Ho
              Content: 不隨Router re-render的組件
            */}
            <Routers></Routers>
        </>
    )
}