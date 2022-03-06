import classNames from 'classnames'

import formatCash from '../../utils/formatCash'

import { DeleteIcon, EditIcon } from '../../components/Icon'

const CoinCardHeader = ({ className, children }) => {
    const classes = classNames({
        'flex justify-between': true,
        [className]: className,
    })
    return <div className={classes}>{children}</div>
}

const CoinCardBody = ({ children }) => {
    return <div>{children}</div>
}

const CoinCardListItem = ({ title, value }) => {
    return (
        <li className="flex justify-between font-medium text-sm">
            <div>{title}:</div>
            <div>{value}</div>
        </li>
    )
}

const CoinCard = ({
    id,
    name,
    symbol,
    price,
    rank,
    volume,
    supply,
    marketCapUsd,
    isIconShown,
    updateCoinMode,
    removeCoinHandler,
}) => {
    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/40 text-white px-4 py-2 mx-4 rounded-md">
            <CoinCardHeader>
                <h4 className="font-bold pb-3">
                    {name} <small className="text-xs">({symbol})</small>
                </h4>
                {isIconShown && (
                    <div className="flex justify-between">
                        <EditIcon
                            className="mr-1"
                            onClick={() => updateCoinMode(id)}
                        />
                        <DeleteIcon onClick={e => removeCoinHandler(id)} />
                    </div>
                )}
            </CoinCardHeader>

            <CoinCardBody>
                <ul>
                    <CoinCardListItem title="Price" value={formatCash(price)} />
                    <CoinCardListItem
                        title="Market Cap"
                        value={formatCash(marketCapUsd)}
                    />
                    <CoinCardListItem title="Rank" value={'#' + rank} />
                    <CoinCardListItem
                        title="Volume"
                        value={formatCash(volume)}
                    />
                    <CoinCardListItem
                        title="Supply"
                        value={formatCash(supply)}
                    />
                </ul>
            </CoinCardBody>
        </div>
    )
}

export default CoinCard
