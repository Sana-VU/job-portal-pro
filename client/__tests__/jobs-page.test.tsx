import { render, screen, waitFor } from "@testing-library/react";
import JobsPage from "../app/jobs/page";
import { vi } from "vitest";
import { api } from "../lib/api";

vi.mock("../lib/api", () => {
  return {
    api: {
      get: vi.fn(async () => ({
        data: {
          items: [
            { _id: "1", title: "Job A", company: "CoA", location: "NY", salary: "", description: "desc", type: "full-time", tags: [], remote: false, createdAt: new Date().toISOString() },
            { _id: "2", title: "Job B", company: "CoB", location: "SF", salary: "", description: "desc", type: "contract", tags: [], remote: true, createdAt: new Date().toISOString() },
          ],
          total: 2,
          page: 1,
          pageSize: 20,
          totalPages: 1,
        },
      })),
    },
  };
});

describe("/jobs page", () => {
  it("renders a list of jobs from API", async () => {
    render(<JobsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Find Your Dream Job/i)).toBeInTheDocument();
      expect(screen.getByText(/Job A/i)).toBeInTheDocument();
      expect(screen.getByText(/Job B/i)).toBeInTheDocument();
    });
  });
});

