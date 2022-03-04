import React from 'react'
import classNames from 'classnames'

const btnClasses =
    'transition duration-150 ease-out uppercase font-medium text-white'

const Button = ({ className, children, ...props }) => {
    const classes = classNames({
        [btnClasses]: btnClasses,
        'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/40  rounded-full  px-4 py-2 w-full hover:from-cyan-600 hover:to-blue-600 ': true,
        [className]: className,
    })
    return (
        <button {...props} className={classes}>
            {children}
        </button>
    )
}
export const AddCoinButton = ({ className, children, onClick }) => {
    const classes = classNames({
        [btnClasses]: btnClasses,
        'w-10 h-10  flex justify-center items-center m-auto font-medium  rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow shadow-pink-500/40 focus:outline-none': true,
        [className]: className,
    })
    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}

export default Button
