import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const FORM = "FORM";
const BACK = "BACK";
const STATUS = "STATUS";

export default function Appointment(props) {

  const initial = props.interview ? SHOW : EMPTY;
  let { mode, transition, back } = useVisualMode(initial);

  function save(name, interviewer) {
    transition(STATUS);
    props.bookInterview(props.id, {student: name, interviewer})
      .then(() => transition(SHOW));
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {(mode === EMPTY || mode === BACK) && <Empty onAdd={() => transition(FORM)}/>}
      {mode === SHOW && 
      <Show 
        student={props.interviewInfo ? props.interviewInfo.student:null} 
        interviewer={props.interviewInfo ? props.interviewInfo.interviewer:null}
      />}
      {mode === FORM && 
      <Form 
        student={props.interviewInfo ? props.interviewInfo.student:null} 
        interviewers={props.interviewers}
        onCancel={() => transition(BACK)}
        onSave={save}
      />}
      {mode === STATUS &&
      <Status/>}
    </article>
  )
}