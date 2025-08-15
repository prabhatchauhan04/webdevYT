import Card from './components/Card'


function App() {

  return (
    <>
      <h1 className='bg-amber-700 text-5xl p-6 m-3'>Tailwind css testing</h1>
      <Card userName="Ashika" job="Content Creator" /> 
      <Card userName="Zoya" /> 
    </>
  )
}

// <> </> : these are known as fragments

export default App
