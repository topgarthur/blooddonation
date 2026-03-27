import axios from "axios"
import React, {useState} from "react"
const Signup =()=>{
    // Declare our states here
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[phone, setPhone] = useState()
    const[password,setPassword] = useState("")
    const[loading,setLoading] =useState("")
    const[success,setSuccess] = useState("")
    const[error,setError] = useState("")
    // function to handle submit 
    const handlesubmit = async (e) =>{
        e.preventDefault()
        setLoading("Please wait...")
        // create empty digital envolope to store user inputs 
        const formdata = new FormData ()
        // append/add 
        formdata.append ("username", username)
        formdata.append ("email", email)
        formdata.append ("password", password)
        formdata.append ("phone", phone)
        try {
            const response=await axios.post("https://higgs.alwaysdata.net/api/signup",formdata)
            setSuccess(response.data.message)
            setLoading("")
        } catch (error) {
            setError(error.message)
            setLoading("")
        }
    }
    
    return(
        <div className="row mt-4 justify-content-center ">
            <div className="col-md-6 card shadow p-5">
                <h1>Signup</h1>
                {/* bind the statess  */}
                <h2 className="text-warning">{loading}</h2>
                <h2 className="text-success">{success}</h2>
                <h2 className="text-danger">{error}</h2>
                <form action="" onSubmit={handlesubmit}> 
                <input type="text" className="form-control" placeholder="Enter username" onChange={(e) => setUsername (e.target.value)}/> <br/>
                <input type="Email" className="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/> <br/>
                <input type="text" className="form-control" placeholder="Enter Password" onChange={(e) =>setPassword(e.target.value)} /> <br/>
                <input type="tel" className="form-control" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} /> <br/>
                <button type="submit" className="btn btn-danger w-100" >Sign up</button>
                <p>Already have an account? <a href="Signin">Sign in</a></p>
                
                </form>
            </div>
        </div>
    )
}
export default Signup