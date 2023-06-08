
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { DatePipe } from '@angular/common';
import { Demande } from './demande';
@Component({
  selector: 'app-dialog-demand',
  templateUrl: './dialog-demand.component.html',
  styleUrls: ['./dialog-demand.component.css']
})
export class DialogDemandComponent {
  constructor(private datePipe: DatePipe,private dataService:DataArchiveService,private httpRequeste:HttpClient){}
  ngOnInit(): void {
   
  }
 commandobj=new Demande;

 addDemand1() {  
  const url = 'http://127.0.0.1:8000/addDemand';
  this.commandobj.date_creat = this.datePipe.transform(this.commandobj.date_creat, 'yyyy-MM-dd');
  this.commandobj.date_valid = this.datePipe.transform(this.commandobj.date_valid, 'yyyy-MM-dd');
  const params = new HttpParams()
    .set('num_projet', this.commandobj.num_projet)
    .set('type', this.commandobj.type)
    .set('titre', this.commandobj.titre)
    .set('chef', this.commandobj.chef)
    .set('statut', this.commandobj.statut)
    .set('date_creat', this.commandobj.date_creat)
    .set('date_valid', this.commandobj.date_valid)
    .set('etude_tec', this.commandobj.etude_tec)
    .set('confirm', this.commandobj.confirm)
    .set('montant', this.commandobj.montant)
    .set('acheteur', this.commandobj.acheteur)
    .set('statut_a', this.commandobj.statut_a)
    .set('observation', this.commandobj.observation)
    .set('OI', this.commandobj.OI);
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
    this.commandobj.num_projet='';
    this.commandobj.type='';
    this.commandobj.titre='';
    this.commandobj.chef='';
    this.commandobj.statut='';
    this.commandobj.date_creat='';
    this.commandobj.date_valid='';
    this.commandobj.etude_tec='';
    this.commandobj.confirm='';
    this.commandobj.montant='';
    this.commandobj.acheteur='';
    this.commandobj.statut_a='';
    this.commandobj.observation='';
    this.commandobj.OI='';

  }
}
