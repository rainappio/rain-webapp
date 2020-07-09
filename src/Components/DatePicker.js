import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BasicContainer, Container, SubContainer } from '../Components/Containers'
import { Text } from '../Components/Texts';
import { Context } from '../Store/store'
import { DateRangePicker } from 'element-react';


/*
   Date   : 2020-07-08 16:41:30
   Author : GGGODLIN
   Content: 可傳入props
                icon={<Logo />} : 顯示在上半部的icon
                onClick={() => console.log("123")}
                labelFirst="test" : 上方標籤的內容
                labelSecond="2" : 下方標籤的內容
            對外開放樣式 theme = {  }
*/

export const DatePicker = (props) => {
    const { Theme } = useContext(Context);
    const { orderCard } = Theme;
    const [value, setvalue] = useState(null);
    //console.log("IN OrderCard", props);
    //...(isOn ? { backgroundColor: '#2f3e51' } : { backgroundColor: '#FFFFFF' })
    return (
        <>

            <BasicContainer>
                <WeekendDay>
                    <DateRangePicker
                        value={value}
                        placeholder="选择日期范围"
                        onChange={date => {
                            console.log('DateRangePicker1 changed: ', date, date[0].getDate());
                            setvalue(date);
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

