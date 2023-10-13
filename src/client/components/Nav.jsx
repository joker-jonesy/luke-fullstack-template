import {Link} from "react-router-dom";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLogoutMutation} from "../reducers/auth";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import logo from '../../../public/vite.svg'

function Nav(){

    const [logout] = useLogoutMutation();
    const user = useSelector((state)=>state.auth.credentials.user) || "";

    const [toggle, setToggle]=useState(false);

   return (
       <>
           <nav>
               <div className={"logo"}>
                   <img src={logo} alt={"site logo"}/>
               </div>

               <div className={"link-container"}>
                   <Link to="/">Posts</Link>
                   {!user.userId && <Link to={"/register"}>Login/Register</Link>}
                   {user.userId && <Link to={"/user"}>Profile</Link>}
                   {user.userId && <a onClick={logout}>Logout</a>}
                   {/*<div className={"profile"}>{user.userId && <h1>{user.username}</h1>}</div>*/}
               </div>
               <FontAwesomeIcon className={"menu"} onClick={()=>setToggle(!toggle)} icon={faBars} size={"2x"} />
           </nav>
           <div className="mobile_menu" style={{left: toggle?"0":"-100%"}}>
               <Link to="/">Posts</Link>
               {!user.userId && <Link to={"/register"}>Login/Register</Link>}
               {user.userId && <Link to={"/user"}>Profile</Link>}
               {user.userId && <button onClick={logout}>Logout</button>}
           </div>

       </>
   )
}

export default Nav;