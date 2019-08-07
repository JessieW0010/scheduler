const getAppointmentsForDay = function(state, day) {
  // state.days is an array of days
  const aptArr;
  for (let date of state.days) {
    if (date.name === day) {
      aptArr = date.appointments;
    }
  }
  
  const appointmentsArr = [];
  for (let aptObj in state.appointments) {
    for (let id of aptArr) {
      if (id === aptObj) {
        appointmentsArr.push(state.appointments[aptObj])
      }
    }
  }
  return appointmentsArr;
}

module.exports = { getAppointmentsForDay };