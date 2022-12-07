import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='aboutProject' id='aboutProject'>
      <h2 className='aboutProject__title'>О проекте</h2>
      <div class='aboutProject__container'>
        <div class='aboutProject__block'>
          <h3 class='aboutProject__block-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p class='aboutProject__block-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div class='aboutProject__block'>
          <h3 class='aboutProject__block-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p class='aboutProject__block-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div class='aboutProject__scale'>
        <div className='aboutProject__scale-back'>1 неделя</div>
        <div className='aboutProject__scale-front'>4 недели</div>
      </div>
      <div class='aboutProject__scale'>
        <div className='aboutProject__scale-back aboutProject__scale-back_eng'>
          Back-end
        </div>
        <div className='aboutProject__scale-front aboutProject__scale-front_eng'>
          Front-end
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
