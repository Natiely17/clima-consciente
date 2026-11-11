import React from 'react';

function StatCard({ titulo, valor }) {
  return (
    <div className="cartao">
      <p>{titulo}</p>
      <h2>{valor}</h2>
    </div>
  );
}

export default StatCard;
