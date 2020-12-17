import React from "react";

import "components/Application.scss";
import Appointment from "components/Appointment"
import DayList from "components/DayList";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors.js'


import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); 

 ////-------------
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewersForDay = getInterviewersForDay(state, state.day)

    return ( 
      <Appointment 
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
