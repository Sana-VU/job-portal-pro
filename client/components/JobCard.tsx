import Link from "next/link";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  type: string;
  tags: string[];
  remote: boolean;
  createdAt: string;
};

type Props = { job: Job };

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job._id}`} className="block">
      <article className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <span className="text-xs text-gray-500">
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-2">
          {job.company} • {job.location}
          {job.remote && <span className="text-green-600 ml-2">• Remote</span>}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {job.type.charAt(0).toUpperCase() +
              job.type.slice(1).replace("-", " ")}
          </span>
          {job.tags &&
            job.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
        </div>

        {job.salary && (
          <p className="text-sm font-medium text-green-600 mb-2">
            {job.salary}
          </p>
        )}

        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
      </article>
    </Link>
  );
}
