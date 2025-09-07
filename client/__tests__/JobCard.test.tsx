import { render, screen } from "@testing-library/react";
import JobCard from "../components/JobCard";
import "@testing-library/jest-dom";

describe("JobCard", () => {
  it("renders title, company, location, tags", () => {
    const job = {
      _id: "1",
      title: "Frontend Engineer",
      company: "Acme Co",
      image: "https://example.com/img.jpg",
      location: "Remote",
      salary: "$100k-$130k",
      description: "Build great UIs",
      type: "full-time",
      tags: ["React", "TypeScript"],
      remote: true,
      createdAt: new Date().toISOString(),
    };

    render(<JobCard job={job as any} />);

    expect(screen.getByText(/Frontend Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Acme Co/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });
});

