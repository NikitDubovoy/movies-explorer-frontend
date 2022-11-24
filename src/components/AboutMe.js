import "../page/index.css";
import image from "../images/AboutMe/pic__COLOR_pic.jpg";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <ul className="about-me__list">
          <li>
            <h3 className="about-me__title-list">Виталий</h3>
          </li>
          <li>
            <h4 className="about-me__context">Фронтенд-разработчик, 30 лет</h4>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              to="https://github.com/NikitDubovoy/"
              className="about-me__link-github"
            >
              Github
            </Link>
          </li>
        </ul>
        <img className="about-me__img" src={image} alt="фото"></img>
      </div>
    </section>
  );
}

export default AboutMe;
