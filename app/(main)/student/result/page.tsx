"use client"

import { Context } from "@/context/AuthContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

const Page = () => {

    const { user } = useContext(Context)
    const [result, setResult] = useState<any>(null)

    const getResult = async () => {
        const { data } = await axios.get(`/api/student/getmarks?userid=${user?._id}`)
        setResult(data.getmarks)
    }

    useEffect(() => {
        if (user?._id) {
            getResult()
        }
    }, [user])

    return (
        <div>
            <p>name: {user?.name}</p>
            <p>class: {user?.studentClass}</p>
            <p>subject: chemistry</p>
            <p>marks: {result?.result}</p>
            <p>out of: {result?.outOf}</p>
        </div>
    )
}

export default Page