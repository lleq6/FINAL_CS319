'use client'
import Product from "@/app/components/Product"
import { ProductInfo } from "@/app/model/Product"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CategoryPage(){
    const query = useParams()
    console.log(query.Category)
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function getProduct(){
            const res = await fetch(`/api/products/getProductByCategory?category_id=${query.Category}`)
            // console.log()
            setProducts(await res.json())
        }
        getProduct()
    },[])

    console.log(products,'pd')

    if(!products){
        return <div>Loading</div>
    }
    return(
        <div>
            <a>asd</a>
            <div className="grid grid-cols-5 gap-3">
                {products.map((product: ProductInfo) => <Product key= {product.Product_ID} product={product}></Product>)}
                {products.map((product: ProductInfo) => <Product key= {product.Product_ID+'a'} product={product}></Product>)}
                {products.map((product: ProductInfo) => <Product key= {product.Product_ID+'b'} product={product}></Product>)}
                {products.map((product: ProductInfo) => <Product key= {product.Product_ID+'c'} product={product}></Product>)}
            </div>
        </div>
    )
}