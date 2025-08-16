import React, {useId} from 'react'

// useId is a React hook that generates a stable, unique ID that stays the same between renders.

function InputBox({
    label,
    amount,
    onAmountChange, // function jo amount change pr amount ko actually change krega
    onCurrencyChange, // function jo currency state variable ko change krega
    currencyOptions = [],
    selectCurrency = "usd", // default value if nothing passed
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId() // helps connect label and input bcoz browser/hume kaise pta rahega ki konse input ka konsa label hai

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // If onAmountChange exists (i.e., is not undefined or null), then call it.
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                        {/* here we are creating dropdown menu for selecting currency */}
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;