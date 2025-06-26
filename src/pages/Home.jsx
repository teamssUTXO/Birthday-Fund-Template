import React, { useState } from 'react';
import './Home.css';

function Home() {

  const handleClick = () => {
    window.open("https://www.paypal.com/donate/?hosted_button_id=DRARAU3BJVJ56", '_blank');
  };

  return (
    <div className="container">
      <div>
        <h1 className="cagnotte-title" >Contribuer à la cagnotte de Brigitte</h1>
        <div className="title-divider"></div>
      </div>
      <div className="columns">
        <div className="column-left">
          <img src="img/5d95c2c803819_airbus.jpg" alt="Voyage" />
          <p>
            Pour son anniversaire, nous avons eu envie d’offrir à Brigitte un beau cadeau : un billet d’avion pour la Nouvelle-Calédonie (~2000 €).<br />
            Pour nous aider à réaliser cette surprise, j’ai mis en place une cagnotte en ligne pour celles et ceux qui préfèrent participer par virement.<br />
            Chacun peut contribuer à hauteur de ce qu’il souhaite — il suffit d’entrer le montant et de cliquer sur "Contribuer".<br />
            Un grand merci d’avance pour votre participation !
          </p>
        </div>

        <div className="column-right">
          <div className="contribution-box">
            <p><strong>Montant total de la cagnotte :</strong> 300€</p>
            <p><strong>Nombre de participants :</strong> 6</p>
            
            <div className="divider"></div>
            
            <button onClick={handleClick} >
              Contribuer
            </button>

            <div className="divider"></div>

            <p>Vous pouvez aussi participer en scannant le QR code ci-dessous :</p>
            <img src='img/qr-code-paypal.png'></img>
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
