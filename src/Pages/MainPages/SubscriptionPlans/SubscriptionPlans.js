import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { BasicContainer } from "../../../Components/Containers";
import { useWindowSize } from "../../../SelfHooks/useWindowSize";
import { Context } from "../../../Store/store";
import { clearlocalStorage } from "../../../Handlers/LocalStorageHandler";
import { useAsync } from "../../../SelfHooks/useAsync";
import { useHistory } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormHelperText, FormGroup, FormLabel, FormControlLabel, Checkbox,
    IconButton, InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, TextareaAutosize,
    TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PageTitle } from "../../../Components/PageTitle";
import { portalService } from '../../../Components/Portal';
import { Text } from '../../../Components/Texts';
import { makeStyles } from '@material-ui/core/styles';

export const SubscriptionPlans = (props) => {

    const { rainApi, Theme } = useContext(Context);
    let history = useHistory();
    const { pages: { administratorsPage: { administrators } } } = Theme;
    const [width] = useWindowSize();
    const [subscriptionPlans, setSubscriptionPlans] = useState([])
    const [subscriptionPlan, setSubscriptionPlan] = useState({})
    const [openDialog, setOpenDialog] = useState(false)

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

    const getSubscriptionPlan = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/subscriptionPlans/${id}`,
            {
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            setSubscriptionPlan(data)
            return data

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchGetSubscriptionPlan] = useAsync(getSubscriptionPlan, false);

    const createSubscriptionPlan = useCallback(async (request) => {
        return await fetch(`${rainApi}/admin/subscriptionPlans`,
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
            fetchSubscriptionPlans()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchCreateSubscriptionPlan] = useAsync(createSubscriptionPlan, false);

    const updateSubscriptionPlan = useCallback(async (id, request) => {
        return await fetch(`${rainApi}/admin/subscriptionPlans/${id}`,
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
            fetchSubscriptionPlans()

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchUpdateSubscriptionPlan] = useAsync(updateSubscriptionPlan, false)

    const deleteSubscriptionPlan = useCallback(async (id) => {
        return await fetch(`${rainApi}/admin/subscriptionPlans/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    //'Authorization': `Basic `
                }
            }
        ).then(result => {
            console.log(result)

            if (result.ok) {
                fetchSubscriptionPlans()
            }

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [rainApi, history])

    const [fetchDeleteSubscriptionPlan] = useAsync(deleteSubscriptionPlan, false);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>Client Subscriptions</PageTitle>
                <Button variant="contained" color="primary"
                    style={{ marginLeft: 40 }}
                    onClick={() => {
                        setSubscriptionPlan(null)
                        setOpenDialog(true)
                    }}>
                    New
                </Button>
                <SubscriptionPlanDialog openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    subscriptionPlanData={subscriptionPlan}
                    handleCreate={fetchCreateSubscriptionPlan}
                    handleUpdate={fetchUpdateSubscriptionPlan}
                />

                <Table style={{ marginLeft: 40 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Country Code</TableCell>
                            <TableCell>Plan Group</TableCell>
                            <TableCell>Plan Name</TableCell>
                            <TableCell>Monthly Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscriptionPlans.map((row) => (
                            <Row key={row.id}
                                row={row}
                                handleOpenDialog={setOpenDialog}
                                handleGetSubscriptionPlan={fetchGetSubscriptionPlan}
                                handleDeleteSubscriptionPlan={fetchDeleteSubscriptionPlan}
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
    const { row, handleOpenDialog, handleGetSubscriptionPlan, handleDeleteSubscriptionPlan } = props

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>{row.countryCode}</TableCell>
                <TableCell>{row.planGroup}</TableCell>
                <TableCell>{row.planName}</TableCell>
                <TableCell>{row.planPrices.MONTHLY}</TableCell>
                <TableCell>
                    <IconButton color="secondary" aria-label="delete" onClick={() => {
                        portalService.warn({
                            autoClose: false,
                            yes: () => { handleDeleteSubscriptionPlan(row.id) },
                            yesText: "確定",
                            noText: "取消",
                            content: (
                                <>
                                    <Text theme={{
                                        display: "block",
                                        textAlign: "center",
                                        color: "#595959",
                                        fontSize: "1.125em",
                                        fontWeight: 500
                                    }}>
                                        {`確定刪除嗎`}
                                    </Text>
                                </>)
                        })
                    }}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton variant="contained" color="primary" onClick={() => {
                        handleGetSubscriptionPlan(row.id)
                        handleOpenDialog(true)
                    }}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const SubscriptionPlanDialog = (props) => {
    const { openDialog, setOpenDialog, subscriptionPlanData, handleCreate, handleUpdate } = props
    const classes = useStyles();
    //const [open, setOpen] = React.useState(false);
    const editMode = subscriptionPlanData != null
    const initialState = {
        countryCode: 'TW',
        planGroup: 'DEFAULT',
        planName: '',
        description: '',
        planPrices: {
            MONTHLY: 0
        }
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );

    const [checkBoxState, setCheckBoxState] = React.useState({
        timeCard: false,
        orderDisplay: false,
        salesReport: false,
        customerStats: false,
        timeCardReport: false,
        membership: false,
        calendar: false,
        staff: false,
        roster: false,
        einvoice: false,
    });

    const handleChange = (event) => {
        setCheckBoxState({ ...checkBoxState, [event.target.name]: event.target.checked });
    };

    const { gilad, jason, antoine } = checkBoxState;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    useEffect(() => {
        console.log(subscriptionPlanData)
        if (subscriptionPlanData == null) {
            setFormInput(initialState)
        } else {
            setFormInput(subscriptionPlanData)
        }
        setCheckBoxState({
            timeCard: !!subscriptionPlanData?.restrictedFeatures?.includes('timeCard'),
            orderDisplay: !!subscriptionPlanData?.restrictedFeatures?.includes('orderDisplay'),
            salesReport: !!subscriptionPlanData?.restrictedFeatures?.includes('salesReport'),
            customerStats: !!subscriptionPlanData?.restrictedFeatures?.includes('customerStats'),
            timeCardReport: !!subscriptionPlanData?.restrictedFeatures?.includes('timeCardReport'),
            membership: !!subscriptionPlanData?.restrictedFeatures?.includes('membership'),
            calendar: !!subscriptionPlanData?.restrictedFeatures?.includes('calendar'),
            staff: !!subscriptionPlanData?.restrictedFeatures?.includes('staff'),
            roster: !!subscriptionPlanData?.restrictedFeatures?.includes('roster'),
            einvoice: !!subscriptionPlanData?.restrictedFeatures?.includes('einvoice'),
        })
    }, [subscriptionPlanData, openDialog])


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;

        setFormInput({ [name]: newValue });
    };

    const handlePlanPrices = evt => {
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
        let keysArr = Object.keys(checkBoxState)?.filter((item) => checkBoxState?.[`${item}`])
        //console.log(formInput, checkBoxState, keysArr)

        if (editMode) {
            handleUpdate(formInput.id, { ...formInput, restrictedFeatures: keysArr })
        } else {
            handleCreate({ ...formInput, restrictedFeatures: keysArr })
        }

        handleClose()
    }

    return (
        <>
            {/*<Button variant="contained" color="primary" onClick={handleClickOpen}>{mode}</Button>*/}
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmitForm}>
                    <DialogTitle id="form-dialog-title">Subscription Plan</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="countryCode"
                            name="countryCode"
                            label="Country Code"
                            type="text"
                            fullWidth
                            aria-readonly={true}
                            value={formInput.countryCode}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="planGroupLabel">
                                Plan Group
                            </InputLabel>
                            <Select
                                labelId="planGroup"
                                id="planGroup"
                                name="planGroup"
                                fullWidth
                                value={formInput.planGroup}
                                onChange={handleInput}
                            >
                                <MenuItem value="DEFAULT">Default</MenuItem>
                                <MenuItem value="FOOD_BEVERAGE">Food and Beverage</MenuItem>
                                <MenuItem value="RETAIL">Retail</MenuItem>
                                <MenuItem value="RESERVATION">Reservation</MenuItem>
                            </Select>
                            <FormHelperText>Select plan group</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="planName"
                                name="planName"
                                label="Plan Name"
                                type="text"
                                fullWidth
                                value={formInput.planName}
                                onChange={handleInput}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                value={formInput.description}
                                onChange={handleInput}
                            />
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="monthlyPrice"
                            label="Monthly Price"
                            name="MONTHLY"
                            type="number"
                            fullWidth
                            value={formInput.planPrices.MONTHLY}
                            onChange={handlePlanPrices}
                        />
                        <FormControl margin="dense">
                            <FormLabel >權限鎖定</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.timeCard} onChange={handleChange} name="timeCard" size='small' classes={{ root: classes.root }} />}
                                    label="打卡"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.orderDisplay} onChange={handleChange} name="orderDisplay" size='small' classes={{ root: classes.root }} />}
                                    label="訂單顯示"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.salesReport} onChange={handleChange} name="salesReport" size='small' classes={{ root: classes.root }} />}
                                    label="銷售報表"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.customerStats} onChange={handleChange} name="customerStats" size='small' classes={{ root: classes.root }} />}
                                    label="來客總覽"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.timeCardReport} onChange={handleChange} name="timeCardReport" size='small' classes={{ root: classes.root }} />}
                                    label="職員打卡表"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.membership} onChange={handleChange} name="membership" size='small' classes={{ root: classes.root }} />}
                                    label="會員管理"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.calendar} onChange={handleChange} name="calendar" size='small' classes={{ root: classes.root }} />}
                                    label="排程管理"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.staff} onChange={handleChange} name="staff" size='small' classes={{ root: classes.root }} />}
                                    label="員工"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.roster} onChange={handleChange} name="roster" size='small' classes={{ root: classes.root }} />}
                                    label="排班管理"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkBoxState?.einvoice} onChange={handleChange} name="einvoice" size='small' classes={{ root: classes.root }} />}
                                    label="電子發票"
                                />
                            </FormGroup>
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
        </>
    )
}

const useStyles = makeStyles({
    root: {
        padding: `3px 3px 3px 9px`
    },
});