import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import {BasicContainer} from "../../../Components/Containers";
import {useWindowSize} from "../../../SelfHooks/useWindowSize";
import {Context} from "../../../Store/store";
import {clearlocalStorage} from "../../../Handlers/LocalStorageHandler";
import {useAsync} from "../../../SelfHooks/useAsync";
import {useHistory} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormHelperText,
    IconButton, InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextareaAutosize,
    TextField, Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {PageTitle} from "../../../Components/PageTitle";
import moment from "moment";

export const Clients = (props) => {

    const {rainApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [openUsernameDialog, setOpenUsernameDialog] = useState(false)
    const [openClientNameDialog, setOpenClientNameDialog] = useState(false)

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

    const getClient = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/clients/${id}`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            console.log(data)
            setClient(data)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchGetClient] = useAsync(getClient, false);

    const updateClientName = useCallback(async (request) => {
        return await fetch(`${rainApi}/admin/clients/${request.clientId}/clientName`,
            {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
                body: JSON.stringify(request)
            }
        ).then(result => {
            fetchGetClients()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchUpdateClientName] = useAsync(updateClientName, true);

    const updateUsername = useCallback(async (request) => {
        return await fetch(`${rainApi}/admin/clients/${request.clientId}/username`,
            {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
                body: JSON.stringify(request)
            }
        ).then(result => {
            fetchGetClients()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchUpdateUsername] = useAsync(updateUsername, true);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>Clients</PageTitle>
                <ClientDialog openDialog={openDialog}
                              setOpenDialog={setOpenDialog}
                              clientData={client}
                    //handleUpdate={fetchUpdateSubscriptionPlan}
                />
                <ClientNameDialog openDialog={openClientNameDialog}
                                  setOpenDialog={setOpenClientNameDialog}
                                  clientData={client}
                                  handleUpdate={fetchUpdateClientName}
                />
                <ClientUsernameDialog openDialog={openUsernameDialog}
                                      setOpenDialog={setOpenUsernameDialog}
                                      clientData={client}
                                      handleUpdate={fetchUpdateUsername}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Timezone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Last Order</TableCell>
                            <TableCell>Order Count</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((row) => (
                            <Row key={row.id}
                                 row={row}
                                 handleOpenDialog={setOpenDialog}
                                 handleOpenUsernameDialog={setOpenUsernameDialog}
                                 handleOpenClientNameDialog={setOpenClientNameDialog}
                                 handleGetClient={fetchGetClient}
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
    const {row, handleOpenDialog, handleOpenClientNameDialog, handleOpenUsernameDialog, handleGetClient} = props

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>
                    {row.clientName}
                    <IconButton variant="contained" color="primary" onClick={() => {
                        handleGetClient(row.id)
                        handleOpenClientNameDialog(true)
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.username}
                    <IconButton variant="contained" color="primary" onClick={() => {
                        handleGetClient(row.id)
                        handleOpenUsernameDialog(true)
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
                <TableCell>{row.timezone}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{moment(row.createdDate).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.lastOrderDate}</TableCell>
                <TableCell>{row.orderCount}</TableCell>
                <TableCell>
                    <IconButton variant="contained" color="primary" onClick={() => {
                        handleGetClient(row.id)
                        handleOpenDialog(true)
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const ClientNameDialog = (props) => {

    const {openDialog, setOpenDialog, clientData, handleUpdate} = props

    const initialState = {
        clientId: clientData.id,
        clientName: clientData.clientName,
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialState
    )

    useEffect(() => {
        setFormInput(initialState)

    }, [clientData])

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({[name]: newValue});
    };

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        handleUpdate({...formInput})
        handleClose()
    }

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">Change Client Name</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="clientId"
                            name="clientId"
                            label="Client ID"
                            type="text"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            value={formInput.clientId}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="clientName"
                            name="clientName"
                            label="New Client Name"
                            type="text"
                            fullWidth
                            value={formInput.clientName}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit"
                                color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

const ClientUsernameDialog = (props) => {

    const {openDialog, setOpenDialog, clientData, handleUpdate} = props

    const initialState = {
        clientId: clientData.id,
        newClientName: clientData.clientName,
        newUsername: '',
        password: ''
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialState
    )

    useEffect(() => {
        setFormInput(initialState)

    }, [clientData])

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({[name]: newValue});
    };

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        handleUpdate({...formInput})
        handleClose()
    }

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">Change Client Username</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="clientId"
                            name="clientId"
                            label="Client ID"
                            type="text"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            value={formInput.clientId}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="newClientName"
                            name="newClientName"
                            label="New Client Name"
                            type="text"
                            fullWidth
                            value={formInput.newClientName}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="newUsername"
                            name="newUsername"
                            label="New Username"
                            type="text"
                            fullWidth
                            value={formInput.newUsername}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="text"
                            fullWidth
                            value={formInput.password}
                            onChange={handleInput}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit"
                                color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

const ClientDialog = (props) => {
    const {openDialog, setOpenDialog, clientData, handleUpdate} = props
    //const [open, setOpen] = React.useState(false);
    const editMode = clientData != null
    const initialState = {
        clientName: '',
        username: '',
        attributes: {},
        clientSettings: {}
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialState
    );

    console.log(formInput.attributes)

    if (formInput.attributes != null) {
        console.log(Object.keys(formInput.attributes))
    }

    useEffect(() => {
        console.log(clientData)

        if (clientData == null) {
            setFormInput(initialState)
        } else {
            setFormInput(clientData)
        }

    }, [clientData])

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({[name]: newValue});
    };

    const handleAttributes = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({
            planPrices: {
                [name]: newValue
            }
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        handleClose()
    }

    return (
        <>
            {/*<Button variant="contained" color="primary" onClick={handleClickOpen}>{mode}</Button>*/}
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">Client</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="clientName"
                            name="clientName"
                            label="Client Name"
                            type="text"
                            fullWidth
                            aria-readonly={true}
                            value={formInput.clientName}
                        />
                        <TextField
                            margin="dense"
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            aria-readonly={true}
                            value={formInput.username}
                        />
                        {formInput.clientInfo != null && (
                            <>
                                <TextField
                                    margin="dense"
                                    id="ownerName"
                                    name="ownerName"
                                    label="Owner Name"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo.ownerName}
                                />
                                <TextField
                                    margin="dense"
                                    id="contactNumber"
                                    name="contactNumber"
                                    label="Contact Number"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo.contactNumber}
                                />
                                <TextField
                                    margin="dense"
                                    id="contactAddress"
                                    name="contactAddress"
                                    label="Contact Address"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo.contactAddress}
                                />
                                <TextField
                                    margin="dense"
                                    id="operationStatus"
                                    name="operationStatus"
                                    label="Operation Status"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo?.operationStatus}
                                />
                                <TextField
                                    margin="dense"
                                    id="leadSource"
                                    name="leadSource"
                                    label="Lead Source"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo?.leadSource}
                                />
                                <TextField
                                    margin="dense"
                                    id="requirements"
                                    name="requirements"
                                    label="Requirements"
                                    type="text"
                                    fullWidth
                                    aria-readonly={true}
                                    value={formInput.clientInfo?.requirements}
                                />
                            </>
                        )}

                        <DialogTitle id="form-dialog-attributes-title">Attributes</DialogTitle>
                        {
                            Object.keys(formInput.attributes).map((key) => {
                                const value = formInput.attributes[key]

                                return <TextField
                                    id={key}
                                    autoFocus
                                    margin="dense"
                                    name={key}
                                    label={key}
                                    type="text"
                                    fullWidth
                                    value={value}
                                    //onChange={handleInput}
                                />
                            })
                        }
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
        </>
    )
}