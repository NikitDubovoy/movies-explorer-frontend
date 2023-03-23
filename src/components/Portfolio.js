import "../page/index.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-element">
          <a
            className="portfolio__list-link"
            href="https://github.com/NikitDubovoy/how-to-learn"
            target="_blank"
          >
            <h3 className="portfolio__list-title">Статичный сайт</h3>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a
            className="portfolio__list-link"
            href="https://github.com/NikitDubovoy/russian-travel"
            target="_blank"
          >
            <h3 className="portfolio__list-title">Адаптивный сайт</h3>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
        <li className="portfolio__list-element">
          <a
            className="portfolio__list-link"
            href="https://github.com/NikitDubovoy/react-mesto-api-full"
            target="_blank"
          >
            <h3 className="portfolio__list-title">Одностраничное приложение</h3>
            <p className="portfolio__list-text">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
