import { Component, OnInit, ViewChild } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
export class FournisseurComponent implements OnInit {
  
  dataSource: MatTableDataSource<Fournisseur> = new MatTableDataSource<Fournisseur>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['nom', 'adresse','email','commande','contrat','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  static ngOnInit: any;
 
  constructor(private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ){}
  ngOnInit(): void {
    this.dataService.getFournisseur().subscribe((response: Fournisseur[]) => {
      this.dataSource = new MatTableDataSource<Fournisseur>(response);
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


 
}