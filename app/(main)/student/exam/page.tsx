"use client"
import { Context } from "@/context/AuthContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
type Question = {
  _id: number
  question: string
  options: string[]
}
export default function ExamPage() {

  const [answers, setAnswers] = useState<any>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useContext(Context)
  const router = useRouter()
  const handlechange = (id: any, opt: any) => {
    setAnswers({
      ...answers,
      [id]: opt
    })
  }

  const getallquestions = async () => {
    try {
      const { data } = await axios.get('/api/student')
      console.log('API data:', data)
      if (data.success) {
        setQuestions(data.questions)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    getallquestions()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      console.log(answers)
      const { data } = await axios.post("/api/student", {
        answers,
        id: user?._id,
        subject: "chemistry",
        studentClass: 10
      })
      if (data.success) {
        alert('done exam')
        router.push('/student/result')
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }

  }

  return (
    <div className="max-w-2xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">
        MCQ Exam for {user?._id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {questions.map((q) => (
          <div key={q.question} className="border p-4 rounded">

            <p className="font-semibold mb-2">
              {q.question}
            </p>

            {q.options.map((opt, i) => (
              <label key={i} className="flex gap-2 cursor-pointer">

                <input
                  type="radio"
                  name={`q-${q._id}`}
                  onChange={() => handlechange(q._id, opt)}
                />

                {opt}

              </label>
            ))}

          </div>
        ))}

        <button className="bg-blue-500 text-white px-5 py-2 rounded">
          Submit
        </button>

      </form>

    </div>
  )
}