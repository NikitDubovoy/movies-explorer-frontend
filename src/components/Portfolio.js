import "../page/index.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-element">
          <h3 className="portfolio__list-title">Статичный сайт</h3>
          <a
            href="https://github.com/NikitDubovoy/how-to-learn"
            className="portfolio__list-link"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__list-element">
          <h3 className="portfolio__list-title">Адаптивный сайт</h3>
          <a
            href="https://github.com/NikitDubovoy/russian-travel"
            className="portfolio__list-link"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__list-element">
          <h3 className="portfolio__list-title">Одностраничное приложение</h3>
          <a
            href="https://github.com/NikitDubovoy/react-mesto-api-full"
            className="portfolio__list-link"
          >
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
