import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  encuestaForm: FormGroup;
  encuestaLista: boolean = false;
  dataEncuesta: string;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private encuestaService: EncuestaService,
    private router: Router
  ) { 
    this.encuestaForm = this.formBuilder.group({
      comentario:[
        '',
        [Validators.required]
      ],
      higiene: [
        '',
        [Validators.required]
      ],
      recomendacion: [
        '',
        [Validators.required]
      ],
      tardanza: [
        '',
        [Validators.required]
      ],
      propina: [
        '',
        [Validators.required]
      ]
    });
  }

  ngOnInit() {
  }

  public cargarEncuesta(data){
    console.log("Encuesta", data);
    this.encuestaService.subirEncuesta(data);
  }

  public habilitarEncuesta(){
    console.log("CLICK");
    this.encuestaLista = true;
  }

  public irAtras(){
    this.router.navigateByUrl("/home-mesas");
  }

  public algo(data){
    console.log("DATAAAAA", data);
  }
}
