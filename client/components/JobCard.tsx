type Props = { job: any }

export default function JobCard({ job }: Props) {
  return (
    <article className="card">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-slate-600">{job.company} • {job.location}</p>
      {job.salary && <p className="mt-1 text-sm">Salary: {job.salary}</p>}
      <p className="mt-2 text-sm">{job.description}</p>
    </article>
  )
}
