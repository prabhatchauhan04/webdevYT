import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/theme'
import ThemeBtn from './components/Themebtn'
import Card from './components/Card'

function App() {

  const [theme, setTheme] = useState("light")

  // ab ye 'value' mein jo functions hai woh override hogye
  // in theme.js humne khali chode hue the 
  // yha humne jab same naam se diye toh automatically override hogye
  const lightMode = () => {
    setTheme("light")
  }

  const darkMode = () => {
    setTheme("dark")
  }

  // Actual change in theme
  useEffect(() => {
    document.querySelector('html').classList.remove("light" , "dark") // jo bhi ho mode woh hta diya
    document.querySelector('html').classList.add(theme)
  } , [theme]);

  return (
    // ab inn 'value' ka direct access miljaega sabko
    <ThemeProvider value={{theme , darkMode , lightMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
              <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App




