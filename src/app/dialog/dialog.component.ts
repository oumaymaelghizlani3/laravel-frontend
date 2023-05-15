import { Component, OnInit } from '@angular/core';
import { FormControl, Validators ,FormGroup, FormBuilder} from '@angular/forms';
import { DataArchiveService } from '../services/data-archive.service';
import { HttpClient } from '@angular/common/http';
import { Fournisseur } from './fournisseur.model';
import { FournisseurComponent } from '../fournisseur/fournisseur.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  constructor(private dataService:DataArchiveService){}
 fournisseurrobj=new Fournisseur;

addFournisseur() {
  this.dataService.addFournisseur(this.fournisseurrobj).subscribe(res=>{
   console.log(this.fournisseurrobj)
  });

}

  ngOnInit(): void {

  }



}


