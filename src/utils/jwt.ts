export function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const  extractTokens = (payload: any) =>  {
    const root = payload?.data ?? payload?.result ?? payload;

    const accessToken =
        root?.access_token ??
        root?.accessToken ??
        root?.AccessToken ??
        payload?.access_token ??
        payload?.accessToken ??
        payload?.AccessToken;

    const refreshToken =
        root?.refresh_token ??
        root?.refreshToken ??
        root?.RefreshToken ??
        payload?.refresh_token ??
        payload?.refreshToken ??
        payload?.RefreshToken;

    const isRoot =
        root?.isRoot ??
        payload?.isRoot;

    if (!accessToken || !refreshToken) {
      throw new Error("Не удалось получить токены из ответа сервера");
    }

    return { accessToken, refreshToken, isRoot };
  }