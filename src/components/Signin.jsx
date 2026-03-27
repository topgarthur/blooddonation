import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signin =()=>{
    let navigate = useNavigate();
    // declare the 2 states here
    const[email,setEmail]= useState("")
    const[password, setPassword]= useState("")
    const[loading,setLoading]= useState("")
    const[success,setSuccess]=useState("")
    const[Error,setError]= useState("")
    // function to handle submit
    const handlesubmit =async (e)=>{
       e.preventDefault ()
        setLoading("Please wait...")
        // create empty envelope
        const formdata = new FormData()
        // append
        formdata.append("email", email)
        formdata.append("password", password)
        try {
            const response =await axios.post("https://higgs.alwaysdata.net/api/signin",formdata)
            setSuccess(response.data.message)
            setLoading("")
            // if login/signinis successful we save user to local storage 
            // NB: redirect user to homepage(get products)
            if (response.data.user){
                // login success
                localStorage.setItem("user",JSON.stringify(response.data.user))
                // redirect the user to homepage
                navigate("/")
            }else {
                // login failed
                setSuccess(response.data.message)
            }
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }
    return(
       <div className="row mt-4 justify-content-center">
        <div className="col-md-6 card shadow p-4">
          <h1>Sign in</h1>
          
          {/* Bind the states here  */}
           <h2 className="text-warning">{loading}</h2>
           <h2 className="text-success">{success}</h2>
           <h2 className="text-danger">{Error}</h2>
        
          <form action="" onSubmit={handlesubmit}>
            <input type="email" className="form-control" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input type="text" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="Submit" className="btn btn-success w-100">Sign in</button>
            <p>Don't have an account?<Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
       </div>
    )
}
export default Signin