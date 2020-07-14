import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import React from 'react'
import { withStyles } from "@material-ui/core/styles";

export const TooltipBasic = withStyles(theme => ({
    // arrow: {
    //     color: "#595959",
    //     boxShadow: "0 2px 12px 0 #0000001a",
    // },
    tooltip: {
        // backgroundColor: "#fff",
        // color: "#000000de",
        // boxShadow: "0 2px 12px 0 #0000001a",
        // fontSize: 11,
        // border:"1px solid #595959"
        fontFamily: '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'
    }
}))(Tooltip);
