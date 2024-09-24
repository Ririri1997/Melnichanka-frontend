import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREFIX } from "../../../helpers/API";

export const Logout = () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Проверяем наличие рефреш-токена
        if (refreshToken) {
          await axios.post(
            `${PREFIX}users/logout/`,
            { refresh_token: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Переносим это сюда
            }
          );

          // Очищаем локальное хранилище после успешного логаута
          localStorage.clear();
          // Удаляем заголовок Authorization для всех будущих запросов
          axios.defaults.headers.common['Authorization'] = null;

          // Перенаправляем на страницу логина
          navigate('/login');
        } else {
          console.error("Refresh token is missing.");
        }
      } catch (e) {
        console.error("Logout not working:", e);
      }
    })();
  }, [navigate, refreshToken]);

  return <div></div>;
};
