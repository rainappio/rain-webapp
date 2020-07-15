import React, { useContext, useCallback, useState } from 'react';
import { Context } from '../../../Store/store'
import { BasicContainer } from '../../../Components/Containers';
import { Text } from '../../../Components/Texts'
import { JumpDialog } from '../../../Components/JumpDialog';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { alertService } from '../../../Components/JumpAlerts';

export const DelDialog = (props) => {
    const { Theme } = useContext(Context);
    const { pages: { administratorsPage: { delDialog } } } = Theme;

    return (
        <>
            <JumpDialog
                switch={props.switch}
                close={() => { }}
                yes={() => { props.delAdminUserExecute(props.delWhoId); }}
                yesText={"是，移除管理員"}
                no={() => { alertService.clear(); }}
                noText={"否，取消移除"}
            >
                <BasicContainer theme={delDialog.basicContainer}>
                    <ErrorOutlineIcon style={delDialog.errorOutlineIcon} />
                </BasicContainer>
                <Text theme={delDialog.delText}>
                    您確定要將 <Text theme={delDialog.highLightText}>{props.delWho}</Text> 的帳號從管理員名單中移除嗎？
                </Text>
            </JumpDialog>
        </>
    )
}