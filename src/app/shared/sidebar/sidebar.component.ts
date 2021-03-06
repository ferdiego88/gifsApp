import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  constructor(private gifsService:GifsService ) {

   }

   get itemsDashboard():string[] {
      return this.gifsService.historial;
   }

   getGifs(item: string) {
      this.gifsService.buscarGifs(item);
   }

}
