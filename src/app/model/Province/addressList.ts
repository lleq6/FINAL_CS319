const districts = require('./districts.json')
const provinces = require('./provinces.json')
const subDistrict = require('./subDistricts.json')

function getAllProvinces(){
    console.log(provinces)
    provinces.map((e) => {console.log(e.PROVINCE_NAME)})
    return districts
}

// getAllProvinces()

module.exports{
    getAllProvinces : getAllProvinces()
}