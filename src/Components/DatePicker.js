import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BasicContainer, Container, SubContainer } from '../Components/Containers'
import { Text } from '../Components/Texts';
import { Context } from '../Store/store'
import { DateRangePicker } from 'element-react';
import 'element-theme-default';
import DateRangeIcon from '@material-ui/icons/DateRange';



/*
   Date   : 2020-07-08 16:41:30
   Author : GGGODLIN
   Content: 可傳入props
                getDate (function) : 請塞useForm的第四個參數
                startDate={new Date('2020-07-01')}//不塞的話預設今天
                endDate={new Date('2020-07-30')}//不塞的話預設今天
            對外開放樣式 theme = {  }
*/

export const DatePicker = (props) => {


    const [value, setvalue] = useState([(props.startDate ?? new Date()), (props.endDate ?? new Date())]);

    return (
        <>

            <BasicContainer theme={{ width: "15.375rem", ...props?.theme }}>
                <WeekendDay>
                    <DateRangePicker
                        value={value}
                        placeholder="選擇日期範圍"
                        isShowTrigger={false}
                        onChange={date => {
                            //console.log('DateRangePicker1 changed: ', date);
                            setvalue(date);
                            props.getDate && props.getDate(date);
                        }}
                        align='left'
                        rangeSeparator=' 至 '
                    />
                </WeekendDay>
                <DateRangeIcon style={{
                    position: "absolute",
                    top: "0.35rem",
                    left: "0.8rem",
                    color: "#666",
                    width: "1.1rem"
                }} />
            </BasicContainer>


        </>
    )
}

const WeekendDay = styled.div.attrs((props) => ({}))`
    && {
        .el-input__inner {
            //padding-left: 35px;
            //padding-right: 0px;
            text-align :center;
            border-radius: 18px;
            border-color: #666;
            padding-top: .1rem;
            color:#666;
            font-family: "Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif;
            font-weight: 500;
            font-size: 0.875rem;
        }
        .el-input__inner:hover {
            border-color: #c0c4cc;
        }
        .el-input__inner:focus {
            border-color: #964f19;
        }
        .el-input__icon{
            left:0;
        }
        .is-filled {
            width: 100% !important;
        }
        .el-date-editor--daterange.el-input {
            width: 100% !important;
        }
        

        // .MuiPickersDay-daySelected {
        //     color :red
        // }

    }
`

