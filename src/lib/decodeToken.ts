export default function decodeToken(token: string | null | undefined) {
    if (!token) return null;
  
    try {
      const payloadBase64 = token.split(".")[1];
      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const json = atob(base64);
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }