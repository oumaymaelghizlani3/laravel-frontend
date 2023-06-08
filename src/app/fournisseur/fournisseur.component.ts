import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { Dialog1Component } from '../dialog1/dialog1.component';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dialog1ComComponent } from '../dialog1-com/dialog1-com.component';

export interface Fournisseur {
  id:number;
  nom: string;
  adresse: string;
  email: string;
  contrat: string;
  commande: string;
  telephone: string;
}


@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit,AfterViewInit {
  
  dataSource: MatTableDataSource<Fournisseur> = new MatTableDataSource<Fournisseur>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['id','nom', 'adresse','email','commande','contrat','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  static ngOnInit: any;
    data1:any;
id!: number;
  constructor(private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ,private httpRequeste:HttpClient,){}
  ngOnInit(): void {
this.showFournisseur();

  }
  showFournisseur(){
    this.dataService.getFournisseur().subscribe((response: Fournisseur[]) => {
 this.dataSource = new MatTableDataSource<Fournisseur>(response);
 this.dataSource.paginator = this.paginator;
});
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'90%',
     height:'75%',
     panelClass: 'dialog-border'    
    });
  }
  deleteData(id: number) {
    this.dataService.deleteFournisseur(id).subscribe({next: response => {
      console.log(response); // Success message
      this.showFournisseur();
    },
    error: error => {
      console.error(error);
    }
  
  });
}

ouvrirDialogueEdition(id: number): void {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrement/' + id).subscribe((data: any) => {
    const dialogRef = this.dialog.open(Dialog1Component, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequeste.put('http://127.0.0.1:8000/enregistrement/' + id, result).subscribe(() => {
          // Affichez un message de succès ou effectuez d'autres actions nécessaires
        });
      }
    });
  });
}
showPDF: boolean = false;

openContratPDF(url: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.click();
}
}
