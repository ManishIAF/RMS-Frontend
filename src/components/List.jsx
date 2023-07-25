import React, { useState } from 'react';

const ProfessorList = ({professors}) => {
  const [activeProfessor, setActiveProfessor] = useState(null);

  const handleProfessorClick = (professorId) => {
    setActiveProfessor(professorId);
  };

  return (
    <div className="professor-list">
      <ul>
        {professors.map((professor) => (
          <li
            key={professor.id}
            className={activeProfessor === professor.id ? 'active' : ''}
            onClick={() => handleProfessorClick(professor.id)}
          >
            {professor.name}
          </li>
        ))}
      </ul>

      {activeProfessor && (
        <div className="professor-info">
          <h2>{professors.find((professor) => professor.id === activeProfessor).name}</h2>
          {/* Display additional information about the selected professor */}
        </div>
      )}

      {activeProfessor && (
        <div className="line-container">
          <div className="line-start" />
          <div className="line-connector" />
          <div className="line-end" />
        </div>
      )}
    </div>
  );
};

// export default ProfessorList;

const List = () => {
  const professors = [
    { id: 1, name: 'Professor A', info: 'Some information about Professor A.' },
    { id: 2, name: 'Professor B', info: 'Some information about Professor B.' },
    { id: 3, name: 'Professor C', info: 'Some information about Professor C.' },
  ];

  return (
    <div>
      <h2>Professor List</h2>
      <ProfessorList professors={professors} />
    </div>
  );
};

export default List;


// export default ProfessorList;
