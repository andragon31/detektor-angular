import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../core/interfaces/vehiculo';
import { Modelo } from '../core/interfaces/modelo';
import { Marca } from '../core/interfaces/Marca';
import { Tipo } from '../core/interfaces/tipo';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ServiciosService } from '../servicios.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {
  edit: boolean = false;
  maintenance: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  vehiculos: Vehiculo[];
  marcas: Marca[];
  tipos: Tipo[];
  modelos: Modelo[];
  vehiculo: Vehiculo;
  id_vehiculo:number;
  disabledmodelo:boolean = false;

  changeDatatable : boolean = false;
  Columns = [
    { def: 'placa', header: 'placa', cell: (row: Vehiculo) => `${row.placa}` },
    { def: 'vin', header: 'vin', cell: (row: Vehiculo) => `${row.vin}` },
    { def: 'linea', header: 'linea', cell: (row: Vehiculo) => `${row.linea}` },
    { def: 'cilindrada', header: 'cilindrada', cell: (row: Vehiculo) => `${row.cilindrada}` },
    { def: 'chasis', header: 'chasis', cell: (row: Vehiculo) => `${row.chasis}` },
    { def: 'color', header: 'color', cell: (row: Vehiculo) => `${row.color}` },
    { def: 'marca', header: 'marca', cell: (row: Vehiculo) => `${row.marca_nombre}` },
    { def: 'tipo', header: 'tipo', cell: (row: Vehiculo) => `${row.tipo_nombre}` },
    { def: 'modelo', header: 'modelo', cell: (row: Vehiculo) => `${row.modelo_nombre}` }
  ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public servicios:ServiciosService) { }

  ngOnInit(): void {
    this.obtenerTipos();
    this.obtenerMarcas();
    this.id_vehiculo = this.activatedRoute.snapshot.params['id'];
    if(this.id_vehiculo){
      this.edit = true;
      this.obtenerVehiculo(this.id_vehiculo);
    }
    else{
      
      this.onInitVehiculo(); 
      this.obtenerVehiculos();
    }

  }

  obtenerVehiculos(){
    this.servicios.getVehiculos().subscribe((data:any) => {
      this.vehiculos = data;
      this.blockUI.stop();
    }, (err:any) => {
      console.log('Error :', err.status, err.statusText);
    });
  }

  obtenerVehiculo(id){
    this.servicios.getVehiculo(id).subscribe((data:any) => {
      this.vehiculo = data;
      this.obtenerModelos(this.vehiculo.marca, this.vehiculo.tipo);
      this.maintenance = true;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  obtenerMarcas(){
    this.blockUI.start("Cargando marcas de vehiculo"); 
    this.servicios.getMarcas().subscribe((data:any) => {
      this.marcas = data;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  obtenerTipos(){
    this.blockUI.start("Cargando tipos de vehiculo"); 
    this.servicios.getTipos().subscribe((data:any) => {
      this.tipos = data;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  obtenerModelos(id_marca, id_tipo){
    this.blockUI.start("Cargando modelos de vehiculo"); 
    this.servicios.getModelos(id_marca, id_tipo).subscribe((data:any) => {
      console.log(data);
      this.modelos = data;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  back(){
    this.maintenance = false;
    this.edit = false;
    this.router.navigateByUrl('vehiculo');

  }

  save(){
    this.blockUI.start("Guardando cambios");
    this.servicios.crearVehiculo(this.vehiculo).subscribe((data:any) => {
      this.router.navigateByUrl('vehiculo');
      this.blockUI.stop();
    });
  }

  delete(event){
    this.blockUI.start("Eliminando");
    this.servicios.eliminarVehiculo(event).subscribe((data:any) =>{
      this.router.navigateByUrl('vehiculo');
      this.blockUI.stop();
    });
  }

  change(event){
    if(this.vehiculo.marca && this.vehiculo.tipo){
      this.obtenerModelos(this.vehiculo.marca, this.vehiculo.tipo);
    }
  }

  new(event) {
    this.vehiculo.placa = "";
    this.vehiculo.chasis = "";
    this.vehiculo.cilindrada = 0;
    this.vehiculo.linea = 0;
    this.vehiculo.color = "";
    this.vehiculo.marca = 0;
    this.vehiculo.modelo = 0;
    this.vehiculo.tipo = 0;
    this.vehiculo.vin = "";
    this.edit = false;
    this.maintenance = true;
  }

  onInitVehiculo(){
    this.vehiculo = {
      placa: null,
      chasis: null,
      cilindrada : null,
      linea : null,
      color : null,
      marca : null,
      modelo : null,
      tipo : null,
      vin : null,
    }
  }

  update(){
    this.blockUI.start("Actualizando");
    this.servicios.actualizarVehiculo(this.vehiculo).subscribe((data:any) => {
      console.log(data);
      this.router.navigateByUrl('vehiculo');
      this.blockUI.stop();
    });
  }
}
