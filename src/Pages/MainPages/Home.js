import React, { useContext } from 'react';
import { Context } from '../../Store/store'
import { BasicContainer } from '../../Components/Containers';
import { DatePicker } from '../../Components/DatePicker';
import { useForm } from '../../SelfHooks/useForm'

export const Home = (props) => {

    const { Theme } = useContext(Context);
    const { pages: { home } } = Theme;
    const [Pass, Passhandler, PassregExpResult] = useForm("", ["^.{1,}$"], ["必須輸入名稱"]);


    return (
        <>
            <BasicContainer theme={home.basicContainer}>
                Home
                <DatePicker />
            </BasicContainer>
        </>
    )
}