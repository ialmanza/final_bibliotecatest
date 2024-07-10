
import { Component, OnInit } from '@angular/core';
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  providers: [LibrosServicioService],
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  errorMessage: string = '';
  editoriales = [
            'Signet Classic','Alba', 'Austral',
            'Penguin Classics', 'Debolsillo', 'Vintage Espaniol',
            'Planeta','Lumen', 'Vintage','Mariner Books',
            'Salamandra','Debate','Oxford University Press',
            'Molino', 'Plaza & Janes','Timun Mas','Roca Editorial',
            'Catedra'
  ]

  generos = [
            'Thriller','Cuentos fantásticos','Literatura infantil','Ciencia ficción distópica',
             'Realismo mágico','Historia','Literatura juvenil','Divulgación científica','Teatro',
             'Novela Inglesa', 'Novela Picaresca', 'Novela Histórica','Novela Psicológica', 'Novela de Misterio',
             'Novela Gótica', 'Novela realista', 'Novela de Ciencia Ficción', 'Novela Corta', 'Novela Educativa',
             'Novela de Terror', 'Novela Poesía', 'Novela Romántica', 'Ficción Clásica', 'Ficción Modernista',
             'Ficción Experimental'
  ]


  libro: any = {
      titulo: "",
      autor1: "",
      cant_pag: 500,
      isbn: "",
      anio: 1605,
      editorial: "",
      genero: "",
      campo_extra: "",
      autor2: "",
      autor3: ""
  };


  constructor(private librosService: LibrosServicioService, private router: Router, private dataService: DataService) {}

  ngOnInit() {
  }

  async addLibro() {
    if (this.getISBSNValidaCantidadDeDigitos()) {
      alert('Por favor verificar ISBN');
      return;
    }

    else if (this.verificarISBDValida()) {
      alert('Por favor verificar ISBN');
      return;
    }


    if (!this.libro.editorial || !this.libro.genero) {
      this.errorMessage = "No se pueden dejar campos vacíos para 'Editorial' o 'Género'.";
      return;
    }
    this.dataService.createItem(this.libro).subscribe(() => {
      this.getLibrosDB();
      this.libro = {};
    });


    this.libro = {
      titulo: "",
      autor1: "",
      cant_pag: "",
      isbn: "",
      anio: "",
      editorial: "",
      genero: "",
      campo_extra: "",
      autor2: "",
      autor3: ""
    };
  }


  getLibrosDB() {
    this.dataService.getItems().subscribe({
      next: (result) => {
        this.libro = result;

      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.addLibro();
    this.router.navigate(['/listar-tabla']);
  }

  onClick() {
    this.router.navigate(['/listar-tabla']);
  }


  verificarISBDValida() {
    const variable = this.dataService.verificarISBNDisponible(this.libro.isbn)
    return variable
  }

  getISBSNValidaCantidadDeDigitos() {
    const variable = this.dataService.validarISBN(this.libro.isbn)
    return variable
  }

}
