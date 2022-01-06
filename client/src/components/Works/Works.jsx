import React, {useEffect, useState} from "react";
import css from "./Works.module.scss";
import {WorkCard} from "./WorkCard/WorkCard";
import PageSelection from "../common/PageSelection/PageSelection";
import {useLocation, withRouter} from "react-router-dom";
import {useHttp} from "../../pages/hooks/http.hook";



let Works = (props) => {

    //const location = useLocation();
    //console.log(location)
    const {loading, request, error, clearError} = useHttp();
    const [works, setWorks] = useState(undefined);

    const urlUserId = props.match.params.userId;

    const fetch = async (urlUserId)=>{
        try {
            let fetchedWorks = await request(`/api/works/${urlUserId}`, "GET");
            let userName = await request(`/api/user/${urlUserId}`, "GET");
            console.log(fetchedWorks)
            fetchedWorks = fetchedWorks.map(el=><WorkCard title={el.title} content={el.content} author={userName}/>)
            setWorks(fetchedWorks);
        } catch (e) { }
    }

    useEffect(()=>{
        if (urlUserId){
            fetch(urlUserId);
        } else {
            const defaultProps = {
                title: "Title",
                author: "Some Awesome Author",
                content: "LOoooooong description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac blandit nisi. Integer venenatis dui fermentum ipsum commodo dignissim. Phasellus mollis, mauris vel pretium pretium, elit magna lacinia lorem, ac aliquam nunc magna malesuada odio. Nulla vitae nisl pellentesque ante porta lobortis. Mauris felis urna, fermentum et nisi eu, consequat suscipit risus. Proin rhoncus fringilla enim, non posuere erat semper at. Nulla vitae congue nibh. Morbi pharetra eleifend lacus sed faucibus. Pellentesque tempus accumsan justo sit amet ultricies.",
            }
            setWorks([<WorkCard {...defaultProps}/>, <WorkCard {...defaultProps}/>, <WorkCard {...defaultProps}/>, <WorkCard {...defaultProps}/>]);
        }
    }, [urlUserId])



    const pageSelection = <div className={css.pages}>
        <PageSelection
            selected={1}
            total={works && works.length || 0}
            displayedNumber={5}
            getLink={()=>undefined}
        />
    </div>

    return <div className={css.worksContainer}>
        {pageSelection}
        {works}
        {pageSelection}
    </div>
}
Works = withRouter(Works);
export default Works;