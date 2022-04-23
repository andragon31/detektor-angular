import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({

  declarations: [DatatableComponent ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, MatIconModule ],
  exports:[DatatableComponent],
  providers: []

})
export class ComponentsModule { }
