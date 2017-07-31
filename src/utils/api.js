const API_BASE = 'http://localhost:8000/api/'

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MDE0NzcwMDEsImV4cCI6MTUwMTgzNzAwMSwibmJmIjoxNTAxNDc3MDAxLCJqdGkiOiJkTFV6RVRkRDZzcGNtc2E5In0.aqOl4hrw9AA4W2CCWMmpLut5sry-Ip_XHVkWxWmxvos'

export const API = {
    getSchedulesUser() {
        return fetch(API_BASE + 'schedules/3', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },

    getSync() {
        return fetch(API_BASE + 'schedule-sync/3', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}