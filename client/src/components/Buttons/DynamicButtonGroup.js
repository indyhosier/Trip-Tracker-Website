import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const DynamicButtonGroup = ({buttonPropsArr, btnSize}) => {
    // buttonDataArr should be an array of objects with the properties text, onClick, id, and color defined
    const buttons = buttonPropsArr.map((data) => {
        return <Button key={data.id} id={data.id} onClick={data.onClick} color={data.color}>{data.text}</Button>
    });

    return (
        <ButtonGroup size={btnSize}>
            {buttons}
        </ButtonGroup>
    );
}

export default DynamicButtonGroup;