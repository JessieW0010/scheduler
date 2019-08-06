import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  let InterviewerItems = props.interviewers.map((interviewer) => <InterviewerListItem 
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
    selected={props.value === interviewer.id} />);
  
  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">Interviewer</h4>
      <ul class="interviewers__list">
        {InterviewerItems}
      </ul>
    </section>
   );
 }