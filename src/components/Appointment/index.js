import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";

export default function Appointment(props) {
  let component;
  if (props.interview) {
    component = <Show student={props.interview.student} interviewer={props.interview.interviewer}/>
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