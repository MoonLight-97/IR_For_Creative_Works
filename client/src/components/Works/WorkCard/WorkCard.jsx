import React from "react";
import css from "./WorkCard.module.scss"
import {NavLink} from "react-router-dom";


export const WorkCard = (props) => {
    const {title, author, content} = props;
    return <div className={css.card}>
        <NavLink to={"/work/1"}><div className={css.title}>{title}</div></NavLink>
        <div><span className={css.fieldDescription}>Author: </span>{author}</div>
        <div>{content}</div>
    </div>
}
