'use client'
import Product from "@/app/components/Product"
import { ProductInfo } from "@/app/model/Product"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface NavDetail{
    Category_ID: string;
    Sub_Category_ID: string;
    s_name: string;
    c_name: string;
}

export default function SubCategoryPage(){
    const query = useParams()
    console.log(query.Category)
    const [products, setProducts] = useState([])
    const [navDetail, setNavDetail] = useState<NavDetail>()

    useEffect(()=>{
        async function getProduct(){
            const data = await fetch(`/api/products/getProductBySubCategory?category_id=${query.subCategory}`)
            // const nav = await fetch(`/api/products/getProductBySubCategory?category_id=${query.Category}`)
            // console.log()
            const result = await data.json()
            setProducts(result.products)
            setNavDetail(result.nav)
        }
        getProduct()
    },[])

    console.log(products,'pd')
    console.log(navDetail,'nav')

    if(!products){
        return <div>Loading</div>
    }
    return(
        <div>
            <h1>
                <Link href={`/category/${navDetail?.Category_ID}`}> {navDetail?.c_name} </Link>{'>'}
                <Link href={`/category/${navDetail?.Category_ID}/${navDetail?.Sub_Category_ID}`}> {navDetail?.s_name} </Link></h1>
            <div className="flex">
                {products.map((product: ProductInfo) => <Product key= {product.Product_ID} product={product}></Product>)}
            </div>
        </div>
    )
}