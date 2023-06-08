import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Livraison } from './livraison';
import { DataArchiveService } from '../services/data-archive.service';

@Component({
  selector: 'app-dialog-liv',
  templateUrl: './dialog-liv.component.html',
  styleUrls: ['./dialog-liv.component.css']
})
export class DialogLivComponent {
  constructor(private dataService:DataArchiveService,private httpRequeste:HttpClient){}
  ngOnInit(): void {
  }
 livraisonobj=new Livraison;

addLivraison1() {  
  const url = 'http://127.0.0.1:8000/addlivraison';
  const params = new HttpParams()
    .set('fournisseur', this.livraisonobj.fournisseur)
    .set('service', this.livraisonobj.service)
    .set('date', this.livraisonobj.date)
    .set('quantite', this.livraisonobj.quantite)
    .set('prix', this.livraisonobj.prix)
    .set('num_livraison', this.livraisonobj.num_livraison)
    .set('num_commande', this.livraisonobj.num_commande)

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
    this.livraisonobj.fournisseur='';
    this.livraisonobj.service='';
    this.livraisonobj.date='';
    this.livraisonobj.num_commande='';
    this.livraisonobj.prix='';
    this.livraisonobj.quantite='';
    this.livraisonobj.num_livraison='';

  }
}
