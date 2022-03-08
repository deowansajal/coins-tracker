import classNames from 'classnames'

const SuggestionsListComponent = ({
    filteredSuggestions,
    activeSuggestionIndex,
    onClick,
}) => {
    return filteredSuggestions.length ? (
        <ul className="max-h-40 w-[300px] border-t-0 list-none overflow-y-auto pl-0 shadow-lg">
            {filteredSuggestions.map((suggestion, index) => {
                let className = classNames({
                    'hover:bg-cyan-600  hover:text-white p-2': true,
                    'bg-cyan-600 text-white': index === activeSuggestionIndex,
                })

                return (
                    <li
                        className={className}
                        key={suggestion}
                        onClick={onClick}
                    >
                        {suggestion}
                    </li>
                )
            })}
        </ul>
    ) : (
        <div className="text-orange-600 p-2 w-[300px]">
            <em>Invalid Coin</em>
        </div>
    )
}

const AutoComplete = ({
    suggestions,
    input,
    setInput,
    filteredSuggestions,
    setFilteredSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    showSuggestions,
    setShowSuggestions,
}) => {
    const onChange = e => {
        const userInput = e.target.value

        // Filter our suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )

        setInput(userInput)
        setFilteredSuggestions(unLinked)
        setActiveSuggestionIndex(0)
        setShowSuggestions(true)
    }

    const onClick = e => {
        setFilteredSuggestions([])
        setInput(e.target.innerText)
        setActiveSuggestionIndex(0)
        setShowSuggestions(false)
    }

    const onKeyDown = e => {
        if (typeof input === 'undefined') {
            setInput('')
            return
        }

        if (e.keyCode === 13 && filteredSuggestions.length) {
            setInput(filteredSuggestions[activeSuggestionIndex])
        }

        if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) return

            setActiveSuggestionIndex(prevIndex => {
                return prevIndex - 1
            })
            setInput(filteredSuggestions[activeSuggestionIndex - 1])
        }

        if (e.keyCode === 40) {
            if (activeSuggestionIndex >= filteredSuggestions.length - 1) return
            setActiveSuggestionIndex(prevIndex => {
                if (prevIndex >= filteredSuggestions.length) return prevIndex
                return prevIndex + 1
            })

            setInput(filteredSuggestions[activeSuggestionIndex + 1])
        }
    }

    const classes = classNames({
        'border py-2 px-4 w-full  rounded-full focus:outline-none focus:border-cyan-700': true,
        'mb-6': filteredSuggestions.length > 0 || !showSuggestions,
    })

    return (
        <>
            <input
                autoComplete="of"
                type="text"
                className={classes}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                autoFocus={input.length > 0}
            />
            {showSuggestions && input && (
                <SuggestionsListComponent
                    onClick={onClick}
                    filteredSuggestions={filteredSuggestions}
                    activeSuggestionIndex={activeSuggestionIndex}
                />
            )}
        </>
    )
}

export default AutoComplete
