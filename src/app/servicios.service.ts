import { Injectable } from '@angular/core';
import { Propietario } from './core/interfaces/propietario';
import { Tipo } from './core/interfaces/tipo';
import { Marca } from './core/interfaces/Marca';
import { Modelo } from './core/interfaces/modelo';
import { Vehiculo } from './core/interfaces/vehiculo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public options: any;
  public headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(
    public httpClient: HttpClient
    ) {
    this.options = {
      headers: this.headers
    };
   }

  getPropietario(id:number){
    return this.httpClient.get('http://localhost:8080/detektor/api/propietario.php/?id=' + id, this.options);
  }

  getPropietarios(){
    return this.httpClient.get('http://localhost:8080/detektor/api/propietario.php', this.options);
  }

  getModelos(id_marca:number, id_tipo:number){
    console.log(id_marca, id_tipo);
    return this.httpClient.get('http://localhost:8080/detektor/api/modelo-vehiculo.php?id_marca=' + id_marca + '&id_tipo=' + id_tipo, this.options);
  }

  getMarcas(){
    return this.httpClient.get('http://localhost:8080/detektor/api/marca-vehiculo.php', this.options);
  }

  getTipos(){
    return this.httpClient.get('http://localhost:8080/detektor/api/tipo-vehiculo.php', this.options);
  }

  getVehiculo(placa:string){
    return this.httpClient.get('http://localhost:8080/detektor/api/vehiculo.php?placa=' + placa, this.options);
  }

  getVehiculos(){
    return this.httpClient.get('http://localhost:8080/detektor/api/vehiculo.php', this.options);
  }

  crearVehiculo(vehiculo:Vehiculo){
    return this.httpClient.post('http://localhost:8080/detektor/api/vehiculo.php', { vehiculo }, this.options);
  }

  actualizarVehiculo(vehiculo:Vehiculo){
    return this.httpClient.put('http://localhost:8080/detektor/api/vehiculo.php', { vehiculo }, this.options);
  }

  eliminarVehiculo(placa:string){
    return this.httpClient.delete('http://localhost:8080/detektor/api/vehiculo.php?placa=' + placa, this.options);
  }

  getVehiculosPropietario(id:number){
    return this.httpClient.get('http://localhost:8080/detektor/api/propietario-vehiculo.php?id=' + id, this.options);
  }

  asignarVehiculoPropietario(id_propietario:number, vehiculos:any){
    return this.httpClient.post('http://localhost:8080/detektor/api/propietario-vehiculo.php', { id_propietario, vehiculos }, this.options);
  }
}
