import React, { useState, useContext, useEffect } from 'react';
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
                
                value={[new Date('2020-07-01'),new Date('2020-07-30')]}// [startDate,endDate]
            對外開放樣式 theme = {  }
*/
export const DatePicker = (props) => {

    const [Value, setValue] = useState([new Date(), new Date()]);

    useEffect(() => {
        setValue([(props?.value?.[0] ?? new Date()), (props?.value?.[1] ?? new Date())])

    }, [props.value])

    return (
        <>

            <BasicContainer theme={{ width: "15.375rem", ...props?.theme }}>
                <WeekendDay>
                    <DateRangePicker
                        value={Value}
                        placeholder="選擇日期範圍"
                        isShowTrigger={false}
                        onChange={date => {
                            //console.log('DateRangePicker1 changed: ', date);
                            setValue(date);
                            props.getDate && props.getDate(date);
                            props.doThings && props.doThings(date);
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

