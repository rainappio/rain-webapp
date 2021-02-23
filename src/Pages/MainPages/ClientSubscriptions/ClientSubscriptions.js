import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import {BasicContainer} from "../../../Components/Containers";
import {useWindowSize} from "../../../SelfHooks/useWindowSize";
import {Context} from "../../../Store/store";
import {clearlocalStorage} from "../../../Handlers/LocalStorageHandler";
import {useAsync} from "../../../SelfHooks/useAsync";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button, Checkbox,
    Collapse,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
    IconButton, InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextField,
    Typography
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {PageTitle} from "../../../Components/PageTitle";
import moment from "moment";
import {formatDateTime} from "../../../Handlers/DateTimeHelper";

export const ClientSubscriptions = (props) => {

    const {rainApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [clients, setClients] = useState([])
    const [subscriptionPlans, setSubscriptionPlans] = useState([])
    const [clientSubscriptions, setClientSubscriptions] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const getClients = useCallback(async () => {
        return await fetch(`${rainApi}/admin/clients`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            setClients(data.results)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchGetClients] = useAsync(getClients, true);

    const getSubscriptionPlans = useCallback(async () => {
        return await fetch(`${rainApi}/admin/subscriptionPlans?country=TW`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            setSubscriptionPlans(data.results)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchSubscriptionPlans] = useAsync(getSubscriptionPlans, true);

    const createClientSubscription = useCallback(async (request) => {
        return await fetch(`${rainApi}/admin/clientSubscriptions`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
                body: JSON.stringify(request)
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            console.log('res', data)
            fetchClientSubscriptions()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchCreateClientSubscription] = useAsync(createClientSubscription, false);

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

    const actOnClientSubscription = useCallback(async (id, action) => {

        return await fetch(`${rainApi}/admin/clientSubscriptions/${id}/${action}`,
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

    const [fetchActOnClientSubscription] = useAsync(actOnClientSubscription, false);

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
                <Button variant="contained" color="primary"
                        style={{marginLeft: 40}}
                        onClick={() => {
                            setOpenDialog(true)
                        }}>
                    New
                </Button>
                <ClientSubscriptionDialog openDialog={openDialog}
                                          setOpenDialog={setOpenDialog}
                                          clientsData={clients}
                                          subscriptionPlansData={subscriptionPlans}
                                          handleCreate={fetchCreateClientSubscription}
                />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Username (Email)</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Plan Period</TableCell>
                            <TableCell>Plan Price</TableCell>
                            <TableCell>Discount</TableCell>
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
                                 fetchActOnClientSubscription={fetchActOnClientSubscription}
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
        fetchActOnClientSubscription,
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
        fetchClientSubscriptionInvoices(row.id)
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
                <TableCell>{row.discountAmount}</TableCell>
                <TableCell>{formatDateTime(row.submittedDate)}</TableCell>
                <TableCell>{formatDateTime(row.planStartDate)}</TableCell>
                <TableCell>{formatDateTime(row.planEndDate)}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                    {['ACTIVE', 'ACTIVE_LAPSING'].includes(row.status) && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => {
                                fetchActOnClientSubscription(row.id, 'lapse')
                            }}>
                                Lapse
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => {
                                fetchActOnClientSubscription(row.id, 'deactivate')
                            }}>
                                Deactivate
                            </Button>
                        </>
                    )}
                    {row.status === 'INACTIVE' && (
                        <Button variant="contained" color="primary" onClick={() => {
                            fetchActOnClientSubscription(row.id, 'reactivate')
                        }}>
                            Reactivate
                        </Button>
                    )}
                    {row.status !== 'CANCELLED' && (
                        <Button variant="contained" color="primary" onClick={() => {
                            fetchActOnClientSubscription(row.id, 'cancel')
                        }}>
                            Cancel
                        </Button>
                    )}
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
                                        <TableCell>Valid</TableCell>
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
                                            <TableCell>{formatDateTime(invoice.paymentDate)}</TableCell>
                                            <TableCell>{formatDateTime(invoice.validFrom)} - {formatDateTime(invoice.validTo)}</TableCell>
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

const ClientSubscriptionDialog = (props) => {

    const {openDialog, setOpenDialog, clientsData, subscriptionPlansData, handleCreate} = props
    const initialState = {
        clientId: '',
        subscriptionPlanId: '',
        planPeriod: '',
        discountAmount: ''
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({ [name]: newValue });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault()

        console.log(formInput)

        handleCreate({...formInput})

        handleClose()
    }

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">New Client Subscription</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel id="clientIdLabel">
                                Client
                            </InputLabel>
                            <Select
                                labelId="planGroup"
                                id="clientId"
                                name="clientId"
                                fullWidth
                                value={formInput.clientId}
                                onChange={handleInput}
                            >
                                {clientsData.map(client => (
                                    <MenuItem value={client.id}>{client.clientName}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select client</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="subscriptionPlanIdLabel">
                                Subscription Plan
                            </InputLabel>
                            <Select
                                labelId="subscriptionPlanId"
                                id="subscriptionPlanId"
                                name="subscriptionPlanId"
                                fullWidth
                                value={formInput.subscriptionPlanId}
                                onChange={handleInput}
                            >
                                {subscriptionPlansData.map(plan => (
                                    <MenuItem value={plan.id}>{plan.planName}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select plan</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="planPeriodLabel">
                                Plan Period
                            </InputLabel>
                            <Select
                                labelId="planPeriod"
                                id="planPeriod"
                                name="planPeriod"
                                fullWidth
                                value={formInput.planPeriod}
                                onChange={handleInput}
                            >
                                <MenuItem value="MONTHLY">Monthly</MenuItem>
                                <MenuItem value="HALF_YEARLY">Six Months</MenuItem>
                                <MenuItem value="YEARLY">Yearly</MenuItem>
                            </Select>
                            <FormHelperText>Select plan period</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <TextField
                                margin="dense"
                                id="discountAmount"
                                name="discountAmount"
                                label="Discount Amount"
                                type="text"
                                fullWidth
                                multiline
                                value={formInput.discountAmount}
                                onChange={handleInput}
                            />
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit"
                                color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>)
}