import React from "react";
// import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
   return (
    <li class="interviewers__item">
      <img
      className="interviewers__item-image "
      src={props.avatar}
      alt={props.name}
      />
      {props.name}
    </li>
   );
 }