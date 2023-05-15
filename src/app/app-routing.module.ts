import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './commande/commande.component';
import { ServiceComponent } from './service/service.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ReceptionComponent } from './reception/reception.component';;

const routes:Routes=[
{

}
];

@NgModule({
  imports:[],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
