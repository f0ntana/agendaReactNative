import { AsyncStorage } from 'react-native'

const API_BASE = 'http://petrovina-crm.softsul.agr.br/api/'

export const API = {

    updateSync(payload) {
        let data = JSON.stringify( payload )
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-update', {
                method: 'post',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + value,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        })
        return response
    },

    updateSyncSchedules(payload) {
        let data = JSON.stringify( payload )
        console.log(data)
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-update-schedules', {
                method: 'post',
                body: data,
                headers: {
                    'Authorization': 'Bearer ' + value,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        })
        console.log(response)
        return response
    },

    getSync() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync', {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + value,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        })
        return response
    },

    postLogin(payload) {
        let data = JSON.stringify( payload )
        return fetch(API_BASE + 'login', {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}