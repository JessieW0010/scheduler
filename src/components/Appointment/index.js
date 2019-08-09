import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";

export default function Appointment(props) {
  // console.log(props);
  let component;
  if (props.interview) {
    component = <Show 
      student={props.interviewInfo ? props.interviewInfo.student:null} 
      interviewer={props.interviewInfo ? props.interviewInfo.interviewer:null}
      />
  } else {
    component = <Empty />
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {component}
    </article>
  )
}