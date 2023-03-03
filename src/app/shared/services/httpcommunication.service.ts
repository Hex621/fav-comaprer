import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpcommunicationService {

  constructor(private http: HttpClient) {

  }

  getResponseFromUrl(url: string) {
    return firstValueFrom(this.http.get(url));
  }


}
