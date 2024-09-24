export const saveTokens = (accessToken, refreshToken) => {
 localStorage.setItem("access_token", accessToken);
 localStorage.setItem("refresh_token", refreshToken);
 console.log(accessToken, refreshToken);
};

export const clearTokens = () => {
 localStorage.removeItem("access_token");
 localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
 return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
 return localStorage.getItem("refresh_token");
};