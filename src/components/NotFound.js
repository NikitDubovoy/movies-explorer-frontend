import "../page/index.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <div className="not-found__block">
        <h1 className="not-found__title">404</h1>
        <span className="not-found__text">Страница не найдена</span>
        <button onClick={() => navigate(-1)} className="not-found__button-back">
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
