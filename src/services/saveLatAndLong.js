
export default Save
realm.write(() => {
    let schedule = realm.objects('Schedule').filtered(`id = ${this.state.schedule.id}`)[0]
    if (schedule.finished) {
        return alert('Visita já finalizada')
    }
    if (schedule.start_travel) {
        schedule.endLat = String(this.state.latitude)
        schedule.endLong = String(this.state.longitude)
        schedule.finished = true
        this.setState({ finished: true  })
        return alert('Visita finalizada')
    }
    schedule.startLat = String(this.state.latitude)
    schedule.startLong = String(this.state.longitude)
    schedule.start_travel = true
    this.setState({ start_travel: true  })
    return alert('Visita iniciada')
})
