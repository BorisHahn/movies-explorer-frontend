import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section className='aboutMe'>
      <h2 className='aboutMe__title'>Студент</h2>
      <div className='aboutMe__container'>
        <div className='aboutMe__info'>
          <h3 className='aboutMe__info-name'>Борис</h3>
          <p className='aboutMe__info-about'>Фронтенд-разработчик, 29 лет</p>
          <p className='aboutMe__info-story'>
            Я родился и живу в Москве, закончил Московский Политехнический
            Университет. У меня есть жена и дочь. Я люблю слушать музыку, а ещё
            увлекаюсь футболом. С 2020 года начал изучать веб-разработку. Я
            испытываю радость и удовольствие, когда создаю сайты и приложения,
            которыми пользуются живые настоящие люди, закрывают свои потребности
            и испытывают эмоции.
          </p>
          <a className='aboutMe__link' href='https://github.com/BorisHahn'>
            Github
          </a>
        </div>
        <div className='aboutMe__photo'></div>
      </div>
    </section>
  );
};

export default AboutMe;
