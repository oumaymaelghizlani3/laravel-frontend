import { Component } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent {
  constructor(private archivedata:DataArchiveService){}

  ngOnInit():void {
  
  }
  

}
