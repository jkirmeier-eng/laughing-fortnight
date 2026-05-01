const SESSION_KEY = "ajay_session_token";

export function getSessionToken() {
    return sessionStorage.getItem(SESSION_KEY);
}

export function saveSessionToken(token) {
    sessionStorage.setItem(SESSION_KEY, token);
    return token;
}

export function clearSessionToken() {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
}