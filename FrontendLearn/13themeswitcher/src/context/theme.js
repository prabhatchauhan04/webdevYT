// ye production level code aisa sa hota hai bohot jagah
// same kaam kr rhe jaisa 12miniContext me kiya tha
// but ye thoda easier hai bcoz ek hi file me sab kuch hai

import { createContext, useContext } from 'react';

/*
You usually override this default by wrapping your components with a context Provider and supplying a real value 
(like a real theme, and real toggle functions). The default is only used if the component isn’t inside any provider.
*/
// ye ek default object hai jo pass kra hai humne in createContext
// isme theme ki value light hai aur darkMode aur lightMode functions ko empty function se initialize kra hai
// ye functions later use honge jab hum theme toggle krne wale hain
export const ThemeContext = createContext({
    theme: 'light', // default theme
    darkMode: () => {}, // function to toggle dark mode
    lightMode: () => {}, // function to toggle light mode
});

export const ThemeProvider = ThemeContext.Provider;

// ye ek custom hook hai jo ThemeContext se value return karega
// ab hume baar baar useContext(ThemeContext) likhne ki zarurat nahi padegi har component me jaha use krna hai
// bas useTheme() likh do
export default function useTheme(){
    return useContext(ThemeContext);
};



