import React from "react";
import classnames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classnames("button", {
     "button--danger": props.danger,
     "button--confirm": props.confirm,
     "button--disabled": props.disabled
   });

   let clickEvt;
   if (props.disabled) {
    clickEvt = () => console.log("disabled");
   } else {
    clickEvt = () => props.onClick();
   }

   return (
     <button
       className={buttonClass}
       onClick={clickEvt}
     >
       {props.children}
     </button>
   );
 }