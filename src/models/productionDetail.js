export default class ProductionDetail {}
ProductionDetail.schema = {
    name: 'ProductionDetail',
    primaryKey: 'id',
    properties: {
        id: 'int',
        production_id: 'int',
        name: 'string',
        area: 'double',
        productivity: 'double'
    }
};
