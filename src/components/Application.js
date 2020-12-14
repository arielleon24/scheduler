import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import Appointment from "components/Appointment"
import DayList from "components/DayList";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'

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
      interview={interview}
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
