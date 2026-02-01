import { ApiResponse } from "@/models/Api";
import { User } from "@/models/User";
import { makeAutoObservable } from "mobx";

class RaitingStore {
  private _isLoading: boolean = false;
  private _users: ApiResponse<User[]> | null = null;
  private _winnerQuantuty: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }
  
  get winnerQuantity() {
    return this._winnerQuantuty;
  }

  get allUsers() {
    return this._users;
  }

  setLoading = (loading: boolean) => {
    this._isLoading = loading;
  }

  setWinnerQuantity = (data: number) => {
    this._winnerQuantuty = data;
  }

  setUsers = (data: ApiResponse<User[]>) => {
    this._users = data;
  }

  clearStore() {
    this._isLoading = false;
    this._users = null;
    this._winnerQuantuty = null;
  }
}

export default RaitingStore;