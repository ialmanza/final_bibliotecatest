import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://23.22.176.154:5000/libros'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post('http://23.22.176.154:5000/ingresar_libro', item);
  }

  updateItem(id: number, item: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${'http://23.22.176.154:5000/modificar'}/${id}`, item, { headers: header });
  }

  deleteItem(id: number): Observable<void> {
    return this.http.post<void>(`${'http://23.22.176.154:5000/borrar_libro'}/${id}`, null);
  }
}
