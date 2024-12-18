const districts = require('./districts.json')
const provinces = require('./provinces.json')
const subDistrict = require('./subDistricts.json')

function getAllProvinces(){
    return districts
}

// getAllProvinces()

module.exports{
    getAllProvinces : getAllProvinces()
}