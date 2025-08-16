import { useState, useEffect } from 'react';

// currency is the currency code you want to fetch information for
// e.g., 'usd', 'eur', etc.
function useCurrencyInfo(currency) {
    const [data , setData] = useState({}); // data will hold the currency conversion information

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then(res => res.json())
            .then(json => setData(json[currency]))
    } , [currency] )

    return data; // return the currency information (pura object conversion rates ka)
}


export default useCurrencyInfo;


