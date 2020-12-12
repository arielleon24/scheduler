
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


// export function getInterview(state, interview) {
//   const obj = {student: null, interviewer: null}
//   const appointments = state.appointments
//   const id = interview.interviewer
//   if (state.interviewers[id].id === interview.interviewer) {
//     console.log(state.appointments.interview)
//      obj.student = interview.student, 
//      obj.interviewer = state.interviewers[id]
//      return obj
//   } else {
//     return null
//   }
// }


export function getInterview(state, interview) {
  const result = {}
  for (let appId in state.appointments) {
    if(state.appointments[appId].interview && interview !== null) {
      if (state.appointments[appId].interview.student === interview.student) {
        result.student = interview.student
        result.interviewer = state.interviewers[interview.interviewer]
        return result
      }
    } 
  }
  
    return null
  }