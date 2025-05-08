import { decodeJWT } from "../../utils/jwtUtils";
export function storeUserAndReload({ accessToken, refreshToken, activeRole }) {
    const decoded = decodeJWT(accessToken);
    const userData = {
      token: accessToken,
      refreshToken,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      id: decoded.id,
      roles: decoded.roles,
      activeRole: activeRole || decoded.roles[0],
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  