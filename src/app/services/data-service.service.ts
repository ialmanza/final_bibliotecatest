import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://maxipanza.com/libros'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post('https://maxipanza.com/ingresar_libro', item);
  }

  updateItem(id: number, item: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${'https://maxipanza.com/modificar'}/${id}`, item, { headers: header });
  }

  deleteItem(id: number): Observable<void> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<void>(`${'https://maxipanza.com/borrar_libro'}/${id}`, null, { headers: header });
  }

  // verificarISBNDisponible(isbn: string): Observable<boolean> {
  //   const encontrada = this.getItems().pipe(
  //     map((storedLibros: { isbn: string; }[]) => storedLibros.some((libro: { isbn: string; }) => libro.isbn === isbn))
  //   );

  //   if(encontrada)
  //   {
  // }

}
