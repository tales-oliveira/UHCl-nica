import React from 'react';

const Card = ({ title, imagePath, description }) => {
  return (
    <div className="text-white">
      <img src={imagePath} className="rounded-full mx-auto mb-4 w-64 h-64 object-cover" alt='imagem de médico' />
      <h3>{title}</h3>
      <p className=''>{description}</p>
    </div>
  );
};

export default Card;
