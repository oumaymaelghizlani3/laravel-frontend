import { Component, OnInit } from '@angular/core';
import { FormControl, Validators ,FormGroup, FormBuilder} from '@angular/forms';
import { DataArchiveService } from '../services/data-archive.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Fournisseur } from './fournisseur.model';
import { FournisseurComponent } from '../fournisseur/fournisseur.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  constructor(private dataService:DataArchiveService,private httpRequeste:HttpClient){}
  ngOnInit(): void {
  }
 fournisseurrobj=new Fournisseur;
/*addFournisseur1() {  
  this.httpRequeste.get('http://127.0.0.1:8000/'+'addfournisseur/'+this.fournisseurrobj)
    console.log(this.fournisseurrobj)
}
*/
addFournisseur1() {  
  const url = 'http://127.0.0.1:8000/addfournisseur';
  const params = new HttpParams()
    .set('nom', this.fournisseurrobj.nom)
    .set('email', this.fournisseurrobj.email)
    .set('adresse', this.fournisseurrobj.adresse)
    .set('commande', this.fournisseurrobj.commande)
    .set('contrat', this.fournisseurrobj.contrat);
  this.httpRequeste.get(url, { params })
  .subscribe({
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
    this.fournisseurrobj.nom='';
    this.fournisseurrobj.email='';
    this.fournisseurrobj.adresse='';
    this.fournisseurrobj.commande='';
    this.fournisseurrobj.contrat='';
  }




}