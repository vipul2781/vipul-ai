import React from 'react';
import { Link } from 'react-router-dom';
import SkillBadge from './SkillBadge';

const ProjectCard = ({ project, onToggleFavorite, isFavorite }) => {
  return (
    <div className="project-card">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="project-title mb-0">{project.title}</h5>
        <button
          className={`btn btn-sm ${isFavorite ? 'text-danger' : 'text-muted'}`}
          onClick={(e) => { e.preventDefault(); onToggleFavorite(project.id, 'project'); }}
          style={{ border: 'none', background: 'none', fontSize: '1rem' }}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
      </div>
      <p className="project-desc">{project.description}</p>

      <div className="budget mb-2">
        ₹{project.budget.min.toLocaleString()} – ₹{project.budget.max.toLocaleString()}
      </div>

      <div className="skill-badges mb-2">
        {project.skills.slice(0, 4).map((skill, i) => (
          <SkillBadge key={i} skill={skill} />
        ))}
      </div>

      <div className="project-meta">
        <span><i className="bi bi-briefcase"></i> {project.type}</span>
        <span><i className="bi bi-bar-chart"></i> {project.experience}</span>
        <span><i className="bi bi-people"></i> {project.proposals} proposals</span>
        <span><i className="bi bi-clock"></i> {project.postedTime}</span>
      </div>

      <div className="d-flex align-items-center gap-2 mt-3">
        <img src={project.clientImage} alt={project.clientName} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
          {project.clientName} · {project.clientLocation}
        </span>
      </div>

      <Link to={`/projects/${project.id}`} className="btn btn-outline-custom w-100 mt-3">
        View Project
      </Link>
    </div>
  );
};

export default ProjectCard;
