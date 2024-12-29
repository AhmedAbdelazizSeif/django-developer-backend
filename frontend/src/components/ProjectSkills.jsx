import React from 'react';

const ProjectSkills = ({ skills }) => {
  return (
    <div className="mb-6">
      <h2 className="text-blue-400 text-xl font-semibold mb-2">Skills / Tags</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="
              bg-gray-800
              border border-gray-700
              text-gray-300 
              px-2 py-1 
              rounded 
              hover:bg-gray-700
              transition-colors
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectSkills;
