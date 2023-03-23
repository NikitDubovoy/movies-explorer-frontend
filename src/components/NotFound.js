import "../page/index.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <main className="not-found">
        <div className="not-found__block">
          <h1 className="not-found__title">404</h1>
          <span className="not-found__text">Страница не найдена</span>
          <button
            onClick={() => navigate(-1)}
            className="not-found__button-back"
            type="button"
          >
            Назад
          </button>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
