import React, { useContext } from "react";
import css from "./WorkCard.module.scss"
import {Link} from 'react-router-dom';
import { useHttp } from "../../../pages/hooks/http.hook";
import { Loader } from "../../common/Loader";
import { AuthContext } from "../../../context/AuthContext";

export function WorkCard(props){
    const {title, author, description, isOwner, id, setWorks} = props;
    const {state} = {ti: title, name: author, text: description}
    const {loading, request, error, clearError} = useHttp();
    const {token} = useContext(AuthContext)

    //функция для удаления поста

    const onDeletePost = async e => {
        try {
            await request(`/api/works/${id}`, 'DELETE', null, {'authorization': `Bearer ${token}`})
            setWorks(works => works.filter(work => work._id != id))
        } catch(e) {
            console.log(e)
        }
    }   

    return <div className={css.card}>
        <Link to = {{ pathname:`/work/${id}`, state:{ ti:title, name:author, text:description }}}><div className={css.title}>{title}</div></Link>
        <div><span className={css.fieldDescription}>Автор: </span>{author}</div>
        <div>{description}</div>
        {isOwner && <div className={css.deletePost} onClick={onDeletePost}></div>}
        {loading && <Loader />}
    </div>
}