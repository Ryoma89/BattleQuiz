import React from 'react'
import Follower from './Follower'
import QuizHistory from './quizHistory/QuizHistory'
import Profile from './profile/Profile'
import { Profiles } from '@/types/custom'

const Dashboard = ({profiles}: {profiles: Profiles}) => {
  return (
    <div className='bg-muted p-5 space-y-5 h-full xs:h-screen'>
      <div className='space-y-5 xs:grid xs:grid-cols-2 xs:space-y-0 xs:gap-5'>
      <Profile profiles={profiles}/>
      <Follower />
      </div>
      <QuizHistory />
    </div>
  )
}

export default Dashboard
