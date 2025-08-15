// Import necessary React hooks from the 'react' library
import { useState, useCallback, useEffect, useRef } from 'react'

/*
1. useState
Manages local state in a functional component. It returns a state variable and a function to update it.
2. useRef
iski help se webpage k kisi bhi element ka reference le sakte hai and uske saath manipulation kr sakte ho .Used to 
reference the password input field, so we can:
-> Select the text programmatically
-> Copy it to the clipboard when the user clicks "Copy"
3. useEffect
Performs side effects (like data fetching or DOM updates) after the component renders or when dependencies change.
Runs the passwordGenerator function automatically whenever the user changes:
-> Password length
-> Number/special character options
This ensures the password is always up to date without manual clicks.
React memoizes the dependency array values:
If the user doesn't change length, number, or special character options, the effect won’t re-run.
If any do change, React runs the effect again, calling passwordGenerator().
4. useCallback
Memoizes a function so it doesn’t get recreated on every render, useful for optimization and preventing unnecessary re-renders.
Used to optimize passwordGenerator so it’s not re-created on every render
*/

// Functional component named 'App'
function App() {
  // =========================
  // State Management
  // =========================

  // 'length' state determines the length of the generated password. Default is 8.
  const [length, setLength] = useState(8)

  // 'numberAllowed' is a boolean state to toggle inclusion of numbers in the password.
  const [numberAllowed, setNumberAllowed] = useState(false)

  // 'charAllowed' is a boolean state to toggle inclusion of special characters in the password.
  const [charAllowed, setCharAllowed] = useState(false)

  // 'password' holds the final generated password string.
  const [password, setPassword] = useState("")

  // =========================
  // Reference (useRef)
  // =========================

  // useRef is used to get a reference to the input DOM element for copying the password.
  const passwordRef = useRef(null) // intially referencing to null

  // =========================
  // Password Generator Logic
  // =========================

  /**
   * useCallback ensures the passwordGenerator function is memoized
   * and only recreated when any of the dependencies change.
   */
  const passwordGenerator = useCallback(() => {
    let pass = "" // Initialize an empty password string

    // Start with uppercase and lowercase letters
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    // Append numbers if allowed
    if (numberAllowed) str += "0123456789"

    // Append special characters if allowed
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    // Loop to generate random characters from the final 'str'
    for (let i = 1; i <= length; i++) {
      // Generate a random index to select a character
      let char = Math.floor(Math.random() * str.length + 1)

      // Append the character at that index to the password
      pass += str.charAt(char)
    }

    // Update the password state with the generated password
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]) // Dependencies for memoization

  // =========================
  // Copy to Clipboard Logic
  // =========================

  /**
   * Copies the password to the clipboard using the DOM input reference
   */
  const copyPasswordToClipboard = useCallback(() => {
    // Select the input text content (if passwordRef.current exists)
    passwordRef.current?.select() // ho sakta hai na passwordRef null ho toh woh case bhi handle krliya 

    // Set selection range 
    passwordRef.current?.setSelectionRange(0, 999)

    // ye upar ki do line useRef hook wali bas visual effect dene k liye hai ki kya select hua hai copy click krne pr aur koi use nhi hai

    // Use the Clipboard API to write text
    // ye window object k navigator k andar cliboard hota toh hum clipboard se cheezein select bhi kr sakte aur usmein likh bhi sakte
    window.navigator.clipboard.writeText(password)

  }, [password]) // Only re-create when password changes

  /*
      React's useCallback memoizes the function. For it to remain correct, it needs to know which variables inside the function might change. 
      If password changes but you don’t declare it as a dependency, the memoized version would still use the old password value.
  */

  // =========================
  // useEffect to regenerate password on any relevant state change
  // =========================

  /**
   * This effect runs whenever dependencyArray : length, numberAllowed, charAllowed or definition of passwordGenerator function changes
   * OR page reloads , 
   * automatically generating a new password.
   */
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      {/* Main container for the app UI */}
      <div className="w-full max-w-md bg-gray-900 text-orange-400 rounded-xl shadow-lg p-6 space-y-6">

        {/* App Heading */}
        <h1 className="text-white text-2xl font-semibold text-center">🔐 Password Generator</h1>

        {/* Password Output and Copy Button */}
        <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-700">
          <input
            type="text"
            value={password} // Password state shown here
            className="w-full px-4 py-2 bg-gray-800 text-white outline-none"
            placeholder="Your secure password"
            readOnly // User cannot edit this manually
            ref={passwordRef} // Connected to the useRef for copying
          />
          <button
            onClick={copyPasswordToClipboard} // Calls copy function on click
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium transition-colors"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm md:text-base">

          {/* Password Length Slider */}
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium text-white">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length} // Binds slider to length state
              onChange={(e) => setLength(e.target.value)} // Updates state on change
              className="w-1/2 cursor-pointer accent-orange-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed} // Reflects current state
              onChange={() => setNumberAllowed((prev) => !prev)} // Toggles state
              className="accent-orange-400"
            />
            <label htmlFor="numberInput" className="text-white">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)} // Toggles state
              className="accent-orange-400"
            />
            <label htmlFor="characterInput" className="text-white">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


