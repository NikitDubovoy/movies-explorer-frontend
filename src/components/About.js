import "../page/index.css";

function About() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className="about__list">
        <li className="about__li">
          <h3 className="about__list-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__list-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__li">
          <h3 className="about__list-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__list-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__scale">
        <div className="about__scale-filing">1 неделя</div>
        <div className="about__scale-no-filing">4 недели</div>
        <p className="about__scale-text-filing">Back-end</p>
        <p className="about__scale-text-no-filing">Front-end</p>
      </div>
    </section>
  );
}

export default About;
