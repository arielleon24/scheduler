
export function getAppointmentsForDay(state, day) {
  const resultArr = [];
  for (let days of state.days) {
    if (days.name === day) {
      for (let id of days.appointments) {
        resultArr.push(state.appointments[id])
      }
    }
  }
  return resultArr
}