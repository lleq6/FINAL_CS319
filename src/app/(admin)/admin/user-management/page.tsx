'use client'
import AdminProduct from "@/app/components/admin-components/AdminProduct";
import AdminUserSidebar from "@/app/components/admin-components/AdminUserSidebar";
import UserInfo from "@/app/model/UserInfo";
import React, { useEffect, useState } from "react";

interface UserTable{
    user: UserInfo;
}

const user : UserInfo = {UID:'U00001', Email:'test@gmail.com', Name: 'Name', LastName: 'Lastname', Phone: '000000001', Role: ''}

function paginate(items, itemsPerPage, pageNumber) {
    const startIndex = pageNumber * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    console.log(startIndex,endIndex,pageNumber,'d')
    if (endIndex > items.length-1){
        console.log('over length')
        return items.slice(startIndex, items.length-1)
    }
    return items.slice(startIndex, endIndex);
  }

export default function userManagement(){
    const [page,setPage] = useState([0,6])
    const [curPage, setCurPage] = useState(1)
    const [test,setTest] = useState<UserInfo[]>([user, user, user ,user ,user,user,user, user, 
        user ,user ,user,user,user, user, user ,user ,user,user,user, user, user ,user ,user,user])
    const [show, setShow] = useState([])
    console.log(test.length/10)
    useEffect(()=>{
        setShow(paginate(test,6,1))
        let i = 0
            setTest(old => old.map((e)=>{
        e.Name = `ชื่อ${i}`
        i
        return e
    }))
        
    },[])
    function AdminUserTable(props : UserTable){
        return(
            <tr>
                <td>{props.user.UID}</td>
                <td>{props.user.Name}</td>
                <td>{props.user.LastName}</td>
                <td>{props.user.Email}</td>
                <td>{props.user.Phone}</td>
                <td>
                <button className="btn bg-yellow-500" onClick={(e) => selectUser(props.user)}>แก้ไข</button>
                </td>
            </tr>
        )
    }

    function handleChange(e : React.FormEvent<HTMLInputElement>){
        const {name, value} = e.currentTarget;
        setCurUser({
            ...curUser,
            [name]: value
        })

    }
    const [curUser, setCurUser] = useState({
        UID: '',
        Name: '',
        LastName: '',
        Email: '',
        Phone: '',
        Role: '',
    })
    
    function selectUser(user : UserInfo){
        setCurUser(user)

    }
    
    return (
        <div className="">
            <style jsx>{ `@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');`} </style>
            <div className="pl-5">
                <h1>จัดการคลังสินค้า</h1>
            </div>
            <div className="grid grid-cols-7 pl-5 pr-5">
                <AdminUserSidebar/>
                <div className="col-span-5 m-2">

                    <div>
                        <h1>รายละเอียดสินค้า</h1>
                        <div>
                            
                        <div className="">
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">UID</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                    name='Name' value={curUser.UID} onChange={handleChange}
                                    />
                                    
                                </label>
                                <div className="flex">
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">ชื่อ</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.Name} />
                                    </label>
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">นามสกุล</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.LastName} />
                                    </label>
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">E-mail</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.Email} />
                                    </label>
                                </div>
                                <div className="flex">
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">เบอร์โทรศัพท์</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                    value={curUser.Phone} />
                                </label>                                
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">UID</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                    value={curUser.Role} />
                                </label>
                                <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                                </div>
                            </div>
                        <div className="">
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">ที่อยู่</span></div>
                                    <select name="cars" id="cars" className="select select-bordered">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </label>
                                <div className="flex">
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">ชื่อ</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.Name} />
                                    </label>
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">นามสกุล</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.LastName} />
                                    </label>
                                    <label className="form-control w-full max-w-xs mx-1">
                                        <div className="label"><span className="label-text">E-mail</span></div>
                                        <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                        value={curUser.Email} />
                                    </label>
                                </div>
                                <div className="flex">
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">เบอร์โทรศัพท์</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                    value={curUser.Phone} />
                                </label>                                
                                <label className="form-control w-full max-w-xs mx-1">
                                    <div className="label"><span className="label-text">UID</span></div>
                                    <input type="text" placeholder="Type here" className="input input-bordered w-11/12"
                                    value={curUser.Role} />
                                </label>
                                <button className="btn self-end">เปลี่ยนรหัสผ่าน</button>
                                </div>
                            </div>
                        <div className="overflow-x-auto">
                        <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                            <th>UID</th>
                            <th className="">ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>E-mail</th>
                            <th>เบอร์โทรศัพท์</th>
                            {/* <th>สถานะ</th> */}
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {test.map(e => 
                            <AdminUserTable user={e}/>  
                            )} */}
                            {/* <AdminUserTable user={user} /> */}
                            {/* <AdminUserTable user={user} /> */}
                            {/* <AdminUserTable user={user} /> */}
                            {/* <AdminUserTable user={user} /> */}
                            {/* <AdminUserTable user={user} /> */}
                            {/* {test.slice(page[0],page[1]).map((e)=>{
                                console.log(page[0],page[1])
                                console.log(test.slice(page[0],page[1]))
                                return<AdminUserTable user={e} />})} */}
                                {test.slice(page[0],page[1]).map((e) => <AdminUserTable user={e} />)}
                        </tbody>
                        </table>
                        <div className="join">
                            {test.length > 7 ?
                            Array.from({length: Math.ceil(test.length/7)},(_,index) =>
                            <button className={`join-item btn ${index==0? 'bg-yellow-600':''}`}
                            onClick={(e)=>{
                                setPage([index*7,((index+1)*7-1)])
                                const k = document.querySelectorAll('.join-item')
                                k.forEach(d => d.classList.remove('bg-yellow-600'))
                                e.target.classList.add('bg-yellow-600')
                            }}>{index+1}
                            
                            </button>)
                            : ''}

                            <div className="join">
                                <button className="join-item btn" onClick={()=>{
                                    if (curPage-1 < 0){
                                        return
                                    }
                                    setCurPage(curPage-1)
                                    setShow(paginate(test, 6, curPage-1))

                                }}>«</button>
                                <button className="join-item btn">Page {curPage}</button>
                                <button className="join-item btn" onClick={()=>{
                                    console.log('last',(curPage-1)*7,test.length)
                                    if (curPage > test.length/7){
                                        return
                                    }
                                    setCurPage(curPage+1)
                                    setShow(paginate(test, 6, curPage-1))
                                }}>»</button>
                            </div>
                            <button className="join-item btn" onClick={()=>{
                                console.log(page, curPage)
                                
                                }}>1</button>
                            <button className="join-item btn">2</button>
                            <button className="join-item btn btn-disabled">...</button>
                            <button className="join-item btn">99</button>
                            <button className="join-item btn">100</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}