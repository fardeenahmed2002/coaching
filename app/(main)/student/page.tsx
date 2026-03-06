"use client"
import { Context } from "@/context/AuthContext"
import { useContext } from "react"

const Page = () => {
    const { user, loading } = useContext(Context)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>Please login to continue</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            {user?.name} hello
        </div>
    )
}

export default Page