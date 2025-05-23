import React from 'react'
import { getUser } from '~/appwrite/auth'
import { Header, StatsCard, TripsCard } from '~/components'
import { allTrips, dashboardStats } from '~/constants'
import type { Route } from './+types/dashboard'

export const clientLoader = async () => {
    const [
        user,
    ] = await Promise.all([
        await getUser(),
    ])

    return {
        user
    }
}

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
    const user = loaderData.user as User | null;
  
    return (
        <main className='dashboard wrapper'>
        <Header title={`Welcome ${user?.name ?? 'Guest'} 👋`} description='Track activity, trends and popular destination'/>

        <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <StatsCard
                    headerTitle="Total Users"
                    total={dashboardStats.totalUsers}
                    currentMonthCount={dashboardStats.usersJoined.currentMonth}
                    lastMonthCount={dashboardStats.usersJoined.lastMonth}
                />
                <StatsCard
                    headerTitle="Total Trips"
                    total={dashboardStats.totalTrips}
                    currentMonthCount={dashboardStats.tripsCreated.currentMonth}
                    lastMonthCount={dashboardStats.tripsCreated.lastMonth}
                />
                <StatsCard
                    headerTitle="Active Users"
                    total={dashboardStats.userRole.total}
                    currentMonthCount={dashboardStats.userRole.currentMonth}
                    lastMonthCount={dashboardStats.userRole.lastMonth}
                />
            </div>
        </section>
        <section className="container">
            <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

            <div className='trip-grid'>
                {allTrips.map((trip) => (
                    <TripsCard
                        key={trip.id}
                        id={trip.id.toString()}
                        name={trip.name!}
                        imageUrl={trip.imageUrls[0]}
                        location={trip.itinerary?.[0]?.location ?? ''}
                        tags={trip.tags}
                        price={trip.estimatedPrice!}
                    />
                ))}
            </div>
        </section>
        </main>
    )
}

export default Dashboard