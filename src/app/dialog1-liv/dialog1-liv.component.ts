import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog1-liv',
  templateUrl: './dialog1-liv.component.html',
  styleUrls: ['./dialog1-liv.component.css']
})
export class Dialog1LivComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private httpClient: HttpClient) {}
  enregistrer(): void {
    const params = this.data; // Copiez les données dans un nouvel objet
  
    this.httpClient.get('http://127.0.0.1:8000/enregistrementsLiv/' + params.id, { params }).subscribe({
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
    this.data.fournisseur='';
    this.data.service='';
    this.data.date='';
    this.data.num_commande='';
    this.data.num_livraison='';
    this.data.num_prix='';
    this.data.num_quantite='';
  
  }

}
