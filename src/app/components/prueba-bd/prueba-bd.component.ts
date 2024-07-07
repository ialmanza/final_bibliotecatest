import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba-bd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DataService],
  templateUrl: './prueba-bd.component.html',
  styleUrl: './prueba-bd.component.css'
})
export class PruebaBdComponent implements OnInit {
  libros: any[] = [];
  paginatedLibros: any[] = [];
  nuevoLibro: any = {};
  libroEditado: any = {};
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getLibrosDB();
  }

  getLibrosDB() {
    this.dataService.getItems().subscribe({
      next: (result) => {
        this.libros = result;
        this.updatePagination();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addItem() {
    this.dataService.createItem(this.nuevoLibro).subscribe(() => {
      this.getLibrosDB();
      this.nuevoLibro = {};
    });
  }

  editItem(libro: any) {
    this.libroEditado = { ...libro };
  }

  updateItem() {
    this.dataService.updateItem(this.libroEditado[0], this.libroEditado).subscribe(() => {
      this.getLibrosDB();
      this.libroEditado = {};
    });
  }

  deleteItem(id: number) {
    this.dataService.deleteItem(id).subscribe(() => {
      this.getLibrosDB();
    });
  }

  filterLibros() {
    const filteredLibros = this.libros.filter(libro =>
      Object.values(libro).some(val => val && val.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.updatePagination(filteredLibros);
  }

  updatePagination(libros: any[] = this.libros) {
    this.totalPages = Math.ceil(libros.length / this.itemsPerPage);
    this.paginatedLibros = libros.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
