import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { ReservationListPageTitleAddSearch } from './ReservationListPageTitleAddSearch';
import { useWindowSize } from '../../../SelfHooks/useWindowSize'
import { useHistory, useLocation } from 'react-router-dom';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useForm, useSelector } from '../../../SelfHooks/useForm'
import { Text } from '../../../Components/Texts';
import { CardTable } from '../../../Components/CardTable';
import { EasyButton } from '../../../Components/Buttons';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { SubContainer, Container, BasicContainer } from '../../../Components/Containers';
import { portalService } from '../../../Components/Portal';
import { dateTrans, dateTransAndGetWeek, addDays, addMonths } from '../../../Handlers/DateHandler';
import { setItemlocalStorage, getItemlocalStorage, clearlocalStorage } from '../../../Handlers/LocalStorageHandler'

export const ReservationListCheckComment = (props) => {

    const { APIUrl, Theme } = useContext(Context);
    const { pages: { reservationListPage: { reservationListCheckComment } } } = Theme;

    let history = useHistory();
    const [width] = useWindowSize();

    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    console.log(urlParams.get("d"))//從網址取得參數

    return (
        <>
            {width > 768 && <BasicContainer theme={reservationListCheckComment.basicContainer}>
                查看評論
            </BasicContainer>}
            {width <= 768 && <BasicContainer theme={reservationListCheckComment.basicContainer}>
                查看評論
            </BasicContainer>
            }
        </>
    )
}