import { Component } from '@angular/core';
import { LibroComponent } from "../libro/libro.component";
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-libro/ventana-modal-editar-libro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal/ventana-modal.component';
import 'flowbite';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import * as XLSX from 'xlsx';
import { DataService } from '../../services/data-service.service';


interface FoodNode {
  name: string;
  children?: FoodNode[];
  showMenu?: boolean; // Añadido
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Editorial',
    children: [{name: 'Signet Classic'}, {name: 'Alba'}, {name: 'Austral'},
               {name: 'Penguin Classics'}, {name: 'Debolsillo'}, {name: 'Vintage Espaniol'},
               {name: 'Planeta'}, {name: 'Lumen'}, {name: 'Vintage'}, {name: 'Mariner Books'},
               {name: 'Salamandra'}, {name: 'Debate'}, {name: 'Oxford University Press'},
               {name: 'Molino'}, {name: 'Plaza & Janes'}, {name: 'Timun Mas'}, {name: 'Roca Editorial'},
               {name: 'Catedra'}],
  },
  {
    name: 'Genero',
    children: [
      {
        name: 'Thriller'
      },
      {
        name: 'Cuentos fantásticos'
      },
      {
        name: 'Literatura infantil'
      },
      {
        name: 'Ciencia ficción distópica'
      },
      {
        name: 'Realismo mágico'
      },
      {
        name: 'Novelas',
        children: [{name: 'Inglesa'}, {name: 'Picaresca'},{name: 'Histórica'},{name: 'Psicológica'},{name: 'Aventuras'},{name: 'Misterio'},
          {name: 'Gótica'}, {name: 'Realista'}, {name: 'Ciencia Ficción'}, {name: 'Corta'}, {name: 'Educativa'}, {name: 'Poesia'}, {name: 'Romantica'}, {name: 'Terror'}
        ],
      },
      {
        name: 'Historia'
      },
      {
        name: 'Literatura juvenil'
      },
      {
        name: 'Ficción',
        children: [{name: 'Clásica'}, {name: 'Modernista'}, {name: 'Experimental'}],
      },
      {
        name: 'Divulgación científica'
      },
      {
        name: 'Fantasía'
      },
      {
        name: 'Teatro'
      },


    ],
  },
];


@Component({
    selector: 'app-busqueda-de-libros-campo',
    standalone: true,
    templateUrl: './busqueda-de-libros-campo.component.html',
    styleUrl: './busqueda-de-libros-campo.component.css',
    imports: [LibroComponent, CommonModule, FormsModule, FilterPipe, DialogContentEditExampleDialog, DialogAnimationsExampleDialog,
      MatTreeModule, MatIconModule, MatButtonModule],
})
export class BusquedaDeLibrosCampoComponent {
  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';
  displayedLibros: any[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  shoeMenu?: boolean = false;

  constructor(private librosServicio: LibrosServicioService, private dialog: MatDialog, private dataService: DataService) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    this.getLibrosDB();
  }

  getLibrosDB() {
    this.dataService.getItems().subscribe((libros: Libro[]) => {
      this.libros = libros;
      this.filteredLibros = libros;
      this.totalItems = libros.length;
      this.updateDisplayedLibros();
    });
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  filter(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
      libro.editorial && libro.editorial.toLowerCase().includes(query.toLowerCase()));
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }

  filterTitulo(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
     libro.titulo && libro.titulo.toLowerCase().includes(query.toLowerCase())
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


  onNodeClick(event: MouseEvent,node: FoodNode) {
    const lastWord = node.name.split(' ').pop();
    if (lastWord) {
      this.search(lastWord);
    }
  }

  search(term: string) {
    console.log(`Searching for: ${term}`);
    this.filteredLibros = this.libros.filter(libro =>
      Object.values(libro).some(val => val && val.toString().toLowerCase().includes(term.toLowerCase()))
    );
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();

  }

  showMenu(node: FoodNode) {
    node.showMenu = true;
  }

  hideMenu(node: FoodNode) {
    node.showMenu = false;
  }

  mostrarTodos() {
    this.filteredLibros = this.libros;
    this.totalItems = this.libros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }

  // exportToExcel(): void {
  //   const filteredData = this.filteredLibros.map(libro => {
  //     const { titulo, isbn, autor1, autor2, autor3, anio, editorial, genero, cant_pag, campo_extra, ...rest } = libro;
  //     return {
  //       Título: titulo,
  //       ISBN: isbn,
  //       'Primer autor': primerautor,
  //       'Segundo autor': segundoautor,
  //       'Tercer autor': tercerautor,
  //       'Fecha de publicación': fechapublicacion,
  //       Editorial: editorial,
  //       Género: genero,
  //       Páginas: paginas,
  //       'Campo adicional': descripcion
  //     };
  //   });
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Libros');
  //   XLSX.writeFile(wb, 'Libros.xlsx');
  // }

}
