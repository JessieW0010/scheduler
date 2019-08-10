import { useState, useEffect } from "react";
import Axios from "axios";

/* 
  FUNCTION MUST RETURN THE FOLLOWING:
    state, 
    setDay,
    bookInterview, 
    deleteInterview,
    editInterview
*/

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers:{}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers}));
  
  useEffect(() => {
    Promise
    .all([
      Axios.get("http://localhost:3001/api/days"),
      Axios.get("http://localhost:3001/api/appointments"),
      Axios.get("http://localhost:3001/api/interviewers")
    ])
    .then((res) => {
      setDays(res[0].data)
      setAppointments(res[1].data)
      setInterviewers(res[2].data)
    })
  }, [])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return (
      Axios
        .put(`http://localhost:3001/api/appointments/${id}`, {interview})
        .then((res) => 
          setState({
            ...state,
            appointments
        })))
  }
  
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      Axios
        .delete(`http://localhost:3001/api/appointments/${id}`)
        .then((res) => 
          setState({
            ...state,
            appointments
        })))
  }
  
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return (
      Axios
        .put(`http://localhost:3001/api/appointments/${id}`, {interview})
        .then((res) => 
          setState({
            ...state,
            appointments
        })))
  }

  return {
    state, 
    setDay,
    bookInterview, 
    deleteInterview,
    editInterview
  }

}