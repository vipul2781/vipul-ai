import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ projects, proposals }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const defaultProposals = [
    { id: 1, project: "Build a React Business Website", bid: "₹28,000", status: "Pending", date: "26 Sep 2026", client: "Rajesh Kumar" },
    { id: 2, project: "Design a Mobile App UI/UX", bid: "₹22,000", status: "Accepted", date: "24 Sep 2026", client: "Neha Agarwal" },
    { id: 3, project: "SEO Optimization for E-Commerce", bid: "₹18,000", status: "Under Review", date: "22 Sep 2026", client: "Suresh Patil" },
    { id: 4, project: "Develop a Flutter Mobile App", bid: "₹65,000", status: "Rejected", date: "18 Sep 2026", client: "Deepak Sharma" }
  ];

  const allProposals = proposals && proposals.length > 0 ? [...proposals, ...defaultProposals] : defaultProposals;

  return (
    <div className="dashboard-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Dashboard</li>
            </ol>
          </nav>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h1 className="fw-bold mb-1">Welcome back, Rahul!</h1>
              <p className="opacity-75 mb-0">Full Stack Developer · Ahmedabad, India</p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/post-project" className="btn btn-warning text-dark fw-bold">
                <i className="bi bi-plus-circle me-1"></i> Post Project
              </Link>
              <Link to="/post-service" className="btn btn-light">
                <i className="bi bi-lightning-charge me-1"></i> Create Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3 col-12">
            <div className="dashboard-sidebar shadow-sm bg-white p-2">
              <div className="text-center p-3 border-bottom">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Avatar"
                  className="rounded-circle mb-2"
                  style={{ width: 72, height: 72, objectFit: 'cover' }}
                />
                <h6 className="fw-bold mb-0">Rahul Sharma</h6>
                <span className="badge bg-success-soft text-success small">Verified Pro</span>
              </div>

              <div className="nav flex-column nav-pills mt-2">
                <button
                  className={`nav-link text-start ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <i className="bi bi-grid-1x2"></i> Dashboard Overview
                </button>
                <button
                  className={`nav-link text-start ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  <i className="bi bi-folder2-open"></i> My Projects
                </button>
                <button
                  className={`nav-link text-start ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <i className="bi bi-card-checklist"></i> My Services
                </button>
                <button
                  className={`nav-link text-start ${activeTab === 'proposals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('proposals')}
                >
                  <i className="bi bi-send-check"></i> Proposals ({allProposals.length})
                </button>
                <Link to="/messages" className="nav-link text-start">
                  <i className="bi bi-chat-dots"></i> Messages
                </Link>
                <Link to="/favorites" className="nav-link text-start">
                  <i className="bi bi-heart"></i> Favorites
                </Link>
                <button
                  className={`nav-link text-start ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="bi bi-person"></i> Profile
                </button>
                <button
                  className={`nav-link text-start ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="bi bi-gear"></i> Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="col-lg-9 col-12">
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div>
                {/* Stats Row */}
                <div className="row g-3 mb-4">
                  <div className="col-md-3 col-6">
                    <div className="stat-card">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small fw-semibold">Active Projects</span>
                        <div className="stat-icon bg-primary-soft text-primary-custom">
                          <i className="bi bi-hourglass-split"></i>
                        </div>
                      </div>
                      <h3 className="fw-bold mb-0">4</h3>
                      <small className="text-success"><i className="bi bi-arrow-up-right me-1"></i>2 on track</small>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="stat-card">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small fw-semibold">Completed</span>
                        <div className="stat-icon bg-success-soft text-success">
                          <i className="bi bi-check2-circle"></i>
                        </div>
                      </div>
                      <h3 className="fw-bold mb-0">18</h3>
                      <small className="text-muted">100% 5-star rating</small>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="stat-card">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small fw-semibold">Pending Proposals</span>
                        <div className="stat-icon bg-warning-soft text-warning">
                          <i className="bi bi-send"></i>
                        </div>
                      </div>
                      <h3 className="fw-bold mb-0">{allProposals.length}</h3>
                      <small className="text-info">2 awaiting client response</small>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="stat-card">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small fw-semibold">Total Earnings</span>
                        <div className="stat-icon bg-info-soft text-info">
                          <i className="bi bi-wallet2"></i>
                        </div>
                      </div>
                      <h3 className="fw-bold mb-0">₹1,45,000</h3>
                      <small className="text-success"><i className="bi bi-arrow-up-right me-1"></i>+18% this month</small>
                    </div>
                  </div>
                </div>

                {/* Earnings Visualization / Progress Section */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-graph-up-arrow text-primary-custom me-2"></i>Earnings & Goal Progress
                    </h5>
                    <span className="badge bg-light text-dark border">Q3 Financial Target: ₹2,00,000</span>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>Monthly Progress (₹1,45,000 of ₹2,00,000)</span>
                      <strong>72.5%</strong>
                    </div>
                    <div className="progress" style={{ height: '12px' }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '72.5%' }}
                        aria-valuenow="72.5"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>

                  {/* Visual Monthly Breakdown Bar chart simulation */}
                  <div className="row g-2 text-center pt-3 border-top">
                    <div className="col">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary rounded-top" style={{ height: '50px', width: '28px' }}></div>
                        <span className="small text-muted mt-2">May</span>
                        <strong className="small">₹24k</strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary rounded-top" style={{ height: '75px', width: '28px' }}></div>
                        <span className="small text-muted mt-2">Jun</span>
                        <strong className="small">₹38k</strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary rounded-top" style={{ height: '65px', width: '28px' }}></div>
                        <span className="small text-muted mt-2">Jul</span>
                        <strong className="small">₹32k</strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary rounded-top" style={{ height: '90px', width: '28px' }}></div>
                        <span className="small text-muted mt-2">Aug</span>
                        <strong className="small">₹46k</strong>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary-light rounded-top" style={{ height: '110px', width: '28px' }}></div>
                        <span className="small text-primary-custom fw-bold mt-2">Sep</span>
                        <strong className="small text-primary-custom">₹55k</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Proposals */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Recent Proposals Submitted</h5>
                    <Link to="/projects" className="btn btn-sm btn-link text-primary-custom text-decoration-none">
                      Find More Projects
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Project Title</th>
                          <th>Client</th>
                          <th>Bid Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allProposals.map((prop, idx) => (
                          <tr key={idx}>
                            <td className="fw-semibold text-dark">{prop.project || prop.projectTitle}</td>
                            <td className="text-secondary small">{prop.client || prop.clientName}</td>
                            <td className="fw-bold text-primary-custom">{prop.bid || `₹${prop.bidAmount}`}</td>
                            <td>
                              <span
                                className={`badge ${
                                  prop.status === 'Accepted'
                                    ? 'bg-success'
                                    : prop.status === 'Rejected'
                                    ? 'bg-danger'
                                    : 'bg-warning text-dark'
                                }`}
                              >
                                {prop.status || 'Pending'}
                              </span>
                            </td>
                            <td className="text-muted small">{prop.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Projects Active */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Active Project Engagements</h5>
                    <span className="badge bg-primary-soft text-primary-custom">4 In Progress</span>
                  </div>

                  <div className="row g-3">
                    {projects.slice(0, 2).map((proj) => (
                      <div className="col-md-6 col-12" key={proj.id}>
                        <div className="border rounded-3 p-3 bg-light">
                          <h6 className="fw-bold mb-1">{proj.title}</h6>
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <span>Client: {proj.clientName}</span>
                            <span className="text-primary-custom fw-semibold">₹{proj.budget.max.toLocaleString()}</span>
                          </div>
                          <div className="progress mb-2" style={{ height: '6px' }}>
                            <div className="progress-bar bg-success" style={{ width: '60%' }}></div>
                          </div>
                          <div className="d-flex justify-content-between small">
                            <span className="text-muted">Deadline: {proj.deadline}</span>
                            <Link to={`/projects/${proj.id}`} className="text-primary-custom fw-semibold">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Tab fallbacks for rich interactivity */}
            {activeTab === 'projects' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold mb-3">All Assigned & Active Projects</h5>
                <p className="text-muted">Manage all client contracts, deliverable uploads, and milestone invoices.</p>
                <div className="list-group">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                      <div>
                        <h6 className="fw-bold mb-1">{p.title}</h6>
                        <small className="text-muted">Category: {p.category} · Client: {p.clientName}</small>
                      </div>
                      <Link to={`/projects/${p.id}`} className="btn btn-sm btn-outline-custom">Manage</Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">My Published Services</h5>
                  <Link to="/post-service" className="btn btn-sm btn-primary-custom">
                    + Add New Service
                  </Link>
                </div>
                <div className="border rounded-3 p-3 mb-2 bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-0">Build a React Website</h6>
                    <small className="text-muted">3 packages active · 45 orders completed</small>
                  </div>
                  <span className="badge bg-success">Active</span>
                </div>
              </div>
            )}

            {activeTab === 'proposals' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold mb-3">All Sent Proposals</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Bid Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProposals.map((prop, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold">{prop.project || prop.projectTitle}</td>
                          <td>{prop.client || prop.clientName}</td>
                          <td className="fw-bold text-primary-custom">{prop.bid || `₹${prop.bidAmount}`}</td>
                          <td><span className="badge bg-warning text-dark">{prop.status || 'Pending'}</span></td>
                          <td>{prop.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold mb-3">Freelancer Public Profile</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label-custom">Full Name</label>
                    <input type="text" className="form-control" defaultValue="Rahul Sharma" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom">Professional Title</label>
                    <input type="text" className="form-control" defaultValue="Full Stack Developer" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom">Hourly Rate (₹ INR)</label>
                    <input type="number" className="form-control" defaultValue="1200" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-custom">Location</label>
                    <input type="text" className="form-control" defaultValue="Ahmedabad, Gujarat" />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary-custom" onClick={() => alert('Profile updated!')}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold mb-3">Account & Notification Settings</h5>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                  <label className="form-check-label" htmlFor="emailNotif">Email notifications for new project invitations</label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="smsNotif" defaultChecked />
                  <label className="form-check-label" htmlFor="smsNotif">SMS alerts for client instant messages</label>
                </div>
                <button className="btn btn-primary-custom" onClick={() => alert('Preferences saved!')}>
                  Update Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
