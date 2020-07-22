import React from 'react';
import styled from 'styled-components';
import { BasicContainer } from './Containers';
import { Radio as RadioEl } from 'element-react';


const RadioBase = (props) => {
    return (
        <BasicContainer className={props.className} theme={{ display: props?.theme?.display ?? "inline-block", margin: props?.theme?.margin ?? "1rem 1.875rem 0 0", width: props?.theme?.width ?? "fit-content" }}>
            <RadioEl value={"1"} checked={props.checked} disabled={true}>{props.text}</RadioEl>
        </BasicContainer >
    )
}

/* 
   Date   : 2020-07-22 15:20:51
   Author : Arhua Ho
   Content: 可傳入props:
                checked : 是否勾選
                text : Radio文字
*/
export const Radio = styled(RadioBase).attrs((props) => ({}))`

& {
    .el-radio__input.is-checked.is-disabled .el-radio__inner {
        border-color: #6d3f00;
        background: #6d3f00;
        height: 14px;
        width: 14px;

        ::after {
            width: 4px;
            height: 4px;
            background-color: #c0c4cc;
        }
    }

    .el-radio__input.is-checked.is-disabled+.el-radio__label {
        color: #6d3f00;
        font-size: 0.875rem;
        font-weight: 600;
        font-family: "Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif;
    }
    .el-radio__input.is-disabled .el-radio__inner {
        border-color: #e4e7ed;
        background: #f5f7fa;
        height: 14px;
        width: 14px;

        ::after {
            width: 0px;
            height: 0px;
            background-color: #f5f7fa;
        }
    }

    .el-radio__input .el-radio__inner {
        border-color: #c0c4cc;
        background: #c0c4cc;
        height: 14px;
        width: 14px;

        ::after {
            width: 0px;
            height: 0px;
            background-color: #c0c4cc;
        }
    }
}
`
