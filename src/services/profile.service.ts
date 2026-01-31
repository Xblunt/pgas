import { CreateUser } from "@/models/User";
import { HttpClient } from "./axios/HttpClient";

export type UserProfile = Omit<CreateUser, "password"> & { uuid: string; password?: string };

type AnyObj = Record<string, any>;

const extractRoot = (payload: any) => payload?.data ?? payload?.result ?? payload;

const pick = (obj: AnyObj, keys: string[]) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
};

const toDottedDate = (input: any): string => {
  if (typeof input !== "string") return "";
  const s = input.trim();
  if (!s) return "";

  const mIso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (mIso) {
    const y = mIso[1];
    const mo = mIso[2];
    const d = mIso[3];
    return `${d}.${mo}.${y}`;
  }

  if (/^\d{2}\.\d{2}\.\d{4}$/.test(s)) return s;

  return s;
};

const toRFC3339BirthDate = (input: any): any => {
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
};

class ProfileService extends HttpClient {
  async getMe(): Promise<UserProfile> {
    const payload = await this.get<any>("/user/me");
    const root = extractRoot(payload);
    const data = root?.user ?? root?.User ?? root;

    const uuid = String(pick(data, ["uuid", "UUID", "Uuid"]) ?? "");

    const name = String(pick(data, ["name", "Name"]) ?? "");
    const second_name = String(pick(data, ["second_name", "secondName", "SecondName"]) ?? "");
    const patronymic = String(pick(data, ["patronymic", "Patronymic"]) ?? "");
    const gradebook_number = String(
        pick(data, ["gradebook_number", "gradebookNumber", "GradeBookNumber", "GradebookNumber"]) ?? ""
    );
    const birth_date = toDottedDate(pick(data, ["birth_date", "birthDate", "BirthDate"]) ?? "");
    const email = String(pick(data, ["email", "Email"]) ?? "");
    const phone_number = String(pick(data, ["phone_number", "phoneNumber", "PhoneNumber"]) ?? "");

    return {
      uuid,
      name,
      second_name,
      patronymic,
      gradebook_number,
      birth_date,
      email,
      phone_number,
      password: "",
    };
  }

  async updateMe(profile: CreateUser): Promise<void> {
    const body = {
      name: profile.name,
      second_name: profile.second_name,
      patronymic: profile.patronymic,
      gradebook_number: profile.gradebook_number,
      birth_date: toRFC3339BirthDate(profile.birth_date),
      email: profile.email,
      phone_number: profile.phone_number,
    };

    await this.put<any>("/user/me", body);
  }
}

export default ProfileService;
