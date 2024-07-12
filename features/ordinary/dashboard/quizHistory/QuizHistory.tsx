import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DataTable } from './data-table'
import { Payment, columns  } from './columns'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      quiz: "quiz 1",
      score: 100,
      date: "m@example.com",
    },
    // ...
  ]
}

const QuizHistory = async () => {
  const data = await getData()
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
    <CardHeader>
      <CardTitle>Quiz History</CardTitle>
      <CardDescription>View your past quiz results and performance.</CardDescription>
    </CardHeader>
    <CardContent>
      <DataTable columns={columns} data={data} />
    </CardContent>
  </Card>
</div>
  )
}

export default QuizHistory
