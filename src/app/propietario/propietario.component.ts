import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '../components/datatable/datatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Propietario } from '../core/interfaces/propietario';
import { Vehiculo } from '../core/interfaces/vehiculo';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ServiciosService } from '../servicios.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.scss']
})
export class PropietarioComponent implements OnInit {
  edit: boolean = false;
  maintenance: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  propietarios: Propietario[];
  vehiculosnoprop: Vehiculo[];
  vehiculosprop: Vehiculo[];
  propietario: Propietario;
  id_propietario:number;

  changeDatatable : boolean = false;
  Columns = [
    { def: 'identificacion', header: 'identificacion', cell: (row: Propietario) => `${row.identificacion}` },
    { def: 'nombre', header: 'Nombre', cell: (row: Propietario) => `${row.nombre}` },
    { def: 'apellido', header: 'apellido', cell: (row: Propietario) => `${row.apellido}` },
    { def: 'telefono', header: 'telefono', cell: (row: Propietario) => `${row.telefono}` },
    { def: 'direccion', header: 'direccion', cell: (row: Propietario) => `${row.direccion}` },
    { def: 'email', header: 'email', cell: (row: Propietario) => `${row.email}` },
    { def: 'fecha_nacimiento', header: 'fecha_nacimiento', cell: (row: Propietario) => `${row.fecha_nacimiento}` }
  ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public servicios:ServiciosService) { }

  ngOnInit(): void {
    this.id_propietario = this.activatedRoute.snapshot.params['id'];
    if(this.id_propietario){
      this.obtenerPropietario(this.id_propietario);
      this.obtenerVehiculosPropietario(this.id_propietario);
      this.maintenance = true;
    }
    else{ 
      this.obtenerPropietarios();
    }
  }

  obtenerPropietarios(){
    this.blockUI.start("Cargando datos de losl propietarios"); 
    this.servicios.getPropietarios().subscribe((data:any) => {
      this.propietarios = data;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    })
  }

  obtenerPropietario(id){
    this.blockUI.start("Cargando datos del propietario"); 
    this.servicios.getPropietario(id).subscribe((data:any) => {
      this.propietario = data;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  obtenerVehiculosPropietario(id){
    this.blockUI.start("Cargando vehiculos del propietario"); 
    this.servicios.getVehiculosPropietario(id).subscribe((data:any) => {
      this.vehiculosprop = data.asignados;
      this.vehiculosnoprop = data.noasignados;
      this.blockUI.stop();
    }, (err:any) => {
      this.blockUI.stop();
      console.log('Error :', err.status, err.statusText);
    });
  }

  back(){
    this.maintenance = false;
    this.router.navigateByUrl('propietario');

  }

  save(){
    this.blockUI.start("Guardando cambios");
    
    this.servicios.asignarVehiculoPropietario(this.id_propietario, this.vehiculosprop).subscribe((data:any) => {
      console.log(data);
      this.blockUI.stop();
    });
    
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
