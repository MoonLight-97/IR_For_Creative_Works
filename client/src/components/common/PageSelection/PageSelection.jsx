import React, { useState } from "react";
import css from "./PageSelection.module.scss";
import {Link} from "react-router-dom";



const PageSelection = (props) => {
    let {selected, total, displayedNumber, changePage} = props;
    let [selectedPage, selectPage] = useState(selected);
    //let firstDisplayed;

    let numbers = [];
    let pagesCount = Math.ceil(total / displayedNumber);
    
    let currentItemsStart = selectedPage * displayedNumber;
    for (let i = 1; i <= pagesCount; i++) {
        numbers[i - 1] = i;
    }

    const switchPage = (pagetoChangeTo) => {
        changePage(pagetoChangeTo)
    }

    return <div className={css.btns}>
        {/*<button className={css.first} onClick={back}>{"<<"}</button>*/}
        {selectedPage > 1 && <span onClick={() => switchPage(selectedPage - 1)}>
            <button className={css.arrow}>{"❮"}</button>
        </span>}
        {numbers.map(page => {
            return <span key={page} onClick={() => switchPage(page)}>
                <button className={page===selected && css.selected} /*key={i}*/ /*onClick={()=>selectPage(i)}*/>{page}</button>
            </span>
        })}
        {selectedPage < pagesCount && selectedPage != 0 && <span onClick={() => switchPage(selectedPage + 1)}>
            <button className={css.arrow}>{"❯"}</button>
        </span>}
        {/*<button className={css.last}>{">>"}</button>*/}
    </div>



}
export default PageSelection;

