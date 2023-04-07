import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor(private http: HttpClient) {}

  //#region
  base_url = environment.baseUrl;
  encryption_url = environment.encryptionId;

  encryption(id: any) {
    try {
      return this.http.get<any>(this.base_url + this.encryption_url, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          'id': id,
        }),
      });
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
}
