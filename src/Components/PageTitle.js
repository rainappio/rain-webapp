import React from 'react';
import { Text } from './Texts';

export const PageTitle = (props) => {
    return (
        <>
            <Text theme={{
                display: "block",
                fontSize: "1.75em",
                margin: "40px 0 29px 40px",
                fontWeight: 600,
                color: "#444",
                userSelect: "none"
            }}>
                {props.children}
            </Text>
        </>
    )
}