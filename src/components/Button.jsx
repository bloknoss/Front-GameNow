import React from "react";
import { Link } from "react-router-dom";


export default function Button({ text, to }) {


    return (<button className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden xl:flex items-center hover:bg-sky-400/20">
        {to ? <Link to={to}>Sign In</Link> :
            <p>{text}</p>}
    </button>);
} 