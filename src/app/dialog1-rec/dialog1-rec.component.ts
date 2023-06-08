
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog1-rec',
  templateUrl: './dialog1-rec.component.html',
  styleUrls: ['./dialog1-rec.component.css']
})
export class Dialog1RecComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private httpClient: HttpClient) {}
  enregistrer(): void {
    const params = this.data; // Copiez les données dans un nouvel objet
  
    this.httpClient.get('http://127.0.0.1:8000/enregistrementsRec/' + params.id, { params }).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
    this.resetFields();
  }
  resetFields() {
    this.data.famille='';
    this.data.demandeur='';
    this.data.CG='';
    this.data.designation='';
    this.data.numCDE='';
    this.data.date='';
    this.data.designation2='';
    this.data.fournisseur='';
    this.data.montant='';
    this.data.montanteng='';
  }
}
