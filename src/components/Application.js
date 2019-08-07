import React, { useState, useEffect } from "react";
import Axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Index from "components/Appointment/index";

export default function Application(props) {
  const [ days, setDays ] = useState([]);

  useEffect(() => {
    Axios
    .get("http://localhost:3001/api/days")
    .then((res) => setDays(res.data))
    .catch((err) => console.log("There was an error when trying to get days", err))
  }, [days])
  
  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   }
  // ];

  const appointments = [
    {
      id: 1,
      time: "12pm"
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }, 
    {
      id: 3,
      time: "3pm",
      interview: {
        student: "Jigglypuff",
        interviewer: {
          id: 2,
          name: "Sylvester Pam",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }, 
    {
      id: "last",
      time: "8pm"
    }
  ];
  
  const [ day, findDate ] = useState("Monday");

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
          days={days}
          day={day}
          setDay={findDate}
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
        {appointments.map((appointment) => 
          <Index 
            time={appointment.time} 
            key={appointment.id} 
            interview={appointment.interview}/>
        )}
      </section>
    </main>
  );
}
