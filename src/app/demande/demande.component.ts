import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComComponent } from '../dialog-com/dialog-com.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Dialog1ComComponent } from '../dialog1-com/dialog1-com.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogDemandComponent } from '../dialog-demand/dialog-demand.component';
import { Dialog1DemandComponent } from '../dialog1-demand/dialog1-demand.component';

export interface Demande {
  id:number;
  num_projet:string;
  type:string;
  titre:string;
  chef:String;
  statut:string;
  date_creat:Date;
  date_valid:Date;
  etude_tec:Text;
  confirm:string;
  montant:number;
  acheteur:string;
  statut_a:string;
  observation:Text;
  OI:string;

}


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit,Demande,AfterViewInit  {
  dataSource: MatTableDataSource<Demande> = new MatTableDataSource<Demande>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['num_projet', 'type','titre','chef','statut','date_creat','date_valid','etude_tec','confirm','montant','acheteur','statut_a','observation','OI','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
    data1:any;
   id!: number;
  constructor(private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ,private httpRequeste:HttpClient,){}
  num_projet!: string;
  type!: string;
  titre!: string;
  chef!: String;
  statut!: string;
  date_creat!: Date;
  date_valid!: Date;
  etude_tec!: Text;
  confirm!: string;
  montant!: number;
  acheteur!: string;
  statut_a!: string;
  observation!: Text;
  OI!: string;
  ngOnInit(): void {
this.showDemande();

  }
  showDemande(){
    this.dataService.getDemande().subscribe( (response:Demande[])=> {
 this.dataSource = new MatTableDataSource<Demande>(response);
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
    this.dialog.open(DialogDemandComponent, {
     width:'90%',
     height:'90%',
     panelClass: 'dialog-border'    
    });
  }
  deleteData(id: number) {
    this.dataService.deleteDemand(id).subscribe({next: response => {
      console.log(response); // Success message
      this.showDemande();
    },
    error: error => {
      console.error(error);
    }
  
  });
}

ouvrirDialogueEdition(id: number): void {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementDm/' + id).subscribe((data: any) => {
    const dialogRef = this.dialog.open(Dialog1DemandComponent, {
      data: data,
      width:'90%',
      height:'90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequeste.put('http://127.0.0.1:8000/enregistrementDm/' + id, result).subscribe(() => {
          // Affichez un message de succès ou effectuez d'autres actions nécessaires
        });
      }
    });
  });
}
 

}
