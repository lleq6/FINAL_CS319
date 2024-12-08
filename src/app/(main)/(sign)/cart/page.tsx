'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import AddressModal from "../components/AddressModal";
import { useSession } from "next-auth/react";
import { useCounter } from "@/app/context/CartCount";
import { UserAddress } from "@/app/model/AddressModel";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface cart_detail {
    cd_Quantity: number;
    Product_ID: string;
    Child_ID: string;
    Name: string;
    Brand: string;
    Description: string;
    Unit: string;
    Quantity: number;
    Sale_Cost: number;
    Sale_Price: number;
    Reorder_Point: number;
    Visibility: string;
    Review_Rating: number;
    Image_URL: string;
}

export default function Cart() {
    const { decrement, setCounter } = useCounter();
    const session = useSession();
    const router = useRouter();
    const [paymentChoice, setpaymentChoice] = useState(false);
    const [cartItems, setCartItems] = useState<cart_detail[]>([]);
    const [addressList, setAddressList] = useState<UserAddress[]>([]);
    const [curAddress, setCurAddress] = useState<UserAddress>();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((sum, item) => {
                return sum + (item.cd_Quantity * item.Sale_Price);
            }, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);

    async function submitOrder() {
        console.log(cartItems);
        let complete = false
        if (!cartItems.length)
            return;
        if (!curAddress) {
            return alert('โปรดเลือกที่อยู่จัดส่ง');
        }
        try {
            const response = await fetch('/api/cart/submitOrder/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems,
                    User_ID: session.data?.user.id,
                    Address_ID: curAddress?.Address_ID,
                    COD: paymentChoice
                })
            });
            if (response.ok) {
                console.log(response.ok)
                setCartItems([]);
                complete = true
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            return
        }
        if (complete){
            alert('สั่งซื้อสำเร็จ')
            setCounter(0)
            router.push('/order-history')
        }
    }

    useEffect(() => {
        async function getItem() {
            console.log(session.data?.user.id, 'id');
            try {
                const response = await fetch(`/api/cart/getCartItems?id=${session.data?.user.id}`);
                const data = await response.json();
                console.log(data);
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }

        async function getAddress() {
            const response = await fetch('/api/user/getAddressByUserID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserID: session.data?.user?.id })
            });
            const addressData = await response.json();
            setAddressList(addressData);
        }

        getItem();
        getAddress();
    }, [session.data?.user?.id]);

    useEffect(() => {
        if (addressList.length) {
            const defaultAddress = addressList.find(address => address.Is_Default);
            if (defaultAddress) {
                setCurAddress(defaultAddress);
            }
        }
    }, [addressList]);

    function CartItem({ cart_detail }: { cart_detail: cart_detail }) {
        if (cart_detail.Quantity == 0) {
            alert(`สินค้าหมด ${cart_detail.Name}`);
            return null;
        }
        const [qty, setQty] = useState<number>(cart_detail.cd_Quantity);

        function quantityControl(isAdd: boolean) {
            if (isAdd && cart_detail.cd_Quantity + 1 <= cart_detail.Quantity) {
                cart_detail.cd_Quantity += 1;
                setQty(cart_detail.cd_Quantity);
                setCartItems(oldItems => oldItems.map(item => 
                    item.Product_ID === cart_detail.Product_ID ? { ...item, cd_Quantity: cart_detail.cd_Quantity } : item
                ));
                return;
            }
            if (!isAdd && cart_detail.cd_Quantity - 1 > 0) {
                cart_detail.cd_Quantity -= 1;
                setQty(cart_detail.cd_Quantity);
                setCartItems(oldItems => oldItems.map(item => 
                    item.Product_ID === cart_detail.Product_ID ? { ...item, cd_Quantity: cart_detail.cd_Quantity } : item
                ));
                return;
            }
        }

        if (cart_detail.cd_Quantity > cart_detail.Quantity) {
            cart_detail.cd_Quantity = cart_detail.Quantity;
            setQty(cart_detail.Quantity);
        }

        async function deleteFromCart() {
            const body = JSON.stringify({
                User_ID: session?.data?.user?.id,
                Product_ID: cart_detail.Product_ID,
            });
            const response = await fetch('/api/cart/removeItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            });
            if (response.ok) {
                const newArr = cartItems.filter(e => e.Product_ID !== cart_detail.Product_ID);
                setCartItems(newArr);
                decrement();
                alert(`ลบ ${cart_detail.Name} ออกจากตะกร้าเรียบร้อย`);
            }
        }

        return (
            <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr_1fr] w-full text-center content-center m-auto [&>.cp]:m-auto [&>p]:content-center">
                <Image src={cart_detail.Image_URL} alt="test" width={100} height={0} />
                <p className="text-start m-0">{cart_detail.Name}</p>
                <p className="cp">{cart_detail.Sale_Price}</p>
                <div className="content-center flex flex-col">
                    <div className="join text-center mt-auto mx-auto content-end">
                        <button className="join-item btn btn-sm" onClick={() => quantityControl(false)}>«</button>
                        <button className="join-item btn btn-sm">{qty}</button>
                        <button className="join-item btn btn-sm" onClick={() => quantityControl(true)}>»</button>
                    </div>
                    <p className="text-sm content-end mb-4">เหลือ : {cart_detail.Quantity}</p>
                </div>
                <p className="cp">{cart_detail.Sale_Price * qty}</p>
                <button className="btn m-auto" onClick={deleteFromCart}><FaRegTrashAlt /><p>นำออก</p></button>
            </div>
        );
    }

    return (
        <div>
            <AddressModal userAddresses={addressList} setAddresses={setAddressList} setCurAddress={setCurAddress} />
            <h1>ตะกร้าสินค้า</h1>

            <div className="flex text-center content-center">
                <FaMapMarkerAlt className="my-auto" />
                <label>ที่อยู่ในการจัดส่ง</label>
            </div>

            {addressList.length > 0 ? (
                <div>
                    {curAddress ? (
                        <div className="grid grid-cols-[9fr_1fr] border border-1 rounded-lg p-2 my-2 content-center">
                            <div>
                                <p>{curAddress.Address_1}</p>
                                <p>{curAddress.Address_2}</p>
                                <p>{curAddress.Province} {curAddress.District} {curAddress.Sub_District} {curAddress.Zip_Code}</p>
                                <p>ติดต่อ {curAddress.Phone}</p>
                            </div>
                            <a
                                className="link link-hover flex text-end my-auto mx-3"
                                onClick={() => document.getElementById('address-modal').showModal()}
                            >
                                <FaEdit className="my-auto text-xl" /> เปลี่ยน
                            </a>
                        </div>
                    ) : (
                        <div
                            className="grid border border-1 rounded-lg p-2 my-2 content-center py-5 hover:border-green-500 hover:text-green-500 text-center"
                            onClick={() => document.getElementById('address-modal').showModal()}
                        >
                            <h1 className="font-bold text-base">เลือกที่อยู่ในการจัดส่ง</h1>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="grid border border-1 rounded-lg p-2 my-2 content-center py-5 hover:border-green-500 hover:text-green-500 text-center"
                    onClick={() => document.getElementById('address-modal').showModal()}
                >
                    <h1 className="font-bold text-base">เพิ่มที่อยู่ใหม่ +</h1>
                </div>
            )}

        <div className="flex text-center content-center">
                <div className="grid grid-cols-[2fr_7fr_1fr_1.5fr_1fr_1fr] w-full text-center">
                    <p>รายการสินค้า</p>
                    <div></div>
                    <p>ราคาต่อหน่วย</p>
                    <p>จำนวน</p>
                    <p>ราคารวม</p>
                    <p></p>
                </div>
            </div>
            <div className="border border-1 rounded-lg p-2 my-2 content-center ">
                {cartItems.map((item) => <CartItem cart_detail={item} key={item.Product_ID}></CartItem>)}
            </div>

            <div className="grid grid-cols-[80%_20%] text-end text-lg">
                <p>รวมการสั่งซื้อ {cartItems.length} ชิ้น :</p>
                <p className="text-yellow-600">฿ {totalPrice.toLocaleString()}</p>
            </div>
            <div className="flex my-auto mx-2 [&>button]:mx-2">
                <p className="my-auto">วิธีชำระเงิน</p>
                <button className={`${!paymentChoice ? 'btn-outline btn-primary' : ''} btn`} onClick={(e) => { setpaymentChoice(false); console.log(paymentChoice); }}>mobile bank</button>
                <button className={`${paymentChoice ? 'btn-outline btn-primary' : ''} btn`} onClick={(e) => setpaymentChoice(true)}>ชำระปลายทาง</button>
            </div>
            <div className="text-end">
                <div className="grid grid-cols-[80%_20%]">
                    <p>รวมการสั่งซื้อ</p>
                    <p>฿ {totalPrice.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-[80%_20%]">
                    <p>การจัดส่ง</p>
                    <p>฿ ฟรี</p>
                </div>
                <div className="grid grid-cols-[80%_20%]">
                    <p>ยอดชำระ</p>
                    <p className="font-bold text-yellow-600 text-xl">฿ {totalPrice.toLocaleString()}</p>
                </div>

                <button className="btn" onClick={submitOrder} disabled={!cartItems.length}>สั่งซื้อ</button>
            </div>
        </div>
    );
}
