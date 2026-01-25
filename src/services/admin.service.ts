import { AuthStore, AdminStore } from "@/stores";
import { AUTH_STORE, ADMIN_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";
import { HttpClient } from "./axios/HttpClient";
import { User } from "@/models/UserDto";

class AdminService extends HttpClient {
  private _authStore: AuthStore;
  private _adminStore: AdminStore;

  constructor() {
    super();
    this._authStore = Injector.get<AuthStore>(AUTH_STORE);
    this._adminStore = Injector.get<AdminStore>(ADMIN_STORE);
  }

  async getUsers(params?: any): Promise<User[]> {
    const users = await this.get<User[]>("/admin/users", { params });
    return users;
  }

  async createUser(userData: { name: string; email: string; password: string; role: string }): Promise<User> {
    const user = await this.post<User>("/admin/users", userData);
    return user;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const user = await this.put<User>(`/admin/users/${userId}`, userData);
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.delete(`/admin/users/${userId}`);
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<User> {
    const user = await this.patch<User>(`/admin/users/${userId}/status`, { isActive });
    return user;
  }
}

export default AdminService;