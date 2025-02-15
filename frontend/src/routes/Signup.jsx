import {Headers} from "../components/Headers"
import {Items} from "../components/Items"
import {Button} from "../components/Button"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export function Signup(){

    const navigate = useNavigate();

    const [firstname , setFirstname] = useState("");
    const [lastname , setLastname] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");


    return(<div className="h-screen w-screen flex justify-center items-center bg-neutral-700">
        <div className = "h-140 w-100 bg-neutral-100 flex flex-col">
            <Headers heading={"Signup"} />
            <SubHeading data={"Enter your details to signup into the app"}/>
            <Items onChange={(e)=>{setFirstname(e.target.value)}} heading={"Firstname : "} placeholder={"John"} />
            <Items onChange={(e)=>{setLastname(e.target.value)}} heading={"Lastname : "} placeholder={"Smith"} />
            <Items onChange={(e)=>{setUsername(e.target.value)}} heading={"Email : "} placeholder={"something@gmail.com"} />
            <Items onChange={(e)=>{setPassword(e.target.value)}} heading={"Password : "} placeholder={"XYZ"} />

            <Button onClick={()=>{

                axios.post("http://localhost:3000/api/v1/user/signup" , {
                    username : username,
                    firstname : firstname, 
                    lastname : lastname,
                    password : password
                }).then((response)=>{
                    const token = response.data.token;
                    localStorage.setItem('token' , token);
                    navigate('/dashboard');
                })

                


            }} input="Signup" />

        </div>
        </div>)
}