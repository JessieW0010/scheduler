import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterviewer, getInterviewersForDay} from "helpers/selectors"

export default function Application(props) {

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

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {getAppointmentsForDay(state, state.day).map((appointment) =>
          <Appointment 
            key={appointment.id}
            id={appointment.id}
            interviewInfo={getInterviewer(state, appointment.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
            bookInterview={bookInterview}
            {...appointment}/>
        )}
      </section>
    </main>
  );
}
