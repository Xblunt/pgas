import { HttpClient } from "./axios/HttpClient";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class AuthService extends HttpClient {
  private extractTokens(payload: any): Tokens {
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

  private toRFC3339BirthDate(input: any): any {
    if (typeof input !== "string") return input;
    const s = input.trim();
    if (!s) return s;

    if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s;

    const dmY = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const m = s.match(dmY);
    if (m) {
      const day = m[1];
      const month = m[2];
      const year = m[3];
      return `${year}-${month}-${day}T00:00:00Z`;
    }

    const yMd = /^(\d{4})-(\d{2})-(\d{2})$/;
    const m2 = s.match(yMd);
    if (m2) {
      const year = m2[1];
      const month = m2[2];
      const day = m2[3];
      return `${year}-${month}-${day}T00:00:00Z`;
    }

    return s;
  }

  async signIn(email: string, password: string): Promise<Tokens> {
    const payload = await this.post<any>("/auth/signin", { email, password });
    return this.extractTokens(payload);
  }

  async signUp(data: any): Promise<Tokens> {
    const payloadToSend = {
      ...data,
      birth_date: this.toRFC3339BirthDate(data?.birth_date),
    };

    const payload = await this.post<any>("/auth/signup", payloadToSend);
    return this.extractTokens(payload);
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    const payload = await this.post<any>(
        "/auth/refresh-token",
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } }
    );
    return this.extractTokens(payload);
  }

  async changePassword(password: string): Promise<void> {
    await this.post<any>("/auth/change-password", { password });
  }
}

export default AuthService;
