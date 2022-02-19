import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./WorkInfo.module.scss";
import likeIcon from "./like-heart.svg"
import commentsIcon from "./comments.svg"
import downloadIcon from "./ic-download.svg"
import {useLocation, useParams} from 'react-router-dom'
import { useHttp } from "../../../../pages/hooks/http.hook";
import { Loader } from "../../../common/Loader";
import { AuthContext } from "../../../../context/AuthContext";
import Comment from "./Comment/Comment";
import { buildCheckFunction } from "express-validator";

const WorkInfo = (props) => {
    //запрос за работой, которую кликнули
    const {workId} = useParams()
    const {loading, request, error, cleanError} = useHttp()
    const [isLikeLoading, setLikeLoading] = useState(false)
    const {token, userId} = useContext(AuthContext)
    const [work, setWork] = useState({})
    const [pageLoading, setLoading] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(false)
    const textArea = useRef(null)
    const comments = []

    useEffect(async () => {
        try {
            setLoading(true);

            //получение всего нужного для отображения работы
            const fetchedWork = await request(`/api/work/${workId}`, 'GET', null, {'authorization': `Bearer ${token}`})
            const author = await request(`/api/user/${fetchedWork.user}`, 'GET', null, {'authorization': `Bearer ${token}`})
            const likes = await request(`/api/like/${workId}`, 'GET', null, {'authorization': `Bearer ${token}`})
            const comments = await request(`/api/comments/${workId}`, 'GET', null, {'authorization': `Bearer ${token}`})
            //добавляем автора в полученную работу потому что автор не указывается при создании работы
            fetchedWork.author = author
            //добавляем количество лайков возвращенное сервером
            fetchedWork.likes = likes.count
            //добавляем залайканная работа или нет пользователем
            fetchedWork.isLiked = likes.users.includes(userId)
            //комментарии
            fetchedWork.commentsCount = comments.count
            fetchedWork.comments = {authors: [], contents: comments.contents}

            //получить владельцев комментариев и засунунуть их в работу, чтобы потом отрисовать
            for (let i = 0; i < comments.authors.length; i++) {
                const email = await request(`/api/user/${comments.authors[i]}`, 'GET', null, {'authorization': `Bearer ${token}`})
                fetchedWork.comments.authors.push(email)
            }

            fetchedWork.comments.authors.reverse()

            setWork(fetchedWork)

            setLoading(false)
        } catch(e) {
            setLoading(false)
            console.log(e)
        }
    }, [workId])

    const addLike = async e => {
        try {
            setLikeLoading(true)

            await request(`/api/like`, 'POST', {workId, userId}, {'authorization': `Bearer ${token}`})
            setWork(work => ({...work, likes: work.likes++, isLiked: true}))

            setLikeLoading(false)
        } catch(e) {
            console.log(e)
        }
    }

    const deleteLike = async e => {
        try {
            setLikeLoading(true)
            
            await request(`/api/like`, 'DELETE', {workId, userId}, {'authorization': `Bearer ${token}`})
            setWork(work => ({...work, likes: work.likes--, isLiked: false}))

            setLikeLoading(false)
        } catch(e) {
            setLikeLoading(false)
            console.log(e)
        }
    }

    let isAddOrDelete = work.isLiked ? deleteLike: addLike
    
    const addComment = async e => {
        if (!textArea.current.value) return;

        try {
            setCommentsLoading(true)
            await request(`/api/comments`, 'POST', {workId, content: textArea.current.value, author: userId}, {'authorization': `Bearer ${token}`})
            const email = await request(`/api/user/${userId}`, 'GET', null, {'authorization': `Bearer ${token}`})
            setWork(work => ({...work, commentsCount: work.commentsCount + 1, comments: {authors: [email, ...work.comments.authors],
                                                                                         contents: [textArea.current.value, ...work.comments.contents]} }))
            textArea.current.value = ''
            setCommentsLoading(false)
        } catch(e) {
            setCommentsLoading(false)
            console.log(e)
        }
    }
    
    if (pageLoading) {
        return <Loader />
    }

    if (work && work.comments) {
        for (let i = 0; i < work.comments.authors.length; i++) {
            const author = work.comments.authors[i]
            const content = work.comments.contents[i]
            
            comments[i] = <Comment author={author} content={content} key={i} />
        }
    }

     return (
        <div className={css.workInfoPage}>
        <div className={css.workInfoCard}>
            <div className={css.firstTitle}>{}</div>
            <div className={css.item}><span className={css.fieldDescription}>Автор: </span><span className={css.title}>{work.author}</span></div>
            <div className={css.item}><span className={css.fieldDescription}>Тип работы: </span><span className={css.status}>{work.janr}</span></div>
            <div className={css.item}><span className={css.fieldDescription}>Статус: </span><span className={css.status}>{work.status}</span></div>
            <div className={css.descriptionContainer}>
                <span className={css.fieldDescription}>Размер: </span>
                <div className={css.size}>{work.size}</div>
                <div className={css.info}>1 страница</div>
                <div className={css.info}>1 часть</div>
            </div>
            <div className={css.btnContainer}>

                <div className={work.isLiked ? `${css.btn} ${css.active}`: `${css.btn}`} style={{cursor: "pointer"}} onClick={isLikeLoading ? null: isAddOrDelete}>
                    {isLikeLoading && <Loader />}
                    {!isLikeLoading && <>
                    <div className={css.info}>
                        <img src={likeIcon} className={css.icon}/>
                        <div className={css.count}>{work.likes}</div>
                    </div>
                    <div className={css.title}>Нравится</div>
                    </>}
                </div>

                <div className={css.space}></div>

                <div className={css.btn}>
                    <div className={css.info}>
                        <img src={commentsIcon} className={css.icon}/>
                        <div className={css.count}>{work.commentsCount}</div>
                    </div>
                    <div className={css.title}>Комментарии</div>
                </div>

                <div className={css.space}></div>

                <div className={css.btn}>
                    <div className={css.info}>
                        <img src={downloadIcon} className={css.icon}/>
                    </div>
                    <div className={css.title}>Скачать</div>
                </div>

            </div>
        </div>

        <div className={css.workCard}>
            <div className={css.title}>{work.title}</div>
            <div className={css.text}>
                <p>{work.content}</p>
            </div>
        </div>

        <div className={css.addComment}>
            <textarea placeholder="Ваш комментарий здесь..." ref={textArea}></textarea>
            <button className="btn blue darken-1" style={styles.but} onClick={commentsLoading ? null: addComment}>Добавить комментарий</button>
            
        </div>

        <div className={css.comments}>
            {commentsLoading ? <Loader /> :comments}
        </div>
        
    </div>
     )}

     const styles = {
        but: {
            marginTop: "2%",
            marginRight:"2%",
            right:"0"
        }
    }

export default WorkInfo;

