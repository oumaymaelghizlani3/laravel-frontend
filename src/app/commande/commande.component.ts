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

export interface Commande {
  id:number;
  num_commande:string;
  service:string;
  type_command:string;
  date:Date;
  fornisseur:string;
}

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit,Commande,AfterViewInit {
  dataSource: MatTableDataSource<Commande> = new MatTableDataSource<Commande>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['id','num_commande', 'service','type_command','date','fornisseur','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
    data1:any;
   id!: number;
  constructor(private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ,private httpRequeste:HttpClient,){}
  num_commande!: string;
  service!: string;
  type_command!: string;
  date!:Date;
  fornisseur!: string;
  ngOnInit(): void {
this.showCommande();

  }
  showCommande(){
    this.dataService.getCommand().subscribe( (response:Commande[])=> {
 this.dataSource = new MatTableDataSource<Commande>(response);
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
    this.dialog.open(DialogComComponent, {
     width:'90%',
     height:'75%',
     panelClass: 'dialog-border'    
    });
  }
  deleteData(id: number) {
    this.dataService.deleteCommand(id).subscribe({next: response => {
      console.log(response); // Success message
      this.showCommande();
    },
    error: error => {
      console.error(error);
    }
  
  });
}

ouvrirDialogueEdition(id: number): void {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementCm/' + id).subscribe((data: any) => {
    const dialogRef = this.dialog.open(Dialog1ComComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequeste.put('http://127.0.0.1:8000/enregistrementCm/' + id, result).subscribe(() => {
          // Affichez un message de succès ou effectuez d'autres actions nécessaires
        });
      }
    });
  });
}
 

}
