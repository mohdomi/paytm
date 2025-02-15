import { Headers } from "../components/Headers"
import { SubHeading } from "../components/SubHeading"
import { Items } from "../components/Items"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export function Signin(){

    const navigate = useNavigate();

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    return(<div className="h-screen w-screen flex justify-center items-center bg-neutral-700">
<div className = "h-100 w-100 bg-neutral-100 flex flex-col">
            <Headers heading="Signin"></Headers>
            <SubHeading data="Enter your email and password to login in to the app"/>
            <Items onChange={(e)=>{setUsername(e.target.value)}} heading="Email : "  placeholder="someone2email.com"/>

            <Items onChange={(e)=>{setPassword(e.target.value)}} heading="Password : " placeholder="XYZ"/>

            <Button onClick={()=>{

                axios.post("http://localhost:3000/api/v1/user/signin" , {
                    username : username , 
                    password : password
                }).then((response)=>{

                    const token = response.data.token;
                    localStorage.setItem("token" , token);
                    navigate('/dashboard');

                })

            }} input="Signin" ></Button>


        </div>

    </div>)

}