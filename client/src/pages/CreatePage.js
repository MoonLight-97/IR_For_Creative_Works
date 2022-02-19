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
        title: "", description: "", content: "", status: "В процессе", size:"Мини", janr: "Рассказ"
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
            <div className={css.fieldTitle}>Рамзер работы</div>
            <div>
                <select name="size" value={form.size} onChange={changeHandler}> //тут 040-0036
                    <option>Мини</option>
                    <option>Средний</option>
                    <option>Большой</option>
                </select>
            </div>
            <div className={css.fieldTitle}>Тип работы</div>
            <div>
                <select name="janr" value={form.janr} onChange={changeHandler}> //тут 040-0036
                    <option>Рассказ</option>
                    <option>Проза</option>
                    <option>Фанфик</option>
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

