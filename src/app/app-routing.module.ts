import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './commande/commande.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ReceptionComponent } from './reception/reception.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { HomeComponent } from './home/home.component';
import { GuideComponent } from './guide/guide.component';
import { ChartComponent } from './chart/chart.component';
import { DemandeComponent } from './demande/demande.component';
const routes: Routes = [
  { path: 'livraison', component: LivraisonComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'reception', component: ReceptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'demande', component: DemandeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }