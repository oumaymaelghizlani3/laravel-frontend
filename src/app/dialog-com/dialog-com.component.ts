import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Commande } from './commande';
import { DataArchiveService } from '../services/data-archive.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-com',
  templateUrl: './dialog-com.component.html',
  styleUrls: ['./dialog-com.component.css']
})
export class DialogComComponent {

  constructor(private datePipe: DatePipe,private dataService:DataArchiveService,private httpRequeste:HttpClient){}
  ngOnInit(): void {
   
  }
 commandobj=new Commande;

addCommande1() {  
  const url = 'http://127.0.0.1:8000/addcommande';
  this.commandobj.date = this.datePipe.transform(this.commandobj.date, 'yyyy-MM-dd');
  const params = new HttpParams()
    .set('num_commande', this.commandobj.num_commande)
    .set('service', this.commandobj.service)
    .set('type_command', this.commandobj.type_command)
    .set('date', this.commandobj.date)
    .set('fornisseur', this.commandobj.fornisseur);
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
    this.commandobj.num_commande='';
    this.commandobj.service='';
    this.commandobj.type_command='';
    this.commandobj.date='';
    this.commandobj.fornisseur='';
  }

}
