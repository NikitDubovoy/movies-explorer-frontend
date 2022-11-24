import { Link } from "react-router-dom";
import "../page/index.css";

function Footer() {
  return (
    <section className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <ul className="footer__list">
        <li>
          <p className="footer__year">© 2022</p>
        </li>
        <ul className="footer__list-link">
          <li>
            <Link to="https://practicum.yandex.ru/" className="footer__link">
              Яндекс.Практикум
            </Link>
          </li>
          <li>
            <Link to="https://github.com/NikitDubovoy" className="footer__link">
              Github
            </Link>
          </li>
        </ul>
      </ul>
    </section>
  );
}

export default Footer;
