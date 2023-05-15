import { Component } from '@angular/core';
import {DataArchiveService} from '../services/data-archive.service';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  constructor(private archivedata:DataArchiveService){}
  data: any;
  ngOnInit():void {
  }
 

}
