'use client'
import Navbar from "@/app/components/Navbar"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { FaFacebookSquare, FaLine, FaStar } from "react-icons/fa"
import { redirect, useParams } from 'next/navigation'
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { ProductInfo } from "@/app/model/Product"
import Link from "next/link"
import { SessionInfo } from "@/app/model/Session"
import { useCounter } from "@/app/context/CartCount"
// import pool from "../../sql/database";

// interface Product{

// }
interface AddCartForm{
    User_ID: number;
    Product_ID:string;
    Quantity: number;
}
  
export default function ProductDetail(){
        const session = useSession()
        const param = useParams()
        const [notFound, setNotFound] = useState(false)
        const id = param?.id
        const [product , setProduct] = useState<ProductInfo>({
            Product_ID: '', Child_ID: 0, Name: '', Brand: '', Description: '', Unit: '',
            Quantity: 0, Sale_Cost: 0.0, Sale_Price: 0.0, Reorder_Point: 0, Visibility: false, Review_Rating: 0 , Image_URL: '', c_id: '', c_name: '', cc_name: '', s_id:'', s_name : ''}
        )
        const [Quantity, setQuantity] = useState(1)
        const { increment } = useCounter()
        function quantityChange(e : ChangeEvent<HTMLInputElement>){
            // console.log(e.target.value+'aaaaa')
            if (e.target.value === ''){setQuantity('')}
            try {
                const qty = parseInt(e.target.value+'aaaa')
                if (qty <= product.Quantity && qty >= 1){
                    setQuantity(qty)
                }
            }catch(error){
                console.log(error)
            }
        }
        function quantityControl(isAdd : boolean){
            
            console.log(Quantity)
            if (isAdd && Quantity+1 <= product.Quantity){
                setQuantity(Quantity+1)
                return
                }
            if (Quantity-1 > 0) {setQuantity(Quantity-1)}
        }

        async function addToCart(){
            const response = await fetch('/api/cart/addItemToCart',{
                method: 'POST',
                body: JSON.stringify({
                    User_ID: session.data?.user.id,
                    Product_ID: product.Product_ID,
                    Quantity: Quantity
                })
            })
            if (!response.ok){
                alert('เกิดข้อผิดพลาด')
                return
            }
            alert('เพิ่มสินค้าเข้าตะกร้า')
            increment()



            

        }

        useEffect(() => {
            if (id) {
              async function fetchProduct() {
                try {
                  const response = await fetch(`/api/products/product?id=${id}`);
                  if (!response.ok) {
                    console.log('tes')
                        throw new Error('Product not found');
                  }
                  const data = await response.json();
                  setProduct({
                    ...product,
                    ...data
                });
                } catch (error) {
                    // console.log('tes1')
                    setNotFound(true)
                }
              }
              fetchProduct();
            }
          }, []);

        //   console.log(session)
        if (notFound){
            return <div>Product Not Found</div>
        }
        console.log(product)
        return (     
            <div className="m-auto">
                <div className="">

                <h1>
                    <Link className={'link text-yellow-900'}href={`/category/${product.c_id}`}>{product.c_name}</Link> {'>'} 
                    <Link className={'link text-yellow-900'}href={`/category/${product.c_id}/${product.s_id}`}> {product.s_name}</Link> {'>'} 
                    <Link className={'link text-yellow-900'}href={`/category/${product.c_id}/${product.s_id}/${[product.Child_ID]}`}> {product.cc_name}</Link>
                </h1>
                </div>
                    <div className="flex m-5 mx-auto w-10/12 bg-slate-200">
                        <div>
                        {product.Image_URL? <Image src={product.Image_URL} alt="test" width={300} height={300}></Image>:
                        ''}
                        </div>
                        <div className="mx-10">
                            <h3 className="text-lg">{product.Visibility? product.Brand : 'Loading'}</h3>
                            <h1 className="text-xl">{product.Name}</h1>
                            <h1 className="text-orange-500 text-3xl my-4">{product.Sale_Price.toFixed(2)} บาท / {product.Unit}</h1>
                            <p>รหัสสินค้า : {product.Product_ID}</p>
                            <span>สินค้าคงเหลือ : <span className="text-green-600">{product.Quantity} ชิ้น</span></span>
    
                            <h1 className="text-xl font-semibold my-5">ติดต่อสอบถาม</h1>
                            <span className="flex text-center my-2"><FaLine className="text-4xl text-green-600"/> <p className="content-center">kacha982</p></span>
                            <span className="flex text-center my-2"><FaFacebookSquare className="text-4xl text-blue-700"/> <p className="content-center">บริษัท คชาโฮม จำกัด</p></span>
    
                            <div className="flex text-base content-center my-10">
                                {product.Review_Rating >= 1? <FaStar className="text-sm m-1 text-yellow-500"/> : <FaStar className="text-sm m-1"/>}
                                {product.Review_Rating >= 2? <FaStar className="text-sm m-1 text-yellow-500"/> : <FaStar className="text-sm m-1"/>}
                                {product.Review_Rating >= 3? <FaStar className="text-sm m-1 text-yellow-500"/> : <FaStar className="text-sm m-1"/>}
                                {product.Review_Rating >= 4? <FaStar className="text-sm m-1 text-yellow-500"/> : <FaStar className="text-sm m-1"/>}
                                {product.Review_Rating >= 5? <FaStar className="text-sm m-1 text-yellow-500"/> : <FaStar className="text-sm m-1"/>}
                            </div>
                            <div className="flex flex-col">
                                {session.data?.user ?
                                <div>
                                    <div className="join text-center m-auto">
                                        <span className="mx-4">จำนวน </span>
                                        <button className="join-item btn btn-sm" onClick={()=>quantityControl(false)}>«</button>
                                        <input className={`join-item w-14 text-center appearance-none
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none" value={addCartForm.Quantity} type="number"`}
                                        value={Quantity} onChange={(e) =>{quantityChange(e)}} onBlur={(e)=>{
                                                if (e.target.value.length === 0 ){setQuantity(1)}
                                            }
                                            } name="Quantity"></input>
                                        <button className="join-item btn btn-sm" onClick={()=>quantityControl(true)}>»</button>
                                    </div>
                                    {product.Quantity > 0 ? <button className="btn btn-sm m-2 w-[80%] mx-auto" onClick={addToCart}>เพิ่มลงรถเข็น</button>:
                                     <button className="btn btn-sm m-2 w-[80%] mx-auto disabled">สินค้าหมด</button>}
                                </div>
                                :
                                <button className="btn btn-xl m-2 w-[80%] mx-auto" disabled>สมัครสมาชิกเพื่อซื้อสินค้า</button>}
                            </div>
    
                        </div>
                    </div>
                    <h1>รายละเอียดสินค้า</h1>
                    <div className="bg-slate-100 w-full h-40 p-2 rounded-xl">

                        <p>{product.Description}</p>

                    </div>
                {/* </div> */}
            </div>
        )
    
}