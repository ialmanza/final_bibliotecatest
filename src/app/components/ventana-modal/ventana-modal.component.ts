import {Component, Inject, Input, OnInit} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ventana-modal',
  styleUrl: './ventana-modal.component.css',
  templateUrl: './ventana-modal.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './ventana-modal.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog implements OnInit {
  @Input() libros: any = {};

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

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.libros = JSON.stringify(data);
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
    console.log("DATA:",this.data);
    console.log("FORMULARIO:",this.form.value);
    console.log("TIPO DE DATO DEL FORM:",typeof this.form.value);

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(this.form.value);
  }


}
