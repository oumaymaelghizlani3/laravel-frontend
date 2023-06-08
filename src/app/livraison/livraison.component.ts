import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogLivComponent } from '../dialog-liv/dialog-liv.component';
import { Dialog1LivComponent } from '../dialog1-liv/dialog1-liv.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Router } from '@angular/router';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
export interface Livraison {
  id:number;
  fournisseur:string;
  service:string;
  date:string;
  num_commande:string;
  quantite:BigInt;
  prix:BigInt;
  num_livraison:string;
}
@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements AfterViewInit {

  dataSource: MatTableDataSource<Livraison> = new MatTableDataSource<Livraison>([]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches)
    );
  liste:any;
  columns = ['id','num_livraison','fournisseur', 'service','date','num_commande','quantite','prix','Consultation','action']; // Ajouter d'autres noms de colonnes ici
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
    data1:any;
   id!: number;
  data: any;
  constructor(private router: Router,private dataService:DataArchiveService,public dialog: MatDialog,private breakpointObserver:BreakpointObserver ,private httpRequeste:HttpClient,){}
  fournisseur!: string;
  service!: string;
  date!: string;
  num_commande!: string;
  num_livraison!:string;
  quantite!:BigInteger;
  prix!:BigInteger;
  ngOnInit(): void {
this.showLivraison();

  }
  showLivraison(){
    this.dataService.getLivraison().subscribe( (response:Livraison[])=> {
 this.dataSource = new MatTableDataSource<Livraison>(response);
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
    this.dialog.open(DialogLivComponent, {
     width:'90%',
     height:'75%',
     panelClass: 'dialog-border'    
    });
  }
  deleteData(id: number) {
    this.dataService.deleteLivraison(id).subscribe({next: response => {
      console.log(response); // Success message
      this.showLivraison();
    },
    error: error => {
      console.error(error);
    }
  
  });
}

ouvrirDialogueEdition(id: number): void {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementLiv/' + id).subscribe((data: any) => {
    const dialogRef = this.dialog.open(Dialog1LivComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequeste.put('http://127.0.0.1:8000/enregistrementLiv/' + id, result).subscribe(() => {
          // Affichez un message de succès ou effectuez d'autres actions nécessaires
        });
      }
    });
  });
}
ouvrirPDF(elementId: number) {
  // Appeler l'API pour récupérer les données spécifiques de l'enregistrement
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementLiv/' + elementId).subscribe((data: any) => {
    console.log(data); // Afficher les données dans la console

    // Générer le contenu du PDF à partir des données
    const documentDefinition: TDocumentDefinitions  = {
      header: { text: 'Fournisseur: ' + data.fournisseur,  fontSize: 20,bold: true,alignment: 'center',marginTop: 10,color: 'blue',decoration: 'underline',decorationColor: 'blue' },
      content: [
        //{ text: 'ID: ' + data.id, fontSize: 16, bold: true },
        { text: 'Bon de livraison N°: ' + data.num_livraison, fontSize: 14 ,bold: true,alignment: 'center',marginTop: 20 },
        {
          columns: [
            { text: 'Date: '+ (new Date(data.date)).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }), fontSize: 14, alignment: 'left',marginTop: 30 },
            { text: 'N° Bon Commande: ' + data.num_commande, fontSize: 14, alignment: 'right',marginTop: 30 }
          ]
        },
        { text: 'Client : Cosumar', fontSize: 14, alignment: 'left',marginTop: 10},
        {
          table: {
            widths: ['33.33%', '33.33%', '33.33%'],
            body: [
              [
                { text: 'Quantité:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
                { text: 'Designation:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white' },
                { text: 'Prix:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white' }
              ],
              [
                { text: data.quantite+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.service+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'center' },
                { text: data.prix+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' }
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
  numo_commande!: string;
ovrirDoc() {
  this.httpRequeste.get('http://127.0.0.1:8000/enregistrementLivo/' + this.numo_commande).subscribe((data: any) => {
    console.log(data); // Afficher les données dans la console

    // Générer le contenu du PDF à partir des données
    const documentDefinition: TDocumentDefinitions  = {
      header: { text: 'Fournisseur: ' + data.fournisseur,  fontSize: 20,bold: true,alignment: 'center',marginTop: 10,color: 'blue',decoration: 'underline',decorationColor: 'blue' },
      content: [
        //{ text: 'ID: ' + data.id, fontSize: 16, bold: true },
        { text: 'Bon de livraison N°: ' + data.num_livraison, fontSize: 14 ,bold: true,alignment: 'center',marginTop: 20 },
        {
          columns: [
            { text: 'Date: '+ (new Date(data.date)).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }), fontSize: 14, alignment: 'left',marginTop: 30 },
            { text: 'N° Bon Commande: ' + data.num_commande, fontSize: 14, alignment: 'right',marginTop: 30 }
          ]
        },
        { text: 'Client : Cosumar', fontSize: 14, alignment: 'left',marginTop: 10},
        {
          table: {
            widths: ['33.33%', '33.33%', '33.33%'],
            body: [
              [
                { text: 'Quantité:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white'},
                { text: 'Designation:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white' },
                { text: 'Prix:', fontSize: 14, alignment: 'center', fillColor: 'blue', color: 'white' }
              ],
              [
                { text: data.quantite+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left'},
                { text: data.service+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'center' },
                { text: data.prix+ '\n\n\n\n\n\n\n\n\n\n\n', fontSize: 14, alignment: 'left' }
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