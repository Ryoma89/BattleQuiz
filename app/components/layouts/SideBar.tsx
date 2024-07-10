'use client'
import { BookOpen, Building, Home, LayoutDashboard, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <section className='flex flex-col mt-3'>
      <div className='flex items-center py-2'>
      <Home className="w-5 h-5" />
      <Link href="/home" className='ml-2'>Home</Link>
      </div>
      <div className='flex items-center py-2'>
      <LayoutDashboard className="w-5 h-5" />
      <Link href="/dashboard" className='ml-2'>Dashboard</Link>
      </div>
      <div className='flex items-center py-2'>
      <BookOpen className="w-5 h-5" />
      <Link href="/quiz-list" className='ml-2'>Quizzes</Link>
      </div>
      <div className='flex items-center py-2'>
      <MessageSquare className="w-5 h-5" />
      <Link href="/chat" className='ml-2'>Chat</Link>
      </div>
      <div className='flex items-center py-2'>
      <Building className="w-5 h-5" />
      <Link href="/organizations" className='ml-2'>Organizations</Link>
      </div>
    </section>
  )
}

export default SideBar
