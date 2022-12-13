import './Portfolio.css';
const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <a
          className='portfolio__item-link'
          href='https://viktorpekin.github.io/Yandex-Hr-job/'
          target='_blank1'
        >
          <li className='portfolio__item'>
            <p className='portfolio__item-text'>Статичный сайт</p>
            <div className='portfolio__item-img'></div>
          </li>
        </a>
        <a
          className='portfolio__item-link'
          href='https://borishahn.github.io/russian-travel/'
          target='_blank1'
        >
          <li className='portfolio__item'>
            <p className='portfolio__item-text'>Адаптивный сайт</p>
            <div className='portfolio__item-img'></div>
          </li>
        </a>
        <a
          className='portfolio__item-link'
          href='https://gaidukevich.mesto.nomoredomains.icu/sign-in'
          target='_blank1'
        >
          <li className='portfolio__item'>
            <p className='portfolio__item-text'>Одностраничное приложение</p>
            <div className='portfolio__item-img'></div>
          </li>
        </a>
      </ul>
    </section>
  );
};

export default Portfolio;
