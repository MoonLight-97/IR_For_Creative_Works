import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "./hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import css from "./CreatePage.module.scss"
import {useMessage} from "./hooks/message.hook";


export const CreatePage = () => {

    const {token} = useContext(AuthContext);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        title: "", description: "", content: "", status: "В процессе"
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const createWork = async () => {
        try {
            const data = await request("api/work/create", "POST", {...form}, {Authorization: `Bearer ${token}`});
            message(data.message)
        } catch (e) { }

    }


    return <div style={styles.block} className={css.container}>
        <div className={css.pageTitle}>Добавить новую творческую работу</div>
        {/*<div className={css.rules}>{"=>Правила публикации<="}</div>*/}
        <div className={css.fields}>
            <div className={css.fieldTitle}>Название</div>
            <div><input type="text" name="title" value={form.title} onChange={changeHandler}/></div>
            <div className={css.fieldTitle}>Описание</div>
            <div><textarea name="description" value={form.description} onChange={changeHandler}/></div>
            <div className={css.fieldTitle}>Содержание работы</div>
            <div><textarea name="content" value={form.content} onChange={changeHandler}/></div>
            <div className={css.fieldTitle}>Статус работы</div>
            <div>
                <select name="status" value={form.status} onChange={changeHandler}>
                    <option>В процессе</option>
                    <option>Завершён</option>
                    <option>Заморожен</option>
                </select>
            </div>
            <div><button onClick={createWork}>Создать</button>
            <button style={styles.but} >Загрузите docx документ</button></div>
        </div>
    </div>
}

const styles = {
    but: {
        position:"absolute",
        marginRight:"2%",
        right:"0"
    },
    block:{position:"relative"
    }
}


/*
export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}*/
