import React from 'react'
import classNames from 'classnames'

const Container = ({ children, className }) => {
    const classes = classNames({
        'container max-w-6xl mx-auto': true,
        [className]: className,
    })
    return <div className={classes}>{children}</div>
}

export default Container
