import React from 'react'
import QuizHistory from './quizHistory/QuizHistory'
import Profile from './profile/Profile'
import { Profiles } from '@/types/custom'

const Dashboard = ({profiles}: {profiles: Profiles}) => {
  return (
    <div className='bg-muted p-5 space-y-5 h-full xs:h-screen'>
      <Profile profiles={profiles}/>
      <QuizHistory profiles={profiles}/>
    </div>
  )
}

export default Dashboard
