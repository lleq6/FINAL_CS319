import { useEffect, useState } from "react"
const getAllProvinces = require('@/app/model/Province/provinces.json')
const getAllDistricts = require('@/app/model/Province/districts.json')
const getAllSubDistricts = require('@/app/model/Province/subDistricts.json')

export default function ProvinceSelector( { address,setAddress }){
    // return (<div></div>)
    // console.log(getAllProvinces)
    // console.log(address,'a')
    const [province, setProvince] = useState(0)
    const [districtID,setDistrictID] = useState(0)
    const [subDistrictID,setSubDistrictID] = useState(0)
    const [curDistrict, setCurDistrict] = useState([])
    const [curSubDistrict, setCurSubDistrict] = useState([])

    useEffect(()=>{
        if (address.Province){
            // console.log(address,'kk')
            setProvince(getAllProvinces.filter((e)=> e.PROVINCE_NAME == address.Province)[0].PROVINCE_ID)
        if (address.District){
            setDistrictID(getAllDistricts.filter((e)=> e.DISTRICT_NAME == address.District)[0].DISTRICT_ID)
        }
        if (address.Sub_District){
            setSubDistrictID(getAllSubDistricts.filter((e)=> e.SUB_DISTRICT_NAME == address.Sub_District)[0].SUB_DISTRICT_ID)
        }
        }else{
            setProvince(0)
            setDistrictID(0)
            setSubDistrictID(0)
        }
    },[address])

    useEffect(()=>{
        if(!province) return
        console.log(province)
        setCurDistrict(getAllDistricts.filter((e)=>e.PROVINCE_ID == province))
        setAddress({...address,
            Province : getAllProvinces.filter((e)=>e.PROVINCE_ID == province)[0].PROVINCE_NAME})
        // console.log('province change')
    },[province])
    
    useEffect(()=>{
        if (!districtID) return
        setCurSubDistrict(getAllSubDistricts.filter((e)=>e.DISTRICT_ID == districtID))
        setAddress({...address,
            District : getAllDistricts.filter((e)=>e.DISTRICT_ID == districtID)[0].DISTRICT_NAME})
    },[districtID])


    useEffect(()=>{
        if(!subDistrictID) return
        setAddress({...address, Sub_District: getAllSubDistricts.filter((e)=>e.SUB_DISTRICT_ID == subDistrictID)[0].SUB_DISTRICT_NAME})

    },[subDistrictID])
    return (
        <div className="flex w-full space-x-4">
        <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">จังหวัด</span>
            </div>    
            <select className="select select-bordered w-full max-w-xs" defaultValue={0} value={province} name="Province" onChange={(e)=>{
                setProvince(e.target.value)
                // console.log(getAllProvinces.filter((i)=> i.PROVINCE_ID == e.target.value))
                // setAddress({...address, Province: e.target.value})
            }}>
            <option value={0} disabled>จังหวัด</option>
            {getAllProvinces.map((e)=> <option key={e.PROVINCE_NAME} value={e.PROVINCE_ID}>{e.PROVINCE_NAME}</option>)}
        </select>
    </label>

    <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">แขวง / อำเภอ</span>
            </div>  
        <select className="select select-bordered w-full max-w-xs" defaultValue={0} value={districtID} name="District" onChange={(e)=>setDistrictID(e.target.value)} disabled={!province? true:false}>
            <option value={0} disabled>เขต/อำเภอ</option>
            {curDistrict.map((e)=> <option key={e.DISTRICT_NAME} value={e.DISTRICT_ID}>{e.DISTRICT_NAME}</option>)}
        </select>
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">เขต / ตำบล</span>
            </div>  

        <select className="select select-bordered w-full max-w-xs" defaultValue={0} value={subDistrictID} name="District" onChange={(e)=>setSubDistrictID(e.target.value)} disabled={!districtID? true:false}>
            <option value={0} disabled>แขวง/ตำบล</option>
            {curSubDistrict.map((e)=> <option key={e.SUB_DISTRICT_NAME} value={e.SUB_DISTRICT_ID}>{e.SUB_DISTRICT_NAME}</option>)}
        </select>
        </label>

        </div>
    )
}