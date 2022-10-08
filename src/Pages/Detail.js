import React from "react";
import { useParams } from "react-router-dom";

import Footer from "../Footer";


const Detail = (props) => {
    let {id} = useParams();
    const filteredSool = props.sool.filter((el) => el.id === Number(id))[0]

    return (
        <div>
            <img src={filteredSool.img} alt={filteredSool.name}/>
            <div>{filteredSool.name}</div>
            <Footer/>
        </div>
    )
}

export default Detail