import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LocaleConfigComponent } from './locale-config/locale-config.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopsComponent } from './shops/shops.component';

const routes: Routes = [
  { path: 'shops', component: ShopsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:orders_id', component: OrderDetailsComponent },
  { path: 'locale-config', component: LocaleConfigComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: ShopsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
