import React from "react";
import css from "./PageSelection.module.scss";
import {Link} from "react-router-dom";



const PageSelection = (props) => {
    let {selected, total, displayedNumber, getLink} = props;
    if (total<displayedNumber) displayedNumber=total;
    //let firstDisplayed;

    let numbers = [];
    let s = selected-Math.floor(displayedNumber/2);
    if (s<1) s=1;
    else if (s+displayedNumber>total) s -= s+displayedNumber-total-1;
    for (let i = s; i<s+displayedNumber && i<=total; i++) {
        numbers.push(
            <Link key={i} to={getLink(i)}>
                <button className={i===selected && css.selected} /*key={i}*/ /*onClick={()=>selectPage(i)}*/>{i}</button>
            </Link>
        );
    }
    //const back = () =>{selectPage(selected>1 ? selected-1 : total)}
    //const forward = () =>{selectPage(selected<total ? selected+1 : 1)}

    return <div className={css.btns}>
        {/*<button className={css.first} onClick={back}>{"<<"}</button>*/}
        <Link  to={getLink(selected>1 ? selected-1 : total)}>
            <button className={css.arrow}>{"❮"}</button>
        </Link>
        {numbers}
        <Link  to={getLink(selected<total ? selected+1 : 1)}>
            <button className={css.arrow}>{"❯"}</button>
        </Link>
        {/*<button className={css.last}>{">>"}</button>*/}
    </div>



}
export default PageSelection;

