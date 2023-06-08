import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private httpClient: HttpClient) {}
  enregistrer(): void {
    const params = this.data; // Copiez les données dans un nouvel objet
  
    this.httpClient.get('http://127.0.0.1:8000/enregistrements/' + params.id, { params }).subscribe({
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
    this.data.nom='';
    this.data.email='';
    this.data.adresse='';
    this.data.commande='';
    this.data.contrat='';
  }

}
