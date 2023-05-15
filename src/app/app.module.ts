import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommandeComponent } from './commande/commande.component';
import { ServiceComponent } from './service/service.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ReceptionComponent } from './reception/reception.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FournisseurComponent } from './fournisseur/fournisseur.component';

@NgModule({
  declarations: [
    AppComponent,
 FournisseurComponent,
 DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,  
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule ,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    CommonModule,  
    HttpClientModule
    ],
 
  providers: [MatDialog,  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
