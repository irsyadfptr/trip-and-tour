import React from 'react'
import { Header } from '~/components'

const Dashboard = () => {
  const user = {
    name: 'cad'
  }
  return (
    <main className='dashboard wrapper'>
      <Header title={`Welcome ${user?.name ?? 'Guest'} 👋`} description='Track activity, trends and popular destination'/>
      Dashboard page contents
    </main>
  )
}

export default Dashboard