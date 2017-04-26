import React, { PropTypes } from 'react';

const MyProjects = ({ projects }) => {
    function renderProjects() {
        if (projects.length > 0) {
            return projects.map(project => {
                return (
                    <div key={project.id}>
                        {project.name}
                    </div>
                );
            });
        } else {
            return <p>Þú átt engin skráð verkefni.</p>;
        }
    }
    return (
        <div>
            {renderProjects()}
        </div>
    );
};

MyProjects.propTypes = {
    projects: PropTypes.array.isRequired
};

export default MyProjects;