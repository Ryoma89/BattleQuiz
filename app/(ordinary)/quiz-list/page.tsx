import QuizList from '@/features/quiz-list/QuizList'
import React from 'react'

const QuizListPage = () => {
  return (
    <section className='h-full p-5 overflow-scroll md:py-10 md:px-8'>
      <QuizList />
    </section>
  )
}

export default QuizListPage
