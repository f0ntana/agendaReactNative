import { AsyncStorage } from 'react-native'

const API_BASE = 'http://petrovina-crm.softsul.agr.br/api/'
// const API_BASE = 'http://localhost:8000/api/'

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

    updateSyncAnswersPlace(payload) {
        let data = JSON.stringify( payload )
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'sync-answers-places-from-app', {
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

    getSyncCrops() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-crops', {
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

    getSyncCultivars() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-cultivars', {
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

    getSyncSeedBrands() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-seed-brands', {
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

    getSyncPlaces(lastDateSync) {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-places/' + lastDateSync, {
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

    getSyncSchedules() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-schedules', {
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

    getSyncProductions(lastDateSync) {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-productions/' + lastDateSync, {
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

    getSyncQuestions() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-questions', {
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


    getSyncAnswers() {
        let response = AsyncStorage.getItem('_token').then((value) => {
            return fetch(API_BASE + 'schedule-sync-answers', {
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
