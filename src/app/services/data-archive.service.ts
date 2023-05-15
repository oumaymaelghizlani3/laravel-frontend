import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { Fournisseur } from '../fournisseur/fournisseur.component';





@Injectable({
  providedIn: 'root'
})
export class DataArchiveService {

  useradata:any;
  private API_URL=environment.API_URL;
  sort: any;
  paginator: any;
  fournisseur: any;
  constructor(private httpRequeste:HttpClient){}

  getFournisseur():Observable<Fournisseur[]>{
    return this.httpRequeste.get<Fournisseur[]>(this.API_URL+'fournisseur');
  }
  addFournisseur(data:any){  
    return this.httpRequeste.post(this.API_URL+'addfournisseur',data, {
      headers: {
        'Access-Control-Allow-Origin': 'https://localhost:4200',
      }
    });
  }


  
}
