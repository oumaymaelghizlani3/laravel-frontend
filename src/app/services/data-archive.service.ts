import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { Fournisseur } from '../fournisseur/fournisseur.component';
import { Commande } from '../commande/commande.component';
import { Livraison } from '../livraison/livraison.component';
import { Reception } from '../reception/reception.component';
import { Demande } from '../demande/demande.component';






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

  deleteFournisseur(id: number): Observable<any> {
    const url = `${this.API_URL}deleteFournisseur/${id}`;
    return this.httpRequeste.get(url);
  }
  getCommand():Observable<Commande[]>{
    return this.httpRequeste.get<Commande[]>(this.API_URL+'commande');
  }

  deleteCommand(id: number): Observable<any> {
    const url = `${this.API_URL}deleteCommande/${id}`;
    return this.httpRequeste.get(url);
  }
  getLivraison():Observable<Livraison[]>{
    return this.httpRequeste.get<Livraison[]>(this.API_URL+'livraison');
  }

  deleteLivraison(id: number): Observable<any> {
    const url = `${this.API_URL}deleteLivraison/${id}`;
    return this.httpRequeste.get(url);
  }
  getReception():Observable<Reception[]>{
    return this.httpRequeste.get<Reception[]>(this.API_URL+'reception');
  }
  deleteReception(id: number): Observable<any> {
    const url = `${this.API_URL}deleteReception/${id}`;
    return this.httpRequeste.get(url);
  }
  getDemande():Observable<Demande[]>{
    return this.httpRequeste.get<Demande[]>(this.API_URL+'demande');
  }
  deleteDemand(id: number): Observable<any> {
    const url = `${this.API_URL}deleteDemand/${id}`;
    return this.httpRequeste.get(url);
  }
  
}
