import { Component } from '@angular/core';
import {DataArchiveService} from '../services/data-archive.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  constructor(private archivedata:DataArchiveService){}
  data: any;
  ngOnInit():void {

  }

}
