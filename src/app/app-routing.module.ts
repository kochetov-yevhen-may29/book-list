import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookComponent } from './pages/book/book.component';

const routes: Routes = [
  { path: 'dashboard/:status', component: DashboardComponent },
  { path: 'book-page', component: BookComponent },
  { path: '**', redirectTo: 'dashboard/all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
