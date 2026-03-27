import axios from "axios"
import React, {useState} from "react"

const Addproduct =()=>{
    // declare the states here
    const [product_name,setProductName]=useState("")
    const [product_description,setProductDescription]=useState("")
    const [product_cost,setProductCost]=useState("")
    const [product_photo,setProductPhoto]= useState("") 
    // Define 3 states of posting data 
    const [loading,setLoading]=useState("")
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
    // Function to handle submit
    const handlesubmit=async (e)=>{
       e.preventDefault ()
       setLoading("Please wait...")
       const formdata= new FormData()
    //    append
        formdata.append("product_name", product_name)
        formdata.append("product_description", product_description)
        formdata.append("product_cost", product_cost)
        formdata.append("product_photo", product_photo)
    try{
        const response =await axios.post("https://matthiashiggs.alwaysdata.net/api/addproduct",formdata)
        setSuccess(response.data.message)
        setLoading("")
    }catch(error){
        setError(error.message)
        setLoading("")
    }
    }
    return(
       <div className="row justify-content-center mt-2"> 
        <div className="col-md-8 card shadow p-4">
            <h1 className="text-success">Add Product</h1>
            {/* binding the states here */}
              <h2 className="text-warning">{loading}</h2>
              <h2 className="text-success">{success}</h2>
              <h2 className="text-danger">{error}</h2>
            <form action="" onSubmit={handlesubmit} >
                <input type="text" className="form-control" placeholder="Enter product name" onChange={(e)=>setProductName(e.target.value)} /><br/>
                <textarea name="" id="" className="form-control" placeholder="Enter Product description" onChange={(e)=>setProductDescription(e.target.value)}></textarea><br/>
                <input type="number" className="form-control" placeholder="Enter Product cost"onChange={(e)=>setProductCost(e.target.value)}/><br/>
                <input type="file" accept="image/*" className="form-control" placeholder="Product photo" onChange={(e)=>setProductPhoto(e.target.files[0])}/><br/>
                <button type="submit" className="btn btn-success w-100">Add Product</button>
            </form>
        </div>
       </div>
    )
}
export default Addproduct