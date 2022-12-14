import { Link } from 'react-router-dom';
import './Promo.css';

const Promo = () => {
  const scrollTo = () => {
    const element = document.querySelector('#aboutProject');
    element.scrollIntoView();
  };
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <h3 className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h3>
        <button
          className='promo__button'
          to='#aboutProject'
          onClick={() => scrollTo()}
        >
          Узнать больше
        </button>
      </div>
      <div className='promo__logo'></div>
    </section>
  );
};

export default Promo;
