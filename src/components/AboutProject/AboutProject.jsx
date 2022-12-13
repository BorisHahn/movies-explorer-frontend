import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='aboutProject' id='aboutProject'>
      <h2 className='aboutProject__title'>О проекте</h2>
      <ul className='aboutProject__container'>
        <li className='aboutProject__block'>
          <h3 className='aboutProject__block-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutProject__block-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='aboutProject__block'>
          <h3 className='aboutProject__block-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutProject__block-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='aboutProject__scale'>
        <li className='aboutProject__scale-back'>1 неделя</li>
        <li className='aboutProject__scale-front'>4 недели</li>
      </ul>
      <ul className='aboutProject__scale'>
        <li className='aboutProject__scale-back aboutProject__scale-back_eng'>
          Back-end
        </li>
        <li className='aboutProject__scale-front aboutProject__scale-front_eng'>
          Front-end
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;
