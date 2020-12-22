import React, {useCallback, useContext, useState} from 'react';
import {BasicContainer} from "../../../Components/Containers";
import {useWindowSize} from "../../../SelfHooks/useWindowSize";
import {Context} from "../../../Store/store";
import {clearlocalStorage} from "../../../Handlers/LocalStorageHandler";
import {useAsync} from "../../../SelfHooks/useAsync";
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import ReceiptIcon from '@material-ui/icons/Receipt';
import {PageTitle} from "../../../Components/PageTitle";
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export const ElectronicInvoiceReport = (props) => {

    const {invoiceApi, Theme} = useContext(Context);
    let history = useHistory();
    const {pages: {administratorsPage: {administrators}}} = Theme;
    const [width] = useWindowSize();
    const [einvoiceReport, setEInvoiceReport] = useState([])

    const getEInvoiceCheckReport = useCallback(async () => {
        return await fetch(`${invoiceApi}/einvoice/checkReport`,
            {
                headers: {
                    'content-type': 'application/json',
                },
            }
        ).then(result => {
            return result.json()

        }).then((data) => {
            console.log(data)
            setEInvoiceReport(data.results)

        }).catch((Error) => {
            console.log(Error)
            clearlocalStorage();
            //history.push("/Login");
            throw Error;
        }).finally(() => {

        });

    }, [invoiceApi, history])

    const [fetchGetEInvoiceCheckReport] = useAsync(getEInvoiceCheckReport, true);

    return (
        <>
            {width > 768 && <BasicContainer theme={administrators.basicContainer}>
                <PageTitle>E-Invoice Check Report</PageTitle>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>UBN</TableCell>
                            <TableCell>Expected Invoice Total</TableCell>
                            <TableCell>Actual Invoice Total</TableCell>
                            <TableCell>Has Pending Invoices</TableCell>
                            <TableCell>Has Errored Invoices</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {einvoiceReport.map((row) => (
                            <Row key={row.ubn}
                                 row={row}
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
    const {row} = props
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => {
                        setOpen(!open)

                        if (!open) {
                            //fetchClientSubscriptionInvoices(row.id)
                        }
                    }}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.ubn}</TableCell>
                <TableCell>{row.expectedInvoiceTotal}</TableCell>
                <TableCell>{row.actualInvoiceTotal}</TableCell>
                <TableCell>{`${row.containsPendingEInvoice}`}</TableCell>
                <TableCell>{`${row.containsErrorEInvoice}`}</TableCell>
                <TableCell>
                    <IconButton variant="contained" color="primary" onClick={() => {

                    }}>
                        <VisibilityIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} display="flex" flexDirection="row">
                            <Typography variant="h6" gutterBottom component="div">
                                Invoice Stats
                            </Typography>
                            <Box margin={2} display="flex" flexDirection="row">
                                {row.pendingInvoiceStats.map(is => (
                                    <Card margin={1} variant="outlined">
                                        <CardContent>
                                            <Typography color="textSecondary" gutterBottom>
                                                Invoice Stats
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {is.status}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                adjective
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Count: {is.invoiceCount}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                            <Typography variant="h6" gutterBottom component="div">
                                Turnkey Stats
                            </Typography>
                            <Box margin={2} display="flex" flexDirection="row">
                                {row.turnkeyMessageStats.map(is => (
                                    <Card margin={1} variant="outlined">
                                        <CardContent>
                                            <Typography color="textSecondary" gutterBottom>
                                                Invoice Stats
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {is.status}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                adjective
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                Count: {is.count}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Range Identifier</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Ranges</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.activeInvoiceNumberRanges.map((inr) => (
                                    <TableRow>
                                        <TableCell>{inr.rangeIdentifier}</TableCell>
                                        <TableCell>{inr.status}</TableCell>
                                        <TableCell>
                                            {inr.numberRanges.map(nr => (
                                                <TableRow>
                                                    <TableCell>{nr.prefix}-{nr.rangeFrom} ~ {nr.rangeTo}</TableCell>
                                                    <TableCell>{`${nr.finished}`}</TableCell>
                                                </TableRow>
                                            ))}

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
