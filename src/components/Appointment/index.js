import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const BACK = "BACK";
const STATUS = "STATUS";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const initial = props.interview ? SHOW : EMPTY;
  let { mode, transition, back } = useVisualMode(initial);

  function save(name, interviewer) {
    transition(STATUS);
    props.bookInterview(props.id, {student: name, interviewer})
      .then((res) => 
        transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteInterview() {
    transition(STATUS);
    props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  function editInterview(name, interviewer) {
    transition(EDIT);
    props.editInterview(props.id, {student: name, interviewer})
      .then(() => transition(SHOW))
  }

  useEffect(() => {
    if (props.interviewInfo && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interviewInfo === null && mode === SHOW) {
     transition(EMPTY);
    }
    console.log("mode", mode);
   }, [props.interviewInfo, transition, mode]);
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {(mode === EMPTY || mode === BACK) && <Empty onAdd={() => transition(CREATE)}/>}
      
      {mode === SHOW && 
      <Show 
        student={props.interviewInfo ? props.interviewInfo.student:null} 
        interviewer={props.interviewInfo ? props.interviewInfo.interviewer:null}
        onDelete={() => transition(DELETE)}
        onEdit={editInterview}
      />}
      
      {mode === CREATE && 
      <Form 
        student={props.interviewInfo ? props.interviewInfo.student:null} 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}

      {mode === STATUS &&
      <Status />}

      {mode === DELETE &&
      <Confirm 
        message="Are you sure you want to delete this?"
        onConfirm={deleteInterview}
        onCancel={() =>  back()}
        />}

      {mode === EDIT && 
      <Form 
        name={props.interviewInfo ? props.interviewInfo.student:null} 
        interviewer={props.interviewInfo ? props.interviewInfo.interviewer.id:null}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />} 

      {mode === ERROR_SAVE && 
      <Error onClose={() => transition(SHOW)} message={"Error saving"}/>} 

      {mode === ERROR_DELETE && 
      <Error onClose={() => transition(SHOW)} message={"Error deleting"}/>} 

    </article>
  )
}