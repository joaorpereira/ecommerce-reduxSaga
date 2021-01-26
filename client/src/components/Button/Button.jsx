import React from 'react'
import Button from '@material-ui/core/Button';

function ButtonComponent({children, ...props}) {
    return (
        <Button {...props}>
            {children}
        </Button>
    )
}

export default ButtonComponent
