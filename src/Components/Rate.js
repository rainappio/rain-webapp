import React from 'react';
import styled from 'styled-components';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { BasicContainer } from './Containers';

//#region 算選取幾個星星
const countStar = (rate = 0, size, space) => {
    let res = [];
    for (let count = 0; count < 5; count++) {
        if ((rate) > count) {
            res.push(<StarRoundedIcon key={count} className={"first"} style={{ margin: count > 0 && space, width: size, height: "100%", flex: "none", color: "#f7ba2a" }} />)
        } else {
            res.push(<StarRoundedIcon key={count} className={"other"} style={{ margin: space, width: size, height: "100%", flex: "none", color: "#eff2f7" }} />)
        }
    }
    return res;
}
//#endregion
const RateBase = (props) => {
    return (
        <BasicContainer className={"container"} theme={{
            display: "inline-block",
            top: props?.theme?.top,
            left: props?.theme?.left,
            right: props?.theme?.right,
            bottom: props?.theme?.bottom,
        }}>
            <BasicContainer theme={{ display: "flex", width: "100%" }}>
                {countStar(props.rate, props.size, props.margin)}
            </BasicContainer>
        </BasicContainer>
    )
}

/* 
   Date   : 2020-07-22 12:47:06
   Author : Arhua Ho
   Content: 可傳入props : 
                rate: 亮幾個星星， int
                size: 星星多大科， "2rem"
                margin : 星星間隔 ,"0 0 0 幾rem"
*/
export const Rate = styled(RateBase).attrs((props) => ({}))`

`