import React from 'react'
import {Link , NavLink} from 'react-router-dom' 
// Link tag is used in place of anchor tag here bcoz anchor tag pura page reload krta tha but react mein hum nhi chahte page refresh ho
// NavLink give more feature even more than Link . work is similar of both . it can automatically apply styles
// when the link is active (i.e., when the user is on that route).

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to='/'
                                    className={({isActive}) =>
                                        `block ${isActive ? 'text-orange-700' : 'text-gray-700'} py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/about'
                                    className={({isActive}) =>
                                        `block ${isActive ? 'text-orange-700' : 'text-gray-700'} py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/contact'
                                    className={({isActive}) =>
                                        `block ${isActive ? 'text-orange-700' : 'text-gray-700'} py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/github'
                                    className={({isActive}) =>
                                        `block ${isActive ? 'text-orange-700' : 'text-gray-700'} py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    GitHub
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}


// ye NavLink mein className mein humne callback dediya bcoz ye help krega ab ye manage krne mein ki user ne abhi kisko select kiya hua h
// home , about , contact or github mein se jo bhi select krenge woh colored hojae 
// bcoz jab bhi hum NavLink lete hai aur classes k andar iss tarike se callback lete hai toh ek variable ka access hota hai in argument
// uska naam hai 'isActive' . ye btadega ki humne kya select kiya hua hai based on url . aur humne ab js k andar likha hai css toh '${}' iske 
// andar ternary operator ka use krke based on page active hai ya nhi hum color change krwa lenge


