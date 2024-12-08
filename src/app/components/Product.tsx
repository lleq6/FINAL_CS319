import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductInfo } from "../model/Product";
interface ProductProps {
    product: ProductInfo
  }
const Product:React.FC<ProductProps>  = ({ product }) => {
    return(
        <div className="mx-auto">

        <div className="p-2 border-2 bg-gray-300 bg-opacity-50 border-opacity-10 border-black mx-3 my-3 ">
            <Link href={`/products/${product.Product_ID}`}>
            
            <Image src="/product.jpg" alt="test" width={200} height={0}/>
            <p className="font-semibold text-gray-700 text-sm">{product.Brand}</p>
            <p className="text-base">{product.Name}</p>
            <p className="text-orange-600 text-xl">{product.Sale_Price}.00.-</p>
            <label>/{product.Unit}</label>
            <div className="flex float-right text-base content-center">
                <FaStar className={`text-sm m-auto ${product.Review_Rating&&product.Review_Rating >= 1?'text-yellow-500' : ''}`}/>
                <FaStar className={`text-sm m-auto ${product.Review_Rating&&product.Review_Rating >= 2?'text-yellow-500' : ''}`} />
                <FaStar className={`text-sm m-auto ${product.Review_Rating&&product.Review_Rating >= 3?'text-yellow-500' : ''}`} />
                <FaStar className={`text-sm m-auto ${product.Review_Rating&&product.Review_Rating >= 4?'text-yellow-500' : ''}`} />
                <FaStar className={`text-sm m-auto ${product.Review_Rating&&product.Review_Rating >= 5?'text-yellow-500' : ''}`} />
            </div>
            </Link>
        </div>
        </div>
    )
}

export default Product