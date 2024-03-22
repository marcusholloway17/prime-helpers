import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public config = {
    uploadUrl: environment.storage.endpoints.updload,
    clientId: environment.storage.client_id,
    clientSecret: environment.storage.client_secret,
    parent: environment.storage.parent,
    volume: environment.storage.volume,
  };
  public headers = new HttpHeaders()
    .set('x-client-id', this.config.clientId)
    .set('x-client-secret', this.config.clientSecret);

  constructor() {}
}
