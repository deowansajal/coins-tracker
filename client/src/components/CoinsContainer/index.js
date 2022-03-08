import React from 'react'
import classNames from 'classnames'

const CoinsContainer = ({ className, children }) => {
    const classes = classNames({
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-8': true,
        [className]: className,
    })
    return <div className={classes}>{children}</div>
}

export default CoinsContainer
