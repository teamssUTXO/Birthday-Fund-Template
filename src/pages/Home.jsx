import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [amount, setAmount] = useState('');

  // Crée l'URL PayPal.me avec montant si montant > 0
  const createPaypalLink = () => {
    const baseLink = 'https://www.paypal.me/T9Noca';
    const cleanAmount = parseFloat(amount);
    if (cleanAmount > 0) {
      // Limite à 2 décimales
      return `${baseLink}/${cleanAmount.toFixed(2)}`;
    }
    return baseLink;
  };

  const handleClick = () => {
    const url = createPaypalLink();
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <div>
        <h1 className="cagnotte-title" >Contribuer à la cagnotte de Brigitte</h1>
        <div className="title-divider"></div>
      </div>
      <div className="columns">
        <div className="column-left">
          <img src="https://fardellatimothe.github.io/cagnotte_maman/public/img/5d95c2c803819_airbus.jpg" alt="Voyage" />
          <p>
            Pour son anniversaire, nous avons eu envie d’offrir à Brigitte un beau cadeau : un billet d’avion pour la Nouvelle-Calédonie (~2000 €).<br />
            Pour nous aider à réaliser cette surprise, j’ai mis en place une cagnotte en ligne pour celles et ceux qui préfèrent participer par virement.<br />
            Chacun peut contribuer à hauteur de ce qu’il souhaite — il suffit d’entrer le montant et de cliquer sur "Contribuer".<br />
            Un grand merci d’avance pour votre participation !
          </p>
        </div>

        <div className="column-right">
          <div className="contribution-box">
            <p><strong>Montant total de la cagnotte :</strong> 0€</p>
            <p><strong>Nombre de participants :</strong> 0</p>
            <input
              type="number"
              placeholder="Montant en €"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleClick} disabled={!amount || parseFloat(amount) <= 0}>
              Contribuer
            </button>
          </div>
        </div>
      </div>

      <footer>
        <p>Développé par Timothé.</p>
      </footer>
    </div>
  );
}

export default Home;
