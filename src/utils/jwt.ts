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

    if (!accessToken || !refreshToken) {
      throw new Error("Не удалось получить токены из ответа сервера");
    }

    return { accessToken, refreshToken };
  }
export const decodeUserName = (userName: string): string => {
    if (!userName || typeof userName !== 'string') {
        return 'User';
    }
    
    if (/Ð|Ñ|Ð|Ñ/.test(userName)) {
        try {
            const bytes = new Uint8Array(userName.length);
            for (let i = 0; i < userName.length; i++) {
                bytes[i] = userName.charCodeAt(i);
            }
            const decoded = new TextDecoder('utf-8').decode(bytes);
            
            if (!/Ð|Ñ|Ð|Ñ/.test(decoded)) {
                return decoded;
            }
            
            const encoder = new TextEncoder();
            const decoder = new TextDecoder('utf-8');
            const encoded = encoder.encode(userName);
            return decoder.decode(encoded);
            
        } catch (error) {
            return userName;
        }
    }
    
    return userName;
};