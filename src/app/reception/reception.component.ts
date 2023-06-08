import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Router } from '@angular/router';
import { DialogRecComponent } from '../dialog-rec/dialog-rec.component';
import { Dialog1RecComponent } from '../dialog1-rec/dialog1-rec.component';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
export interface Reception {
  id:number;
  famille:string;
  demandeur:string;
  CG:string;
  designation:string;
  numCDE:BigInteger;
  date:String;
  designation2:string;
  fournisseur:string;
  montant:BigInteger;
  montanteng:BigInteger;
}

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Reception> = new MatTableDataSource<Reception>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['famille', 'demandeur','CG','designation','numCDE','date','designation2','fournisseur','montant','montanteng','Consultation','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
    data1:any;
   id!: number;
  data: any;
  constructor(private router: Router,private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ,private httpRequeste:HttpClient,){}

  famille!: string;
  demandeur!: string;
  CG!: string;
  designation!: string;
  numCDE!: BigInteger;
  date!: string;
  designation2!: string;
  fournisseur!: string;
  montant!: BigInteger;
  montanteng!: BigInteger;
  ngOnInit(): void {
this.showReception();

  }
  showReception(){
    this.dataService.getReception().subscribe( (response:any)=> {
 this.dataSource = new MatTableDataSource<Reception>(response);
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
    this.dialog.open(DialogRecComponent, {
     width:'90%',
     height:'75%',
     panelClass: 'dialog-border'    
    });
  }
  deleteData(id: number) {
    this.dataService.deleteReception(id).subscribe({next: response => {
      console.log(response); // Success message
      this.showReception();
    },
    error: error => {
      console.error(error);
    }
  
  });
}

ouvrirDialogueEdition(id: number): void {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementRec/' + id).subscribe((data: any) => {
    const dialogRef = this.dialog.open(Dialog1RecComponent, {
      width:'90%',
      height:'90%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequeste.put('http://127.0.0.1:8000/enregistrementRec/' + id, result).subscribe(() => {
          // Affichez un message de succès ou effectuez d'autres actions nécessaires
        });
      }
    });
  });
}
ouvrirPDF(elementId: number) {
  // Appeler l'API pour récupérer les données spécifiques de l'enregistrement
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementRec/' + elementId).subscribe((data: any) => {
    console.log(data); // Afficher les données dans la console
    // Générer le contenu du PDF à partir des données
    const documentDefinition: TDocumentDefinitions  = {
      header: { text: 'Bon commande ',  fontSize: 20,bold: true,alignment: 'center',marginTop: 10,color: 'blue',decorationColor: 'blue' },
      content: [
        //{ text: 'ID: ' + data.id, fontSize: 16, bold: true }
        {
          table: {
           
            body: [
              [
                { text: 'Famille', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'Demandeur', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'CG', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'Désignation CG', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'N° CDE', fontSize: 14, alignment: 'center',color: 'black'}
              ],
              [
                { text: data.famille+ '\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.demandeur+ '\n\n\n\n', fontSize: 14, alignment: 'left' },
                { text: data.CG+ '\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.designation+ '\n\n\n\n', fontSize: 14, alignment: 'left' },
                { text: data.numCDE+ '\n\n\n\n', fontSize: 14, alignment: 'left' }
              ]
            ]
          }
        ,marginTop: 10},{
        table: {
          widths: ['20%', '20%', '20%','20%','20%'],
          body: [
            [
              { text: 'Date commande', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Désignation', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Fournisseur', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Montant commande DH', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Montant Engagé', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'}
            ],
            [
              { text: (new Date(data.date)).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
              { text: data.designation2+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' },
              { text: data.fournisseur+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
              { text: data.montant+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' },
              { text: data.montanteng+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' }
            ]
          ]
        }
      ,marginTop: 10}
      
        
        // Ajoutez les autres propriétés selon vos besoins
      ]
    };

    // Générer le PDF à partir du documentDefinition
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open(); // Ouvrir le PDF dans un nouvel onglet du navigateur
  });
}
ovrirDoc() {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementReco/' + this.numCDE).subscribe((data: any) => {
    console.log(data); // Afficher les données dans la console

    // Générer le contenu du PDF à partir des données
    const documentDefinition: TDocumentDefinitions  = {    
        content: [
        //{ text: 'ID: ' + data.id, fontSize: 16, bold: true },

        {
          table: {
           
            body: [
              [
                { text: 'Famille', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'Demandeur', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'CG', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'Désignation CG', fontSize: 14, alignment: 'center',color: 'black'},
                { text: 'N° CDE', fontSize: 14, alignment: 'center',color: 'black'}
              ],
              [
                { text: data.famille+ '\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.demandeur+ '\n\n\n\n', fontSize: 14, alignment: 'left' },
                { text: data.CG+ '\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.designation+ '\n\n\n\n', fontSize: 14, alignment: 'left' },
                { text: data.numCDE+ '\n\n\n\n', fontSize: 14, alignment: 'left' }
              ]
            ]
          }
        ,marginTop: 10},{
        table: {
          widths: ['20%', '20%', '20%','20%','20%'],
          body: [
            [
              { text: 'Date commande', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Désignation', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Fournisseur', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Montant commande DH', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
              { text: 'Montant Engagé', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'}
            ],
            [
              { text: (new Date(data.date)).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
              { text: data.designation2+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' },
              { text: data.fournisseur+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
              { text: data.montant+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' },
              { text: data.montanteng+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' }
            ]
          ]
        }
      ,marginTop: 10}
        // Ajoutez les autres propriétés selon vos besoins
      ]
    };

    // Générer le PDF à partir du documentDefinition
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open(); // Ouvrir le PDF dans un nouvel onglet du navigateur
  });
  }

  changementDePage() {
    this.router.navigate(['/commande']);
  }
}
