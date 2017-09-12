import { AsyncStorage } from 'react-native'

const API_BASE = 'http://petrovina-crm.softsul.agr.br/api/'
<<<<<<< HEAD
//const API_BASE = 'http://localhost:8000/api/'
=======
// const API_BASE = 'http://localhost:8000/api/'
>>>>>>> refs/remotes/origin/master

export const API = {

    updateSyncProductions(payload) {
        let data = JSON.stringify( payload )
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'sync-productions-from-app', {
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
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'sync-schedules-from-app', {
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

    updateSyncAnswersProduction(payload) {
        let data = JSON.stringify( payload )
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'sync-answers-productions-from-app', {
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
