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
import {PageTitle} from "../../../Components/PageTitle";

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

        }).then((data) => {
            setClientSubscriptions(data.results)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

        // 這裡要接著打refresh 延長Token存活期

    }, [rainApi, history])

    const [fetchClientSubscriptions, pending] = useAsync(getClientSubscriptions, true);

    const cancelClientSubscription = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/clientSubscriptions/${id}/cancel`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            fetchClientSubscriptionInvoices(data.id)
            fetchClientSubscriptions()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

        // 這裡要接著打refresh 延長Token存活期

    }, [rainApi, history])

    const [fetchCancelClientSubscriptions] = useAsync(cancelClientSubscription, false);

    const getClientSubscriptionInvoices = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/clientSubscriptions/${id}/invoices`,
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            return data.results

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });
    }, [rainApi, history])

    const [fetchClientSubscriptionInvoices, pending2, invoicesResponse] = useAsync(getClientSubscriptionInvoices, false);

    const sendClientSubscriptionInvoice = useCallback(async (invoiceIdentifier) => {
        return await fetch(`${rainApi}/admin/invoices/${invoiceIdentifier}/sendInvoice`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            return data

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });
    }, [rainApi, history])

    const [fetchSendClientSubscriptionInvoice, pending4, sentInvoiceResponse] = useAsync(sendClientSubscriptionInvoice, false);

    const activateClientSubscription = useCallback(async (invoiceIdentifier) => {
        return await fetch(`${rainApi}/admin/invoices/${invoiceIdentifier}/activate`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            return data

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });
    }, [rainApi, history])

    const [fetchActivateClientSubscription, pending3, activatedInvoiceResponse] = useAsync(activateClientSubscription, false);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>Client Subscriptions</PageTitle>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Username (Email)</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Plan Period</TableCell>
                            <TableCell>Plan Price</TableCell>
                            <TableCell>Submitted Date</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientSubscriptions.map((row) => (
                            <Row key={row.id}
                                 row={row}
                                 fetchClientSubscriptions={fetchClientSubscriptions}
                                 fetchCancelClientSubscriptions={fetchCancelClientSubscriptions}
                                 fetchClientSubscriptionInvoices={fetchClientSubscriptionInvoices}
                                 fetchSendClientSubscriptionInvoice={fetchSendClientSubscriptionInvoice}
                                 fetchActivateClientSubscription={fetchActivateClientSubscription}
                                 invoicesData={invoicesResponse}
                                 sentInvoice={sentInvoiceResponse}
                                 activatedInvoice={activatedInvoiceResponse}
                            />
                        ))}
                    </TableBody>
                </Table>

            </BasicContainer>
            }
        </>
    )
}

const Row = (props) => {
    const {
        row,
        invoicesData,
        sentInvoice,
        activatedInvoice,
        fetchClientSubscriptions,
        fetchCancelClientSubscriptions,
        fetchClientSubscriptionInvoices,
        fetchSendClientSubscriptionInvoice,
        fetchActivateClientSubscription
    } = props
    const [open, setOpen] = React.useState(false)
    const [invoices, setInvoices] = React.useState([])

    useEffect(() => {
        if (invoicesData != null) {
            setInvoices(invoicesData)
        }

    }, [invoicesData])

    useEffect(() => {

        fetchClientSubscriptions()

    }, [activatedInvoice])

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => {
                        setOpen(!open)

                        if (!open) {
                            fetchClientSubscriptionInvoices(row.id)
                        }
                    }}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.clientName}</TableCell>
                <TableCell>{row.clientUsername}</TableCell>
                <TableCell>{row.planName}</TableCell>
                <TableCell>{row.planPeriod}</TableCell>
                <TableCell>{row.planPrice}</TableCell>
                <TableCell>{row.submittedDate}</TableCell>
                <TableCell>{row.planStartDate}</TableCell>
                <TableCell>{row.planEndDate}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={() => {
                        fetchCancelClientSubscriptions(row.id)
                    }}>
                        Cancel
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Invoices
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Invoice Identifier</TableCell>
                                        <TableCell>Due Amount</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Payment Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoices.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell component="th" scope="row">
                                                {invoice.invoiceIdentifier}
                                            </TableCell>
                                            <TableCell>{invoice.dueAmount}</TableCell>
                                            <TableCell>{invoice.status}</TableCell>
                                            <TableCell>{invoice.paymentDate}</TableCell>
                                            <TableCell>
                                                {invoice.status === 'PENDING' && (
                                                    <Button variant="contained" color="primary" onClick={() => {
                                                        fetchSendClientSubscriptionInvoice(invoice.invoiceIdentifier)
                                                    }}>
                                                        Resend Invoice
                                                    </Button>
                                                )}
                                                {invoice.status === 'PENDING' && (
                                                    <Button variant="contained" color="primary" onClick={() => {
                                                        fetchActivateClientSubscription(invoice.invoiceIdentifier)
                                                    }}>
                                                        Activate
                                                    </Button>
                                                )}
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