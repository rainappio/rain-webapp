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
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {PageTitle} from "../../../Components/PageTitle";
import DeleteIcon from "@material-ui/icons/Delete";

export const GlobalAnnouncements = (props) => {

    const {rainApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [globalAnnouncements, setGlobalAnnouncements] = useState([])
    const [globalAnnouncement, setGlobalAnnouncement] = useState({})
    const [openDialog, setOpenDialog] = useState(false)

    const getGlobalAnnouncements = useCallback(async () => {
        return await fetch(`${rainApi}/admin/globalAnnouncements`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            setGlobalAnnouncements(data.results)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchGetGlobalAnnouncements] = useAsync(getGlobalAnnouncements, true);

    const getGlobalAnnouncement = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/globalAnnouncements/${id}`,
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
            setGlobalAnnouncement(data)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchGetGlobalAnnouncement] = useAsync(getGlobalAnnouncement, false);

    const createGlobalAnnouncement = useCallback(async (request) => {
        return await fetch(`${rainApi}/admin/globalAnnouncements`,
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
            console.log(data)
            fetchGetGlobalAnnouncements()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchCreateGlobalAnnouncement] = useAsync(createGlobalAnnouncement, false);

    const updateGlobalAnnouncement = useCallback(async (id, request) => {
        return await fetch(`${rainApi}/admin/globalAnnouncements/${id}`,
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
            fetchGetGlobalAnnouncements()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchUpdateGlobalAnnouncement] = useAsync(updateGlobalAnnouncement, false);

    const deleteGlobalAnnouncement = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/globalAnnouncements/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                }
            }
        ).then(result => {
            if (result.ok) {
                fetchGetGlobalAnnouncements()
            }


        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchDeleteGlobalAnnouncement] = useAsync(deleteGlobalAnnouncement, false);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>Global Announcements</PageTitle>
                <Button variant="contained" color="primary" onClick={() => {
                    setGlobalAnnouncement(null)
                    setOpenDialog(true)
                }}>
                    New
                </Button>
                <GlobalAnnouncementDialog openDialog={openDialog}
                                          setOpenDialog={setOpenDialog}
                                          announcementData={globalAnnouncement}
                                          handleCreate={fetchCreateGlobalAnnouncement}
                                          handleUpdate={fetchUpdateGlobalAnnouncement}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {globalAnnouncements.map((row) => (
                            <Row key={row.id}
                                 row={row}
                                 handleOpenDialog={setOpenDialog}
                                 handleDelete={fetchDeleteGlobalAnnouncement}
                                 handleGetGlobalAnnouncement={fetchGetGlobalAnnouncement}
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
    const {row, handleOpenDialog, handleDelete, handleGetGlobalAnnouncement} = props

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.content}</TableCell>
                <TableCell>
                    <IconButton color="secondary" aria-label="delete" onClick={() => {
                        handleDelete(row.id)
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton variant="contained" color="primary" onClick={() => {
                        handleGetGlobalAnnouncement(row.id)
                        handleOpenDialog(true)
                    }}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const GlobalAnnouncementDialog = (props) => {
    const {openDialog, setOpenDialog, announcementData, handleCreate, handleUpdate} = props
    //const [open, setOpen] = React.useState(false);
    const editMode = announcementData != null
    const initialState = {
        title: '',
        content: ''
    }

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        initialState
    );

    useEffect(() => {
        if (announcementData == null) {
            setFormInput(initialState)
        } else {
            setFormInput(announcementData)
        }

    }, [announcementData])

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

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log(formInput)

        if (editMode) {
            handleUpdate(formInput.id, formInput)
        } else {
            handleCreate(formInput)
        }

        handleClose()
    }

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">Global Announcement</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={formInput.title}
                            onChange={handleInput}
                        />
                        <TextField
                            margin="dense"
                            id="content"
                            name="content"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            value={formInput.content}
                            onChange={handleInput}
                        />

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