import { Inject, Injectable } from "@angular/core";
import { createStorage } from "@azlabsjs/secure-web-storage";
import { STORAGE_SECRET } from "./constants";
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  public storage = createStorage(window.localStorage, STORAGE_SECRET);

  constructor() {}

  setItem(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data));
  }
  getItem(key: string) {
    return this.storage.getItem(key);
  }
  deleteItem(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
  length() {
    return this.storage.length;
  }

  parse(data: string | null) {
    return data !== null ? JSON.parse(data) : {};
  }

  stringify(data: object) {
    return JSON.stringify(data);
  }
}
