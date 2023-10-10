import {Link} from "react-router-dom";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

function Nav(){

    const [toggle, setToggle]=useState(false);

   return (
       <>
           <nav cl>
               <div className={"logo"}>

               </div>

               <div className={"link-container"}>
                   <Link to="/">HOME</Link>
                   <Link to="/">ABOUT</Link>
                   <Link to="/">STUFF</Link>

               </div>
               <FontAwesomeIcon className={"menu"} onClick={()=>setToggle(!toggle)} icon={faBars} />
           </nav>
           <div className="mobile_menu" style={{left: toggle?"0":"-100%"}}>
               <Link to="/">HOME</Link>
               <Link to="/">ABOUT</Link>
               <Link to="/">STUFF</Link>
           </div>
       </>
   )
}

export default Nav;