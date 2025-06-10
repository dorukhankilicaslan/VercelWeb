// src/components/ProjectDetailsPanel.tsx
import React from 'react';

interface ProjectDetailsProps {
    title: string;
    project: string;
    client: string;
    languages: string;
    previewUrl: string;
}

const ProjectDetailsPanel: React.FC<ProjectDetailsProps> = ({
    title,
    project,
    client,
    languages,
    previewUrl,
}) => {
    return (
        <figcaption className="pswp__custom-figcaption" >
            <h3>{title} </h3>
            < div className="row open-sans-font" >
                <div className="col-6 mb-2" >
                    <i className="fa fa-file-text-o pr-2" > </i>
                    <span className="project-label" > Project </span>: <span className="ft-wt-600 uppercase">{project}</span >
                </div>
                < div className="col-6 mb-2" >
                    <i className="fa fa-user-o pr-2" > </i>
                    <span className="project-label" > Client </span>: <span className="ft-wt-600 uppercase">{client}</span >
                </div>
                < div className="col-6 mb-2" >
                    <i className="fa fa-code pr-2" > </i>
                    <span className="project-label" > Langages </span>: <span className="ft-wt-600 uppercase">{languages}</span >
                </div>
                < div className="col-6 mb-2" >
                    <i className="fa fa-external-link pr-2" > </i>
                    < span className="project-label" > Preview </span>: <span className="ft-wt-600 uppercase">
                        < a href={previewUrl} target="_blank" rel="noopener noreferrer" > {new URL(previewUrl).hostname} </a>
                    </span>
                </div>
            </div>
        </figcaption>
    );
};

export default ProjectDetailsPanel;