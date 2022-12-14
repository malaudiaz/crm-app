import Link from "next/link";
import {menus} from "../../data";

function mainMenu({id, text, path, iconClass, hasChild, parent_id, target}, index) {
    if (id==0) {
        return (
            <li  className="nav-item" key={index}>
                <Link href={path}>
                    <a className="nav-link ">
                        <i className={iconClass}></i>
                        <span>{text}</span>
                    </a>
                </Link>
            </li>
        )
    } else {
        if ( hasChild ) {
            return (
                <li className="nav-item" key={index}>
                    <Link href={path}>
                        <a className="nav-link collapsed" data-bs-target={'#'+target} data-bs-toggle="collapse">
                            <i className={iconClass}></i>
                            <span>{text}</span>
                            <i className="bi bi-chevron-down ms-auto"></i>                                                    
                        </a>
                    </Link>
                    <ul id={target} className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        {
                            menus.map(({text, path, parent_id, className}, idx) => {
                                if (parent_id == id) {
                                    return(
                                        <li key={idx}>
                                            <Link href={path}>
                                                <a>
                                                    <i className={className}></i>
                                                    <span>{text}</span>
                                                </a>
                                            </Link>
                                        </li>                                                
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
            )
        } else {
            if ( !parent_id && path != '-' ) {
                return (
                    <li  className="nav-item" key={index}>
                        <Link href={path}>
                            <a className="nav-link collapsed">
                                <i className={iconClass}></i>
                                <span>{text}</span>
                            </a>
                        </Link>
                    </li>
                )        
            } else {
                if ( path == '-' ) {
                    return (
                        <li className="nav-heading" key={index}>{text}</li>        
                    )            
                }
            }
        }
    }
};

const Sidebar = () => {

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                {
                    menus.map( (menu, index) => {
                        return ( mainMenu(menu, index) );
                    })
                }
            </ul>
        </aside>   
    )
};
export default Sidebar;