import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

type Status = "New" | "Reviewed";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: Status;
};

const RECORDS_PER_PAGE = 10;

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const raw = localStorage.getItem("submissions");
    if (!raw) return;
    const parsed: any[] = JSON.parse(raw);
    setSubmissions(
      parsed.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        timestamp: item.timestamp,
        status: item.status === "Reviewed" ? "Reviewed" : "New",
      })),
    );
  }, []);

  const toggleStatus = (id: string) => {
    const updated = submissions.map((item) =>
      item.id === id
        ? {
            ...item,
            status: (item.status === "New" ? "Reviewed" : "New") as Status,
          }
        : item,
    );
    setSubmissions(updated);
    localStorage.setItem("submissions", JSON.stringify(updated));
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return submissions
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sortBy === "date"
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : a.name.localeCompare(b.name),
      );
  }, [submissions, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / RECORDS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * RECORDS_PER_PAGE;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + RECORDS_PER_PAGE,
  );
  const goTo = (p: number) =>
    setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  const totalNew = submissions.filter((s) => s.status === "New").length;
  const totalReviewed = submissions.filter(
    (s) => s.status === "Reviewed",
  ).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Contact
        </button>
      </div>

      {submissions.length > 0 && (
        <div className="dashboard-stats">
          <div className="stat-chip">
            Total <span>{submissions.length}</span>
          </div>
          <div className="stat-chip">
            New <span>{totalNew}</span>
          </div>
          <div className="stat-chip">
            Reviewed <span>{totalReviewed}</span>
          </div>
        </div>
      )}

      <div className="dashboard-controls">
        <div className="search-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="search-input"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          {search && (
            <button
              className="clear-search"
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
            >
              ✕
            </button>
          )}
        </div>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as "date" | "name");
            setCurrentPage(1);
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2>{search ? "No results found" : "No submissions yet"}</h2>
          <p>
            {search
              ? `Nothing matched "${search}"`
              : "Form submissions will appear here"}
          </p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td className="cell-name">{item.name}</td>
                    <td className="cell-email">{item.email}</td>
                    <td className="cell-subject">{item.subject}</td>
                    <td className="message-cell">{item.message}</td>
                    <td className="cell-date">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <span className="time-text">
                        {new Date(item.timestamp).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${item.status.toLowerCase()}`}
                        onClick={() => toggleStatus(item.id)}
                        title="Click to toggle status"
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-row">
            <span className="pagination-info">
              {startIndex + 1}–
              {Math.min(startIndex + RECORDS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} results
            </span>
            <div className="pagination">
              <button
                disabled={safePage === 1}
                onClick={() => goTo(safePage - 1)}
              >
                ‹
              </button>
              {buildPageRange(safePage, totalPages).map((p, i) =>
                p === "…" ? (
                  <span key={`e-${i}`} className="page-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={safePage === p ? "active" : ""}
                    onClick={() => goTo(p)}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                disabled={safePage === totalPages}
                onClick={() => goTo(safePage + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
