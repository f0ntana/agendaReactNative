import { AsyncStorage } from 'react-native';

const API_BASE = 'http://petrovina-crm.softsul.agr.br/api/';
// const API_BASE = 'http://localhost:8000/api/';

export const API = {
    getCarregamentos() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'carregamentos', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    updateSyncProductions(payload) {
        let data = JSON.stringify(payload);
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'sync-productions-from-app', {
                method: 'post',
                body: data,
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    updateSyncSchedules(payload) {
        let data = JSON.stringify(payload);
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'sync-schedules-from-app', {
                method: 'post',
                body: data,
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    updateSyncAnswersPlace(payload) {
        let data = JSON.stringify(payload);
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'sync-answers-places-from-app', {
                method: 'post',
                body: data,
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSync() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncCrops() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-crops', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncCultivars() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-cultivars', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncSeedBrands() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-seed-brands', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncPlaces(lastDateSync) {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-places/' + lastDateSync, {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncSchedules() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-schedules', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncProductions(lastDateSync) {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(
                API_BASE + 'schedule-sync-productions/' + lastDateSync,
                {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + value,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
        });
    },

    getSyncProductionDetails() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-production-details/', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncQuestions() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-questions', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    getSyncAnswers() {
        return AsyncStorage.getItem('_token').then(value => {
            return fetch(API_BASE + 'schedule-sync-answers', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        });
    },

    postLogin(payload) {
        let data = JSON.stringify(payload);
        return fetch(API_BASE + 'login', {
            method: 'post',
            body: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
};
