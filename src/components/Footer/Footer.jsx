import { useLocation } from 'react-router';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  const footerClass =
    location.pathname === '/' ||
    location.pathname === '/movies' ||
    location.pathname === '/saved-movies'
      ? 'footer'
      : 'footer_hide';
  return (
    <footer className={footerClass}>
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
