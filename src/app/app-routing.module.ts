import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropietarioComponent } from './propietario/propietario.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';


const routes: Routes = [
  { path: 'propietario', component: PropietarioComponent },
  { path: 'propietario/:id', component: PropietarioComponent },
  { path: 'vehiculo', component: VehiculoComponent },
  { path: 'vehiculo/:id', component: VehiculoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
