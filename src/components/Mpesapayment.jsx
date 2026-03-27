import { useLocation } from "react-router-dom"
import React, { useState } from "react"
import axios from "axios"
const Mpesapayment =()=>{
    const {singleproduct} = useLocation().state || {}
    const imagepath="https://matthiashiggs.alwaysdata.net/static/images/"
    // declare states here
    const [phone,setPhone]=useState("")
    const [loading,setLoading]=useState("")
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
    // function to make payment
    const handlesubmit= async(e)=>{
        e.preventDefault()
        setLoading("Please wait...")
            const formdata=new FormData()
            // append
            formdata.append("amount",singleproduct.product_cost)
            formdata.append("phone",phone)
            try {
                const response=await axios.post("https://matthiashiggs.alwaysdata.net/api/mpesa_payment",formdata)
                setSuccess(response.data.message)
                setLoading("")
            } catch (error) {
                setError("Something went wrong")
                setLoading("")
            }
                
            }

    return(
       <div className="row justify-content-center">
        <h1 className="text-success">Make Payment - Lipa na Mpesa </h1>
        <div className="col-md-8 card shadow p-4">
            <img src={imagepath + singleproduct.product_photo} alt="" className="w-100" style={{height:"auto",objectFit: "contain"}} />
            
            <div className="card-body">
                
                <h1 className="text-info text-start">{singleproduct.product_name}</h1>
                <p className="text-start">{singleproduct.product_description}</p>
                <b className="text- warning text-start d-block">Ksh {singleproduct.product_cost}</b><br />
                {/* bind the states here */}
                 <h2 className="text-warning">{loading}</h2>
                 <h2 className="text-success">{success}</h2>
                 <h2 className="text-danger">{error}</h2>
                
                <form action="" onSubmit={handlesubmit}>
                    <input type="number" className="form-control" placeholder="Enter phone number 254XXXXXXXXX"  onChange={(e)=>setPhone(e.target.value)}/><br />
                    <button type="submit" className="btn btn-outline-success w-100">Make Payment</button>
                </form>
            </div>
        </div>
       </div>
    )

}
export default Mpesapayment