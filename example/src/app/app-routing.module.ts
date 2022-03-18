import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './index/components/table/table.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'desktop65',
    loadChildren: () =>
      import('./desktop65/desktop65.module').then((m) => m.DashboardModule),
  },
  {
    path: 'table',
    component: TableComponent,
    data: {animation: 'tablePage'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
