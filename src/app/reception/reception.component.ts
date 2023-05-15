import { Component } from '@angular/core';
import { DataArchiveService } from '../services/data-archive.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent {
  constructor(private archivedata:DataArchiveService){}
  data: any;
  ngOnInit():void {
  }

}
