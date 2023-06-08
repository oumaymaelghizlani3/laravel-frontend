import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dialog1-demand',
  templateUrl: './dialog1-demand.component.html',
  styleUrls: ['./dialog1-demand.component.css']
})
export class Dialog1DemandComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private httpClient: HttpClient,private datePipe: DatePipe) {}
  enregistrer(): void {
    this.data.date = this.datePipe.transform(this.data.date, 'yyyy-MM-dd');

    const params = this.data; // Copiez les données dans un nouvel objet
  
    this.httpClient.get('http://127.0.0.1:8000/enregistrementsDm/' + params.id, { params }).subscribe({
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
    this.data.num_projet='';
    this.data.type='';
    this.data.titre='';
    this.data.chef='';
    this.data.statut='';
    this.data.date_creat='';
    this.data.date_valid='';
    this.data.etude_tec='';
    this.data.confirm='';
    this.data.montant='';
    this.data.acheteur='';
    this.data.statut_a='';
    this.data.observation='';
    this.data.OI='';
  }

}
