import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, public homeService: HomeService) {homeService.getMenuCliente(); }

  showPage(url: string) {
    this.navCtrl.navigateRoot(url);
  }

}
