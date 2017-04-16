import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getProjects(): Observable<any> {
    return this.http.get('/api/projects').map(res => res.json());
  }

  countProjects(): Observable<any> {
    return this.http.get('/api/projects/count').map(res => res.json());
  }

  addProject(project): Observable<any> {
    return this.http.post('/api/project', JSON.stringify(project), this.options);
  }

  getProject(id): Observable<any> {
    return this.http.get(`/api/project/${id}`).map(res => res.json());
  }

  editProject(project): Observable<any> {
    return this.http.put(`/api/project/${project._id}`, JSON.stringify(project), this.options);
  }

  deleteProject(id): Observable<any> {
    return this.http.delete(`/api/project/${id}`, this.options);
  }

}
