'use client'
import Product from "@/app/components/Product";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaLine, FaFacebookSquare, FaSearch} from "react-icons/fa";


export default function Contact(){
    const [contactForm,setContactForm] = useState({
        email : '',
        message: '',
    })

    function submitHandler(e : SubmitEvent){
        e.preventDefault()
        console.log(contactForm)
        if (!contactForm.email || !contactForm.message){return alert('โปรดกรอกข้อมูล')}}

    const handleChange = (e) => { 
        const { name, value } = e.target; setContactForm({ ...contactForm, [name]: value });
    }
    return(
        <div>
            <div className="w-11/12 m-auto">
                <h1>ติดต่อเรา</h1>
                <div className="flex flex-col mx-auto md:grid md:grid-cols-2">
                    <div >
                        <p>982 หมู่ 2 ต.ศาลาด่าน อ.เกาะลันตา จ.กระบี่</p>
                        <span className="flex text-center"><FaLine className="text-4xl text-green-600"/> <p className="content-center">kacha982</p></span>
                        <span className="flex text-center"><FaFacebookSquare className="text-4xl text-blue-700"/> <p className="content-center">บริษัท คชาโฮม จำกัด</p></span>
                        <form className="pb-1 flex flex-col w-10/12" onSubmit={submitHandler}>
                            <h3>สอบถาม</h3>
                            <p>อีเมลล์ตอบกลับ</p>
                            <input placeholder="test" className="border-2 border-solid border-stone-700 rounded-lg" 
                            value={contactForm.email} name='email' onChange={handleChange}></input>
                            <p>อีเมลล์ตอบกลับ</p>
                            <textarea className="border-2 border-solid border-black rounded-lg" rows={4} cols={40} 
                            value={contactForm.message} name='message' onChange={handleChange} placeholder="ข้อความ">
                            </textarea>
                            <button className="btn" type="submit">test</button>
                            </form>
                    </div>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.9448501567845!2d99.03135131414864!3d7.591384927840407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304e04bd0f7f176d%3A0x81022c6adc45328f!2zTW9vIDIg4LiV4Liz4Lia4LilIOC4qOC4suC4peC4suC4lOC5iOC4suC4mSDguK3guLPguYDguKDguK3guYDguIHguLLguLDguKXguLHguJnguJXguLIg4LiB4Lij4Liw4Lia4Li14LmIIDgxMTUw!5e0!3m2!1sth!2sth!4v1728487565081!5m2!1sth!2sth" width="400" height="350" style={{border:0}} loading="lazy"></iframe>
                </div>
            </div>
            <div className="flex flex-row">
                {/* <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/> */}
                testasdasd
            </div>
            
        </div>
    )

}