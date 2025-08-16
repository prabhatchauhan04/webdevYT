import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    
    /*
        useLoaderData() is a React Router hook.
        It gives access to the data returned by the route’s loader function before this component even renders.
        Benefit: The data is ready by the time the component mounts — no loading screen needed.
        react khud hi resolve krdeta promise ko jo return hua tha
    */
    const data = useLoaderData()
    
    
    // // iss tarike se jyada optimized method is useLoader wala bcoz ismein click krne k baad github option pr cheezein hongi but
    // // in useLoader one jab humara cursor bas github pr hover kr rha hoga tabhi fire hojaega sab aur cache mein store kra lega
    // const [data, setData] = useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/facebook')
    //  .then(response => response.json())
    //  .then(data => {
    //     console.log(data);
    //     setData(data)
    //  })
    // }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/facebook')
    return response.json() // returns a promise
}

/*
Now, when the user navigates to /github:
React Router detects a loader is present.
It runs githubInfoLoader() which returns a Promise.
React Router waits for the promise to resolve.
The result (resolved data) is passed to the component using useLoaderData().
So even though it's a Promise — you never have to handle .then() or await in the component.
 */





