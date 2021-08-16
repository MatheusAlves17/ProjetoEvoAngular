import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public departamentoForm!: FormGroup;
  public departamentoSelecionado!: Departamento;
  public departamentos!: Departamento[];


  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService,
    private _router: Router
  ) {
    this.criarFormulario(); 
  }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos(){
    this.departamentoService.getDepartamentos().subscribe(
      (departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  salvarDepartamento(departamento: Departamento){
    if(departamento.id === 0){
        this.departamentoService.postDepartamento(departamento).subscribe(
          (departamento: any) => {
            console.log(departamento),
            this.getDepartamentos();
          },
          (erro: any) => {
            console.error('Erro: ', erro)
          }
        )
    }else if(departamento.id !== 0){
      this.departamentoService.putDepartamento(departamento.id, departamento).subscribe(
        (departamento: any) => {
          console.log(departamento),
          this.getDepartamentos();
        },
        (erro: any) => {
          console.error('Erro: ',erro)
        }
      );
    }
  }

  submitDepartamento(){
    this.salvarDepartamento(this.departamentoForm.value);
  }

  criarFormulario(){
    this.departamentoForm = this.fb.group({
      id: [''],
      nome: ['',Validators.required],
      sigla: ['', Validators.required]
    });
  }


  departamentoSelect(departamento: any){
    this.departamentoSelecionado = departamento;
    this.departamentoForm.patchValue(departamento);
  }
  departamentoNovo(){
    this.departamentoSelecionado = new Departamento();
    this.departamentoForm.patchValue(this.departamentoSelecionado);
  }

  deletarDepartamento(id: number):void{
    this.departamentoService.deleteDepartamento(id).subscribe(
      (status: any) => {
        console.log(status);
        this.getDepartamentos();
      },
      (erro: any) => {
        console.error('Erro: ',erro);
      }
    );
  }

  redirecionar(departamento: Departamento){
    this._router.navigate(['departamento', departamento.id])    
  }
}
