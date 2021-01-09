import React from 'react'
import {Link} from "react-router-dom";

const ListHamburger = () => {
    return (
        <ul className="list__hamburger" style={{textAlign: 'left'}}>
            <li>
                <Link className="hamburger_link" to="/about">
                    About
                </Link>
            </li>
            <li>
                <Link className="hamburger_link" to="/settings">
                    Settings
                </Link>
            </li>
            <li>
                <Link className="hamburger_link" to="/pricing">
                    Add Credits
                </Link>
            </li>
           
            
        </ul>
    )
}

export default ListHamburger;