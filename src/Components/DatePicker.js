import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BasicContainer, Container, SubContainer } from '../Components/Containers'
import { Text } from '../Components/Texts';
import { Context } from '../Store/store'
import { DateRangePicker } from 'element-react';
import 'element-theme-default';



/*
   Date   : 2020-07-08 16:41:30
   Author : GGGODLIN
   Content: 可傳入props
                getDate (function) : 請塞useForm的第四個參數
            對外開放樣式 theme = {  }
*/

export const DatePicker = (props) => {


    const [value, setvalue] = useState([new Date(), new Date()]);

    return (
        <>

            <BasicContainer>
                <WeekendDay>
                    <DateRangePicker
                        value={value}
                        placeholder="选择日期范围"
                        onChange={date => {
                            //console.log('DateRangePicker1 changed: ', date);
                            setvalue(date);
                            props.getDate && props.getDate(date);
                        }}
                        align='left'
                        rangeSeparator='至'
                    />
                </WeekendDay>

            </BasicContainer>


        </>
    )
}

const WeekendDay = styled.div.attrs((props) => ({}))`
    && {
        .el-input__inner {
            padding-left: 35px;
            padding-right: 0px;
            border-radius: 18px;
        }
        .el-input__icon{
            left:0;
        }

        // .MuiPickersDay-daySelected {
        //     color :red
        // }

    }
`

