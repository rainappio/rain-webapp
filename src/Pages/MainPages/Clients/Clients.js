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

export const Clients = (props) => {

    const {rainApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({})
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

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>Clients</PageTitle>
                <ClientDialog openDialog={openDialog}
                              setOpenDialog={setOpenDialog}
                              clientData={client}
                    //handleUpdate={fetchUpdateSubscriptionPlan}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Timezone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((row) => (
                            <Row key={row.id}
                                 row={row}
                                 handleOpenDialog={setOpenDialog}
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
    const {row, handleOpenDialog, handleGetClient} = props

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.timezone}</TableCell>
                <TableCell>{row.status}</TableCell>
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
        console.log(formInput)

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