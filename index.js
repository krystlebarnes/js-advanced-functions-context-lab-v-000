function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(timestamp) {
    this.timeInEvents.push({    
      type: "TimeIn",
      hour: +timestamp.split(" ")[1],
      date: timestamp.split(" ")[0]
    })
    return this
}

function createTimeOutEvent(timestamp) {
    this.timeOutEvents.push({    
      type: "TimeOut",
      hour: +timestamp.split(" ")[1],
      date: timestamp.split(" ")[0]
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date).hour
    const timeOut = this.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

// function allWagesFor(employee) {
//     const dates = employee.timeInEvents.map(e => e.date)
//     const wages = dates.map(d => wagesEarnedOnDate(employee, d))
//     return wages.reduce((total, wage) => total + wage)
// }

function calculatePayroll(employees) {
    return employees.map(employee => allWagesFor.call(employee)).reduce((total, wages) => total + wages)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}