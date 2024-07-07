import {Component, Input, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { DataService } from '../../services/data-service.service';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-ventana-modal-editar-libro',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, FormsModule, MatFormField, MatInputModule],
  templateUrl: './ventana-modal-editar-libro.component.html',
  styleUrl: './ventana-modal-editar-libro.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VentanaModalEditarLibroComponent {

  constructor(public dialog: MatDialog) {}
  openEditDialog(libro: any) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  }

  @Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'editar-libro.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, MatFormField, MatInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class DialogContentEditExampleDialog implements OnInit {

    @Input() libros: any = {};
    editing: any;

    form: FormGroup = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl(''),
      autor1: new FormControl(''),
      cant_pag: new FormControl(''),
      isbn: new FormControl(''),
      anio: new FormControl(''),
      editorial: new FormControl(''),
      genero: new FormControl(''),
      campo_extra: new FormControl(''),
      autor2: new FormControl(''),
      autor3: new FormControl(''),
    });

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
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VentanaModalEditarLibroComponent>, private dataService: DataService) {
      this.libros = JSON.stringify(data);
      console.log(this.data);
      console.log(this.libros);
      console.log(this.data[0])
      console.log(typeof this.libros);
    }


    ngOnInit(): void {
      this.form = new FormGroup({
        id: new FormControl(this.data[0]),
        titulo: new FormControl(this.data[1]),
        autor1: new FormControl(this.data[2]),
        cant_pag: new FormControl(this.data[5]),
        isbn: new FormControl(this.data[6]),
        anio: new FormControl(this.data[7]),
        editorial: new FormControl(this.data[8]),
        genero: new FormControl(this.data[9]),
        campo_extra: new FormControl(this.data[10]),
        autor2: new FormControl(this.data[3]),
        autor3: new FormControl(this.data[4]),
      })
      console.log(this.form.value);
      console.log("TIPO DE DATO FORMULARIO",typeof this.form.value);
      console.log("ID DEL FORMULARIO",this.form.value.id);
      const librosJson = JSON.stringify(this.form.value);
      console.log(librosJson);
    }
    onNoClick(): void {
      this.dialogRef.close(false);
    }

    onYesClick(): void {
      this.dialogRef.close(true);
    }

    toggleEdit() {
      this.editing = !this.editing;
      console.log(`Editing: ${this.editing}`); // Agregado para debug
    }

    saveChanges() {
      if (this.libros) {
        const librosJson = JSON.stringify(this.form.value);
        this.dataService.updateItem(this.form.value.id, librosJson).subscribe(() => {
          this.dialogRef.close(true);
        });
      }

    }
  }

// import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { DataService } from '../../services/data-service.service';
// import { MatInputModule } from '@angular/material/input';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// @Component({
//   selector: 'app-ventana-modal-editar-libro',
//   standalone: true,
//   imports: [MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
//   templateUrl: './ventana-modal-editar-libro.component.html',
//   styleUrls: ['./ventana-modal-editar-libro.component.css'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class VentanaModalEditarLibroComponent {

//   constructor(public dialog: MatDialog) {}

//   openEditDialog(libro: any) {
//     const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
//       data: libro
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
// }

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'editar-libro.html',
//   standalone: true,
//   imports: [MatDialogModule, MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class DialogContentEditExampleDialog implements OnInit {

//   form: FormGroup;

//   editoriales = [
//     'Signet Classic', 'Alba', 'Austral',
//     'Penguin Classics', 'Debolsillo', 'Vintage Espaniol',
//     'Planeta', 'Lumen', 'Vintage', 'Mariner Books',
//     'Salamandra', 'Debate', 'Oxford University Press',
//     'Molino', 'Plaza & Janes', 'Timun Mas', 'Roca Editorial',
//     'Catedra'
//   ];

//   generos = [
//     'Thriller', 'Cuentos fantásticos', 'Literatura infantil', 'Ciencia ficción distópica',
//     'Realismo mágico', 'Historia', 'Literatura juvenil', 'Divulgación científica', 'Teatro',
//     'Novela Inglesa', 'Novela Picaresca', 'Novela Histórica', 'Novela Psicológica', 'Novela de Misterio',
//     'Novela Gótica', 'Novela realista', 'Novela de Ciencia Ficción', 'Novela Corta', 'Novela Educativa',
//     'Novela de Terror', 'Novela Poesía', 'Novela Romántica', 'Ficción Clásica', 'Ficción Modernista',
//     'Ficción Experimental'
//   ];

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentEditExampleDialog>, private dataService: DataService) {
//     this.form = new FormGroup({
//       titulo: new FormControl(''),
//       autor1: new FormControl(''),
//       cant_pag: new FormControl(''),
//       isbn: new FormControl(''),
//       anio: new FormControl(''),
//       editorial: new FormControl(''),
//       genero: new FormControl(''),
//       campo_extra: new FormControl(''),
//       autor2: new FormControl(''),
//       autor3: new FormControl(''),
//     });
//     console.log('Datos recibidos:', this.data);
//   }

//   ngOnInit(): void {
//     if (this.data) {
//       this.form.patchValue({
//         titulo: this.data.titulo,
//         autor1: this.data.autor1,
//         cant_pag: this.data.cant_pag,
//         isbn: this.data.isbn,
//         anio: this.data.anio,
//         editorial: this.data.editorial,
//         genero: this.data.genero,
//         campo_extra: this.data.campo_extra,
//         autor2: this.data.autor2,
//         autor3: this.data.autor3,
//       });
//     }
//   }

//   onNoClick(): void {
//     this.dialogRef.close(false);
//   }

//   onYesClick(): void {
//     if (this.form.valid) {
//       this.dialogRef.close(this.form.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   saveChanges() {
//     const updatedLibro = this.form.value;
//     this.dataService.updateItem(updatedLibro.id, JSON.stringify(updatedLibro)).subscribe(() => {
//       this.dialogRef.close(true);
//     });
//   }
// }
