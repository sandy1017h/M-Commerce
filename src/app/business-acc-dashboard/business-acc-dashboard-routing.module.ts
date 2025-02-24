import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from '../products/add-product/add-product.component';

const routes: Routes = [
   {
          path:'addproducts',
          component:AddProductComponent,
          pathMatch:'full'
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAccDashboardRoutingModule { }
