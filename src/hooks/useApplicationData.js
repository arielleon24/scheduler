import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //pure function, doesnt use state
  const updateSpots = (day, days, appointments) => {
    let spots = 0;

    const dayObj = days.find((d) => d.name === day);

    for (const appointmentId of dayObj.appointments) {
      const appointment = appointments[appointmentId];
      if (!appointment.interview) {
        spots++;
      }
    }
    dayObj.spots = spots;
    return days;
  };

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; /// Creation of appointment object

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; /// Creation of appointments object

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments
      });
    })
    
  }

  function cancelInterview (id) {

    const appointments = state.appointments;
    const appointment = appointments[id];

    return axios.delete(`/api/appointments/${id}`)
      .then(()=> {
        appointment.interview = null; 
        const days = updateSpots(state.day, state.days, appointments);
        setState({...state, appointments});
      });
  }


  useEffect(() => {
    const promise1 = axios.get('/api/days');
    const promise2 = axios.get('api/appointments');
    const promise3 = axios.get('/api/interviewers');

    Promise.all([promise1, promise2, promise3])
      .then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => (setState({ ...prev, days, appointments, interviewers })));
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
