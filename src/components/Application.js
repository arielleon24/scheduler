import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import Appointment from "components/Appointment"
import DayList from "components/DayList";
import {getAppointmentsForDay} from 'helpers/selectors.js'

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Señor Bros",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }, 
//   {
//     id: 3,
//     time: "2pm",
//   }, 
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "The nameless Student",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }, 
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    const promise1 = axios.get('http://localhost:8001/api/days');
    const promise2 = axios.get('http://localhost:8001/api/appointments');
    const promise3 = axios.get('http://localhost:8001/api/interviewers');

    Promise.all([promise1, promise2, promise3])
      .then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => (setState({ ...prev, days, appointments, interviewers })));
    })
  }, [])
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return ( 
    <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
    />
    )
})


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
