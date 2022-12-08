import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум x BeatFilm.
      </h2>
      <div className='footer__main'>
        <p className='footer__copyright'>©{new Date().getFullYear()}</p>
        <ul className='footer__list'>
          <a
            className='footer__item'
            href='https://practicum.yandex.ru/'
            target='_blank'
          >
            <li>Яндекс.Практикум</li>
          </a>
          <a
            className='footer__item'
            href='https://github.com/BorisHahn'
            target='_blank'
          >
            <li>Github</li>
          </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
