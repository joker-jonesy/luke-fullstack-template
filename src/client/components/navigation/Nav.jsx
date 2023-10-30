import {Link} from "react-router-dom";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLogoutMutation} from "../../redux/api/auth";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import logo from '../../../../public/vite.svg'
import Avatar from "../inputs/Avatar";
import SearchBar from "../inputs/SearchBar";

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

               <SearchBar/>

               <div className={"link-container"}>
                   <Link to="/">Posts</Link>
                   {!user.userId && <Link to={"/register"}>Login/Register</Link>}
                   {user.userId && <Link to={"/user"}><Avatar mod={false}/></Link>}
               </div>
               <div className={"menu"} onClick={()=>setToggle(!toggle)}>{user.userId ? <Avatar mod={false}/> :<FontAwesomeIcon className={"menu"}  icon={faBars} size={"2x"} />}</div>
           </nav>
           <div className="mobile_menu" style={{left: toggle?"0":"-100%"}}>
               <Link to="/">Posts</Link>
               {!user.userId && <Link to={"/register"}>Login/Register</Link>}
               {user.userId && <Link to={"/user"}>Profile</Link>}
           </div>

       </>
   )
}

export default Nav;