import React from 'react'
import classNames from 'classnames'

const Loading = ({ className }) => {
    const classes = classNames({
        'text-center mt-10 text-3xl': true,
        [className]: className,
    })
    return <h1 className={classes}>Loading...</h1>
}

export default Loading
