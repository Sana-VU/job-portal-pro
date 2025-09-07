'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import JobCard from '@/components/JobCard'

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const run = async () => {
      try {
        const { data } = await api.get('/jobs')
        setJobs(data)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <p>Loading jobs...</p>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Latest Jobs</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map(job => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  )
}
