import React from 'react'
import classNames from 'classnames'

const Button = ({ className, ...props }) => {
    const classes = classNames({
        'bg-gradient-to-r from-cyan-500 to-blue-500  rounded-full text-white px-4 py-2 w-full hover:from-cyan-600 hover:to-blue-600 transition duration-150 ease-out ': true,
        [className]: className,
    })
    return (
        <button {...props} className={classes}>
            Submit
        </button>
    )
}

export default Button
