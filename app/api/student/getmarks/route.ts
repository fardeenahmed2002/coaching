import { getResults } from "@/controller/StudentController"
import connectToDb from "@/lib/DbConnection"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb()

    const userid = req.nextUrl.searchParams.get("userid") as string

    return getResults(userid)

  } catch (error) {
    console.log(error)
  }
}