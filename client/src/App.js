import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./AppRoutes";
import {useAuth} from "./pages/hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar/Navbar";
import {Loader} from "./components/common/Loader";
import 'materialize-css'

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            { isAuthenticated && <Navbar /> }
            <div className="container">
                {routes}
            </div>
        </AuthContext.Provider>
    )
}

export default App;
