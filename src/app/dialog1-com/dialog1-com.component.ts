import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog1-com',
  templateUrl: './dialog1-com.component.html',
  styleUrls: ['./dialog1-com.component.css']
})
export class Dialog1ComComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private httpClient: HttpClient,private datePipe: DatePipe) {}
  enregistrer(): void {
    this.data.date = this.datePipe.transform(this.data.date, 'yyyy-MM-dd');

    const params = this.data; // Copiez les données dans un nouvel objet
  
    this.httpClient.get('http://127.0.0.1:8000/enregistrementsCm/' + params.id, { params }).subscribe({
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
    this.data.num_commande='';
    this.data.service='';
    this.data.type_command='';
    this.data.date='';
    this.data.fornisseur='';
  }

}
