import React, {useCallback, useContext, useEffect, useState} from 'react';
import {BasicContainer} from "../../../Components/Containers";
import {useWindowSize} from "../../../SelfHooks/useWindowSize";
import {Context} from "../../../Store/store";
import {clearlocalStorage} from "../../../Handlers/LocalStorageHandler";
import {useAsync} from "../../../SelfHooks/useAsync";
import {useHistory} from "react-router-dom";
import {Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const ClientSubscriptions = (props) => {

    const {rainApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [clientSubscriptions, setClientSubscriptions] = useState([])

    const getClientSubscriptions = useCallback(async () => {
        return await fetch(`${rainApi}/admin/clientSubscriptions`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((preResult) => {
            setClientSubscriptions(preResult.results)
            return "查詢角色表格資訊成功"

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

        // 這裡要接著打refresh 延長Token存活期

    }, [rainApi, history])

    const [execute, pending] = useAsync(getClientSubscriptions, true);

    const getClientSubscriptionInvoices = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/clientSubscriptions/${id}/invoices`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((preResult) => {
            console.log(preResult)


            //setInvoices(preResult.results)
            return preResult.results

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });
    }, [rainApi, history])

    const [fetchClientSubscriptionInvoices, pending2, invoicesResponse] = useAsync(getClientSubscriptionInvoices, false);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Plan Period</TableCell>
                            <TableCell>Plan Price</TableCell>
                            <TableCell>Submitted Date</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Invoice Identifier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientSubscriptions.map((row) => (
                            <Row key={row.id} row={row} fetchClientSubscriptionInvoices={fetchClientSubscriptionInvoices} data={invoicesResponse}/>
                        ))}
                    </TableBody>
                </Table>

            </BasicContainer>
            }
        </>
    )
}

const Row = (props) => {
    const {row, data, fetchClientSubscriptionInvoices} = props
    const [open, setOpen] = React.useState(false)
    const [invoices, setInvoices] = React.useState([])

    useEffect(() => {
        console.log(`dfpaisjdf: ${data}`)

        if (data != null) {
            setInvoices(data?.json()?.results)
        }

    }, [data])

    return (

        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => {
                        setOpen(!open)

                        if (open) {
                            fetchClientSubscriptionInvoices(row.id)
                        }
                    }}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.clientName}</TableCell>
                <TableCell>{row.planName}</TableCell>
                <TableCell>{row.planPeriod}</TableCell>
                <TableCell>{row.planPrice}</TableCell>
                <TableCell>{row.submittedDate}</TableCell>
                <TableCell>{row.planStartDate}</TableCell>
                <TableCell>{row.planEndDate}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.invoiceIdentifier}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary">
                        Activate
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Invoices
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Invoice Identifier</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Due Amount</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoices.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell component="th" scope="row">
                                                {invoice.invoiceIdentifier}
                                            </TableCell>
                                            <TableCell>{invoice.status}</TableCell>
                                            <TableCell>10</TableCell>
                                            <TableCell>
                                                {invoice.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}