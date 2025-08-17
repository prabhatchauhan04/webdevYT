import React from 'react'
import useTheme from '../context/theme'

export default function ThemeBtn() {

    const {theme , darkMode , lightMode} = useTheme();

    const onChangeBtn = (e) => {
        // Ye woh bta rha ki abhi on browser checked hai ya nhi using 'e.currentTarget.checked'
        // intially checked bhi false hi hoga and default theme bhi humne 'light' set kr hi diya hai
        const darkModeStatus = e.currentTarget.checked; // 'checked' ki value utha li from input tag
        if(darkModeStatus){
            darkMode();
        }else{
            lightMode();
        }
    }
    
// ye jo class ' dark: ' krke likhi hai woh jab bhi parent k paas 'dark' class hogi toh hi work krengi. 
// In your tailwind.config.js file, you need to set how dark mode is controlled. hum simple class mein added hai dark ya nhi uske basis pr krenge
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                // ye bas initially use off rakhega matlab unchecked bcoz initially light mode hoga
                checked={theme==="dark"} // this means ki checkbox 'checked' nhi hoga initially bcoz default theme is 'light'
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
    );
}

/*
The checkbox itself has an internal checked state managed by the browser that changes immediately on click.
Your event handler reads that new browser state (e.currentTarget.checked).
Then you update React state accordingly.
React re-renders and controls the checkbox's checked state explicitly with the updated theme.
*/
