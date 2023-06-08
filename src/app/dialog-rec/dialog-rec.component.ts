import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

import { DataArchiveService } from '../services/data-archive.service';
import { Reception } from './reception';

@Component({
  selector: 'app-dialog-rec',
  templateUrl: './dialog-rec.component.html',
  styleUrls: ['./dialog-rec.component.css']
})
export class DialogRecComponent {
  constructor(private dataService:DataArchiveService,private httpRequeste:HttpClient){}
  ngOnInit(): void {
  }
 receptionobj=new Reception;
addReception1() {  
  const url = 'http://127.0.0.1:8000/addreception';
  const params = new HttpParams()
    .set('famille', this.receptionobj.famille)
    .set('demandeur', this.receptionobj.demandeur)
    .set('CG', this.receptionobj.CG)
    .set('designation', this.receptionobj.designation)
    .set('numCDE', this.receptionobj.numCDE)
    .set('date', this.receptionobj.date)
    .set('designation2', this.receptionobj.designation2)
    .set('fournisseur', this.receptionobj.fournisseur)
    .set('montant', this.receptionobj.montant)
    .set('montanteng', this.receptionobj.montanteng);

  this.httpRequeste.get(url, { params })
  .subscribe({
    next: (response: any) => {
      console.log(response);
    },
    error: (error: any) => {
      console.error(error);
    }
  });
  this.resetFields();
}
  resetFields() {
    this.receptionobj.famille='';
    this.receptionobj.demandeur='';
    this.receptionobj.CG='';
    this.receptionobj.designation='';
    this.receptionobj.numCDE='';
    this.receptionobj.date='';
    this.receptionobj.designation2='';
    this.receptionobj.fournisseur='';
    this.receptionobj.montant='';
    this.receptionobj.montanteng='';
  

  }
}
