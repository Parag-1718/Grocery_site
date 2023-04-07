import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Product18Service {

  constructor(
    private http:HttpClient
  ) { }

  //#region 
  base_url = environment.baseUrl
  
}
