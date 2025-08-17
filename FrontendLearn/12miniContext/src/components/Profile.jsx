import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

const Profile = () => {

    // useContext(UserContext) here means ki jab bhi ye line use kri ho toh toh UserContextProvider mein jo 'value' prop tha woh dedo
    const {user} = useContext(UserContext)

    if(!user) return <div>Please Login</div>

    return <div>Welcome {user.username}</div>
}

export default Profile