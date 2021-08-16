import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './views/departamentos/departamentos.component';
import { FuncionariosComponent } from './views/funcionarios/funcionarios.component';

const routes: Routes = [
  { path: '', component: DepartamentosComponent},
  { path: 'departamento/:id', component: FuncionariosComponent}
  // { path: 'funcionarios', component: FuncionariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
