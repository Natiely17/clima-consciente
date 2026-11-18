import React from 'react';
import styles from './StatCard.module.css';

function StatCard({ titulo, valor }) {
  return (
    <div className={styles.cartao}>
      <p>{titulo}</p>
      <h2 className={styles.valor}>{valor}</h2>
    </div>
  );
}

export default StatCard;
