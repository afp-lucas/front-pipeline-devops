import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelResponsibility } from './model-responsibility.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelResponsibilityService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAllModelResponsibilities():Observable<ModelResponsibility[]>{
    const url = `${this.baseUrl}/model-responsibility`;
    return this.http.get<ModelResponsibility[]>(url);
  }
}
