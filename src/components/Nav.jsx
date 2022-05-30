 import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

 export default function Nav({setLibraryStatus, libraryStatus}) {
   return(
     <div className="nav">
       <h1 className="nav__logo">Music</h1>
       <button onClick={() =>setLibraryStatus(!libraryStatus)} className="nav__btn">Library <FontAwesomeIcon icon={faMusic} /></button>
     </div>
   )
 } 