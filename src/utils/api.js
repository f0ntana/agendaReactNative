const API_BASE = 'http://localhost:8000/api/';

export const API = {
    getSchedulesUser() {
        return fetch(API_BASE + 'schedules/user/3', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    changeOwnerPresent(scheduleId) {
        return fetch(API_BASE + 'schedules/user/changeownerpresent/' + scheduleId, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    changeFinished(scheduleId) {
        return fetch(API_BASE + 'schedules/user/changefinished/' + scheduleId, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}