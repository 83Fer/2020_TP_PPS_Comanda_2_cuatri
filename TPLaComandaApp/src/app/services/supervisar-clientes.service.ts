import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IClienteASupervisar, IClienteASupervisarUID} from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class SupervisarClientesService {
  coleccionClientes: AngularFirestoreCollection<IClienteASupervisar>;
  listaClientes: Observable<IClienteASupervisarUID[]>;

  constructor(
    private dataBase: AngularFirestore
  ) { 
    this.coleccionClientes = dataBase.collection<IClienteASupervisar>('clientesASupervisar');
  }

  public traerClientes(){
    this.listaClientes = this.coleccionClientes.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IClienteASupervisar;
        const uid = a.payload.doc.id;
        return {uid, ...data};
      }))
    );
  }

  public getListaClientes(): Observable<IClienteASupervisarUID[]>{
    this.traerClientes();
    return this.listaClientes;
  }

  public cambiarEstado(cliente: IClienteASupervisarUID, nuevoEstado:string){
    let clienteModificado: IClienteASupervisar = {
      email: cliente.email,
      nombre: cliente.nombre,
      estado: nuevoEstado
    }
    this.coleccionClientes.doc(cliente.uid).update(clienteModificado);
  }
}
