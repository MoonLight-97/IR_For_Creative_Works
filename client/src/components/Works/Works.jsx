import React, {useContext, useEffect, useState} from "react";
import css from "./Works.module.scss";
import {WorkCard} from "./WorkCard/WorkCard";
import WorkInfo from "./WorkCard/WorkInfo/WorkInfo";
import PageSelection from "../common/PageSelection/PageSelection";
import {useLocation, withRouter} from "react-router-dom";
import {useHttp} from "../../pages/hooks/http.hook";
import { Loader } from "../common/Loader";
import { AuthContext } from "../../context/AuthContext";
import useQuery from "../../pages/hooks/query.hook";



let Works = (props) => {

    //const location = useLocation();
    //console.log(location)
    const {loading, request, error, clearError} = useHttp();
    const [works, setWorks] = useState([]);
    const [totalWorks, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const {userId, token} = useContext(AuthContext)
    const limitPerPage = 5;
    const urlUserId = props.match.params.userId;

    const fetch = async (urlUserId) => {
        try {
            setIsLoading(true);
            //в зависимости от пути делать запрос на разные endpoints
            let worksPath = '/api/works'

            if (urlUserId) {
                worksPath += `/${urlUserId}`
            }
            
            let fetchedInfo = await request(worksPath + `?page=${currentPage}&limit=${limitPerPage}`, "GET", null, {'authorization': `Bearer ${token}`});
            let fetchedWorks = fetchedInfo.works
            let worksCount = fetchedInfo.count
            
            //получить авторов постов, сделать запрос
            const getAuthors = async () => {
                for (let i = 0; i < fetchedWorks.length; i++) {
                    fetchedWorks[i].author = await request(`/api/user/${fetchedWorks[i].user}`, "GET", null, {'authorization': `Bearer ${token}`})
                }
            }
            
            setTotal(worksCount)
            await getAuthors();
            setWorks(fetchedWorks);
            setIsLoading(false);
        } catch (e) { 
            console.log(e)
        }
    }

    useEffect(()=>{
        fetch(urlUserId);
    }, [urlUserId, currentPage])


    if (works.length === 0 && currentPage > 1) {
        setCurrentPage(1)
    }

    const pageSelection = <div className={css.pages}>
        <PageSelection
            selected={currentPage}
            total={totalWorks}
            displayedNumber={limitPerPage}
            changePage={setCurrentPage}
        />
        
    </div>

    if (isLoading) {
        return <Loader />
    }

    return <div className={css.worksContainer}>
        {pageSelection}
        {works && works.length && works.map(el=><WorkCard title={el.title} description={el.description}
                                            author={el.author} key={el._id}
                                            id={el._id} 
                                            isOwner={userId === el.user} setWorks={setWorks} />)}
        {pageSelection}
    </div>
}



Works = withRouter(Works);
export default Works;