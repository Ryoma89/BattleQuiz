import React from 'react'
import Login from './Login'
import LoginForm from './LoginForm'

const LoginPage = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  return (
    <section className='p-5 xs:p-10 lg:grid lg:grid-cols-2 lg:items-center'>
      <Login />
      <LoginForm searchParams={searchParams}/>
    </section>
  )
}

export default LoginPage
