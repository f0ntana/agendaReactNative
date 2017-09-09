export default class Production {}
Production.schema = {
    name: 'Production',
    properties: {
        id: 'int',
        place_id: 'int',
        cultivar_id: 'int',
        crop_id: 'int',
        seed_brand_id: 'int',
        volume: 'double',
        productivity: 'double',
        planting_date: 'date',
        harvest_date: 'date',
        area: 'double',
        population: 'double',
        spacing: 'double',
        fertility: 'double',
        argil: 'double',
        mo: 'double',
        p: 'double',
        k: 'double',
        v: 'double',
        depth_gathering: 'double',
        desiccation: 'bool',
        type: 'int',
        finished: 'bool',
        new: 'bool'
    }
}
