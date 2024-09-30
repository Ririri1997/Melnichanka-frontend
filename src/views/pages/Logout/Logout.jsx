import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREFIX } from "../../../helpers/API";
import { clearTokens, getRefreshToken } from "../../../utils/authService";

export const Logout = () => {
  const refreshToken = getRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (refreshToken) {
          await axios.post(
            `${PREFIX}users/logout/`,
            { refresh_token: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, 
            }
          );

          clearTokens();
          axios.defaults.headers.common['Authorization'] = null;

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
