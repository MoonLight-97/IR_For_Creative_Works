import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import css from "./Navbar.module.scss"
//import ava from process.env.PUBLIC_URL + "/wolf.jpg"


export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className={`nav-wrapper blue darken-1 ${css.navContainer}`}>
                <span className={`${css.logo}`}>Творческие работы</span>
                <div className={css.searchContainer}>
                    {/*<label htmlFor="search">Search</label>*/}
                    <input id="search" placeholder={"Поиск"}/>
                </div>
                {/*<div className="input-field inline white-text">
                    <label htmlFor="search">Search</label>
                    <input id="search" />
                </div>*/}
                <div className={css.space}></div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    {/*<li><NavLink to="/links">Ссылки</NavLink></li>*/}
                    {/*<li><a href="/" onClick={logoutHandler}>Выйти</a></li>*/}
                </ul>
                <div className={css.profile}>
                    <div className={css.name}>Имя пользователя</div>
                    <img src={process.env.PUBLIC_URL + "/wolf.jpg"}/>
                    <div className={css.arrow}>▼</div>
                    <div className={css.cover}>
                        <div className={css.dropdownMenu}>
                            <div className={css.dropdownContent}>
                                <button>Профиль</button>
                                <NavLink to={`/works/${auth.userId}`}><button>Мои работы</button></NavLink>
                                <button>Настройки</button>
                                <button onClick={logoutHandler}>Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}




/*
export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">Сокращение ссылок</span>
                <div className="input-field inline">
                    <label htmlFor="search">Search</label>
                    <input id="search" />
                </div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}*/
