import classNames from 'classnames'
import { useEffect } from 'react'

const ToastMessage = ({
    type = 'success',
    message,
    duration = 5000,
    setMessage,
    className,
}) => {
    const classes = classNames({
        'text-red-400': type === 'error',
        [className]: className,
    })

    useEffect(() => {
        const timerId = setTimeout(() => {
            setMessage('')
        }, duration)

        return () => clearTimeout(timerId)
    }, [duration, setMessage, message])

    return <p className={classes}>{message}</p>
}

export default ToastMessage
