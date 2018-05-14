import moment from 'moment';
import realm from '../../models/schemas';

export default (saveProductionDetails = items => {
    let promise = new Promise((resolve, reject) => {
        items.map(item => {
            let productionDetails = realm
                .objects('ProductionDetail')
                .filtered(`id = ${item.id}`)[0];
            if (productionDetails) {
                realm.delete(productionDetails);
            }
            production = realm.create('ProductionDetail', {
                id: item.id,
                production_id: item.production_id,
                name: item.name,
                area: item.area || 0,
                productivity: item.productivity || 0
            });
        });
        resolve();
    });
    return promise;
});
