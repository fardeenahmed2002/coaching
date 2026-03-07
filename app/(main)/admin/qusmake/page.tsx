"use client"
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    question: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
    correct: ""
  });

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newQuestion = {
      question: formData.question,
      options: [formData.optionOne, formData.optionTwo, formData.optionThree, formData.optionFour],
      correct: formData.correct
    };

    try {
      const { data } = await axios.post("/api/admin", newQuestion);
      if (data.success) {
        alert("Question added successfully");
        setFormData({
          question: "",
          optionOne: "",
          optionTwo: "",
          optionThree: "",
          optionFour: "",
          correct: ""
        });
      } else {
        alert(data.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fields = [
    { name: "question", placeholder: "Question" },
    { name: "optionOne", placeholder: "Option 1" },
    { name: "optionTwo", placeholder: "Option 2" },
    { name: "optionThree", placeholder: "Option 3" },
    { name: "optionFour", placeholder: "Option 4" },
    { name: "correct", placeholder: "Correct Answer" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      {fields.map((field) => (
        <input
          key={field.name}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name as keyof typeof formData]}
          onChange={handlechange}
          className="w-full border p-2 rounded"
          required
        />
      ))}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </form>
  );
}