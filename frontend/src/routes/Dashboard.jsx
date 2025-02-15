import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"
import { useState , useEffect } from "react";
import axios from 'axios'

export function Dashboard(){

    const [balance , setBalance] = useState(0);

    useEffect(()=>{

        axios.get("http://localhost:3000/api/v1/account/balance" , {
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        }).then((response)=>{

            setBalance(response.data.balance);

        })

    } , []);

    return(<>
    <div>
        <Appbar></Appbar>
        <Balance value={balance}></Balance>
        <Users></Users>
        </div></>)
}