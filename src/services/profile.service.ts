import { User } from "@/models/User";
import { HttpClient } from "./axios/HttpClient";
import ProfileStore from "@/stores/profile.store";
import Injector from "@/utils/injector";
import { PROFILE_STORE } from "@/stores/identifiers";
import { toDottedDate, toRFC3339BirthDate } from "@/utils/date";


class ProfileService extends HttpClient {
  private static instance: ProfileService;
  private _profileStore: ProfileStore;

  constructor() {
    super();
    this._profileStore = Injector.get<ProfileStore>(PROFILE_STORE);
  }

  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  getProfile(): Promise<User> {
    this._profileStore.setLoading(true);
    
    return this.get<User>("/user/me")
      .then(response => {

        const birth_date = toDottedDate(response.birth_date);

        const profile ={ 
          ...response,
          birth_date
        }

        this._profileStore.setProfile(profile);
        return profile;
      })
      .catch(error => {
        console.error("Error loading profile:", error);
        throw error;
      })
      .finally(() => {
        this._profileStore.setLoading(false);
      });
  }

  updateProfile(profile: User): Promise<void> {
    this._profileStore.setLoading(true);
    const body = {
      ...profile,
      birth_date: toRFC3339BirthDate(profile.birth_date),
    };

    return this.put<any>(`/user/me`, body)
      .then((response) => {
        this.getProfile();
        return response;
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        throw error;
      })
      .finally(() => {
        this._profileStore.setLoading(false);
      });
  }
}

export default ProfileService;