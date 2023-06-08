import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommandeComponent } from './commande/commande.component';
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
import { Dialog1Component } from './dialog1/dialog1.component';
import { DialogComComponent } from './dialog-com/dialog-com.component';
import { Dialog1ComComponent } from './dialog1-com/dialog1-com.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogLivComponent } from './dialog-liv/dialog-liv.component';
import { Dialog1LivComponent } from './dialog1-liv/dialog1-liv.component';
import { HomeComponent } from './home/home.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import { GuideComponent } from './guide/guide.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { DialogRecComponent } from './dialog-rec/dialog-rec.component';
import { Dialog1RecComponent } from './dialog1-rec/dialog1-rec.component';
import { DemandeComponent } from './demande/demande.component';
import { DialogDemandComponent } from './dialog-demand/dialog-demand.component';
import { Dialog1DemandComponent } from './dialog1-demand/dialog1-demand.component';


const routes: Routes = [
  { path: 'livraison', component: LivraisonComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'reception', component: ReceptionComponent },
  { path: 'chart', component: ChartComponent },
];

@NgModule({
  declarations: [
    AppComponent,
 FournisseurComponent,
 DialogComponent,
 Dialog1Component,
 DialogComComponent,
 Dialog1ComComponent,
 CommandeComponent,
 LivraisonComponent,
 DialogLivComponent,
 Dialog1LivComponent,
 HomeComponent,
 GuideComponent,
 ChartComponent,
 DialogRecComponent,
 Dialog1RecComponent,
 ReceptionComponent,
 DemandeComponent,
 DialogDemandComponent,
 Dialog1DemandComponent,
  ],
  imports: [
    [RouterModule.forRoot(routes)],
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
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
   NgChartsModule,
  
    ],
 
  providers: [MatDialog,DatePipe],
    bootstrap: [AppComponent],exports: [RouterModule]
})
export class AppModule { }
