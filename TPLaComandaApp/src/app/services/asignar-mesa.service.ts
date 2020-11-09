import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClienteEspera, IClienteEsperaId } from '../clases/usuario';
import { IMesa, IMesaID  } from '../clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class AsignarMesaService {
  coleccionListaEspera: AngularFirestoreCollection<IClienteEspera>;
  coleccionMesa: AngularFirestoreCollection<IMesa>;

  listaClientesEspera: Observable<IClienteEsperaId[]>;
  listaMesas: Observable<IMesaID[]>;

  //listaMesasDisponibles: IMesaID[];
  //hayMesasDisponibles: boolean = false;
  //listaClientesEspera: IClienteEsperaId[];
  //listaMesas: IMesaID[];


  constructor(
    private dataBase: AngularFirestore
  ) { 
    this.coleccionListaEspera = dataBase.collection<IClienteEspera>("listaEspera");
    this.coleccionMesa = dataBase.collection<IMesa>("mesas");
  }

  public traerListaEspera (){
    this.listaClientesEspera = this.coleccionListaEspera.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IClienteEspera;
        const uid = a.payload.doc.id;
        return {uid, ...data};
      }))
    );
  }

  public traerMesas(){
    this.listaMesas = this.coleccionMesa.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IMesa;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  /*
  public traerMesasDisponibles(){
    console.log("lista service", this.listaMesas);
    console.log("mesas service", this.listaMesasDisponibles);
  }
  */

  public getListaMesas(): Observable<IMesaID[]>{
    this.traerMesas();
    return this.listaMesas;
  }

  /*
  public getListaMesasDisponibles(): IMesaID[]{
    this.traerMesasDisponibles();
    return this.listaMesasDisponibles;
  }*/

  public getListaClientesEspera(): Observable<IClienteEsperaId[]>{
    this.traerListaEspera();
    return this.listaClientesEspera;
  }

  public asignarClienteAMesa(cliente: IClienteEsperaId, mesa: IMesaID): boolean{
    let retorno = false;
    try{
      let mesaModificada:IMesa = {
        codigoqr: mesa.codigoqr,
        estado: "ocupada",
        cliente: cliente.uid,
      };
      this.coleccionMesa.doc(mesa.id).update(mesaModificada);
      this.coleccionListaEspera.doc(cliente.uid).delete();
      retorno = true;
    }
    catch(error){
      console.log("Error al asignar el cliente a la mesa", error);
    }

    return retorno;
  }

  public liberarMesa(mesa: IMesaID): boolean{
    let retorno = false;
    try{
      let mesaModificada: IMesa = {
        codigoqr: mesa.codigoqr,
        estado: "libre",
        cliente: "esperando", 
      };
      this.coleccionMesa.doc(mesa.id).update(mesaModificada);
      retorno = true;
    }
    catch(error){
      console.log("Error al modificar la mesa", error);
    }

    return retorno;
  }
}
