import { Component, Input} from '@angular/core';
import { LibroComponent } from "../libro/libro.component";
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-libro/ventana-modal-editar-libro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal/ventana-modal.component';
import { DataService } from '../../services/data-service.service';


@Component({
  selector: 'app-editar-libro',
  standalone: true,
  imports: [ LibroComponent, CommonModule, FormsModule, FilterPipe, DialogContentEditExampleDialog, DialogAnimationsExampleDialog],
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {
  @Input() libros: any = {};
  librosss: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';
  displayedLibros: any[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  constructor(private librosServicio: LibrosServicioService, private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.getLibrosDB();
  }

  getLibrosDB() {
    this.dataService.getItems().subscribe((libros: any = {}) => {
      this.librosss = libros;
      this.filteredLibros = libros;
      this.totalItems = libros.length;
      this.updateDisplayedLibros();
    });
  }

  filter(query: string) {
    this.filteredLibros = this.librosss.filter(libro =>
      Object.values(libro).some(val => val && val.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();

  }


  updateDisplayedLibros() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedLibros = this.filteredLibros.slice(start, end);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedLibros();
  }

  nextPage() {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateDisplayedLibros();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedLibros();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }


  openEditDialog(libro: any = {}) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: libro
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const librosJson = JSON.stringify(libro);
        this.dataService.updateItem(parseInt(libro.id,10), librosJson).subscribe(() => {
          this.getLibrosDB();
        });
      }
    });
  }

  deleteLibro(libro: Libro) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteItem(parseInt(libro.id,10)).subscribe(() => {
          this.getLibrosDB();
        });
      }
    });
  }



}

