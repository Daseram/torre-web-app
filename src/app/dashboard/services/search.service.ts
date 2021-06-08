import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchOpportunity(searchValue) {
    const url = 'https://search.torre.co/opportunities/_search?size=10&aggregate=false&offset=0';
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, searchValue);
  }

  searchPeople(searchValue) {
    const url = 'https://search.torre.co/people/_search/?[offset=0&size=10&aggregate=false';
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, searchValue);
  }

  getJobById(id: string) {
    const url = `https://torre.co/api/opportunities/${id}`;
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(url);
  }
}
