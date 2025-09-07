'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [me, setMe] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', company: '', location: '', salary: '', description: '' })

  useEffect(()=>{
    const run = async () => {
      const meRes = await api.get('/auth/me', { withCredentials: true })
      setMe(meRes.data)
      if (meRes.data?.role === 'admin') {
        const { data } = await api.get('/jobs')
        setJobs(data.items || [])
      }
    }
    run()
  }, [])

  const createJob = async () => {
    await api.post('/jobs', form, { withCredentials: true })
    const { data } = await api.get('/jobs')
    setJobs(data.items || [])
  }

  if (!me) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Signed in as <b>{me.name}</b> ({me.role})</p>

      {me.role === 'admin' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-semibold mb-3">Post a new job</h2>
            <div className="space-y-2">
              {['title','company','location','salary','description'].map(k => (
                <div key={k}>
                  <label className="label">{k}</label>
                  <input className="input" value={(form as any)[k]} onChange={e=>setForm({...form, [k]: e.target.value})} />
                </div>
              ))}
              <button className="btn" onClick={createJob}>Create</button>
            </div>
          </div>
          <div className="card">
            <h2 className="font-semibold mb-3">Your jobs</h2>
            <ul className="space-y-2">
              {jobs.map(j => <li key={j._id} className="border rounded p-2"><b>{j.title}</b> — {j.company}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        <div className="card">Your applications will appear here.</div>
      )}
    </div>
  )
}
