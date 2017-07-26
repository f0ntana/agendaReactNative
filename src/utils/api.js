const API_BASE = 'http://localhost:8000/api/';

export const API = {
    getSchedulesUser() {
        return fetch(API_BASE + 'schedules/3', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MDA5MTkyNzcsImV4cCI6MTUwMTI3OTI3NywibmJmIjoxNTAwOTE5Mjc3LCJqdGkiOiJ5Sk53YlMxdTFIQU0xb2FtIn0.gDDXL1QBJxzpyXVtynKu_vVEFVnSkE0uVWK4xFCMEXs',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    changeOwnerPresent(scheduleId) {
        return fetch(API_BASE + 'schedules/changeownerpresent/' + scheduleId, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MDA5MTkyNzcsImV4cCI6MTUwMTI3OTI3NywibmJmIjoxNTAwOTE5Mjc3LCJqdGkiOiJ5Sk53YlMxdTFIQU0xb2FtIn0.gDDXL1QBJxzpyXVtynKu_vVEFVnSkE0uVWK4xFCMEXs',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    changeFinished(scheduleId) {
        return fetch(API_BASE + 'schedules/changefinished/' + scheduleId, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1MDA5MTkyNzcsImV4cCI6MTUwMTI3OTI3NywibmJmIjoxNTAwOTE5Mjc3LCJqdGkiOiJ5Sk53YlMxdTFIQU0xb2FtIn0.gDDXL1QBJxzpyXVtynKu_vVEFVnSkE0uVWK4xFCMEXs',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}