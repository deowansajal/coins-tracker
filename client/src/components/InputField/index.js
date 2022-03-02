import React from 'react'

import classNames from 'classnames'

const InputField = ({
    name,
    placeholder,
    value,
    onChange,
    className,
    type = 'text',
}) => {
    const classes = classNames({
        'border py-2 px-4 w-full mb-6 rounded-full': true,
        [className]: className,
    })
    return (
        <input
            className={classes}
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputField
