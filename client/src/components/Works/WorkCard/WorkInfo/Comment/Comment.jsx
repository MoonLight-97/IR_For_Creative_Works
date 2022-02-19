import React from 'react'
import css from './Comment.module.scss'

const Comment = (props) => {
    const {author, content} = props

    return (
        <div className={css.comment}>
            <h3>{author}</h3>
            <p>{content}</p>
        </div>
    )
}

export default Comment