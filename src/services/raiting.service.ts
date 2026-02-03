import { ApiResponse } from '@/models/Api';
import { AuthStore, RaitingStore } from "@/stores";
import { AUTH_STORE, RAITING_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";
import { User } from "@/models/User";

class RaitingService extends HttpClient {
  private static instance: RaitingService;
  private _raitingStore: RaitingStore;

  constructor() {
    super();
    this._raitingStore = Injector.get<RaitingStore>(RAITING_STORE);
  }

  static getInstance(): RaitingService {
    if (!RaitingService.instance) {
      RaitingService.instance = new RaitingService();
    }
    return RaitingService.instance;
  }

 async getAllUsers(search?: string, valid?: boolean, winners?: boolean, limit?: number, offset?: number): Promise<ApiResponse<User[]>> {
    const params = { search, winners, valid, limit, offset }
    this._raitingStore.setLoading(true);
    return this.post<ApiResponse<User[]>>(`/rating`, {...params})
    .then((response) => {
      this._raitingStore.setUsers(response);
      return response;
    })
    .catch((error: Error) => {
        console.error(`Error get all users`, error);
        throw error;
    })
    .finally(() => this._raitingStore.setLoading(false));
  }

  async getWinnerQuantity(): Promise<number> {
    return this.get<any>(`/constant/grades_amount`)
    .then((response) => {
        this._raitingStore.setWinnerQuantity(response.data.constant);
        return response.data.constant;
    })
    .catch((error: Error) => {
        console.error(`Error get winner quantity`, error);
        throw error;
    });
  }

  async updateWinnerQuantity(value: number): Promise<any> {
    return this.put<any>(`constant/grades_amount`, { constant: String(value) })
    .then((response) => {
        return response.data;
    })
    .catch((error: Error) => {
        console.error(`Error update winner quantity`, error);
        throw error;
    });
  }
  
  async verifyUser(userUuid: string): Promise<any> {
    return this.put(`/user/approve/${userUuid}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: Error) => {
        console.error(`Error approve user ${userUuid}:`, error);
        throw error;
      })
  }

  async unverifyUser(userUuid: string): Promise<any> {
    return this.put(`/user/decline/${userUuid}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: Error) => {
        console.error(`Error decline user ${userUuid}:`, error);
        throw error;
      });
  }
}

export default RaitingService;