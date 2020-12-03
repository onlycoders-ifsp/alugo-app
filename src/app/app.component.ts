import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alugo-app';
  location = Location;
  ngInit(){
    if (environment.production && location.protocol === 'http:'){
      window.location.href = location.href.replace('http', 'https');
    }
  }
}
