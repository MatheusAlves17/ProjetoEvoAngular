import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  public funcionarioForm!: FormGroup;
  public funcionarioSelecionado!: Funcionario;
  public funcionarios: any;
  public departamentoFun: any;
  
  urlImagem: string = '/assets/img/default.png';
  imagemSelecionada: File | undefined;
  foto = '';
  imagemParaAlterar: string = '';
  
  
  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private _router: ActivatedRoute
    ) {
      this.criarFormulario();
    }
    
    ngOnInit(): void {
      this.departamentoFun = this._router.snapshot.paramMap.get('id');
      this.getFuncionarios();
      this.funcionarios.foto = '';
    }
    
    getFuncionarios(){
      this.funcionarioService.getFuncionarios().subscribe(
        (funcionario: Funcionario[]) => {
          this.funcionarios = funcionario;
        },
        (erro: any) => {
          console.error('Rodamo: ',erro);
        }
        )
  }
  
  criarFormulario(){
    this.funcionarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      rg: ['', Validators.required],
      departamentoId: ['', Validators.required],
    });
  }
  
  submitFuncionario(){
    this.salvarFuncionario(this.funcionarioForm.value);
  }
  
  funcionarioSelect(funcionario: any){
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }
  
  funcionarioNovo(){
    this.funcionarioSelecionado = new Funcionario();
    this.funcionarioForm.patchValue(this.funcionarioSelecionado);
  }
  
  salvarFuncionario(funcionario: Funcionario){
    if(funcionario.id === 0){
      funcionario.foto = this.foto;
      console.log("BORA ",funcionario);
      this.funcionarios.id = 0;
      this.funcionarioService.postFuncionario(funcionario).subscribe(
        (funcionario: any) => {
          console.log(funcionario),
          this.getFuncionarios();
        },
        (erro: any) => {
          console.error('Erro: ', erro)
        }
        )
      }else if(funcionario.id !== 0){
      this.funcionarios.foto = this.foto;
      this.funcionarioService.putFuncionario(funcionario.id, funcionario).subscribe(
        (funcionario: any) => {
          console.log(funcionario),
          this.getFuncionarios();
        },
        (erro: any) => {
          console.error('Erro ',erro)
        }
      );
    }
  }
  postFuncionario(){
    console.log(this.funcionarioForm.value);
  }

  deletarFuncionario(id: number):void{
    this.funcionarioService.deleteFuncionario(id).subscribe(
      (status: any) => {
        console.log(status);
        this.getFuncionarios();
      },
      (erro: any) => {
        console.error('Erro: ',erro);
      }
    );
  }

  public uploadFoto = (event: { dbPath: string; }) => {
    this.foto = event.dbPath;
    console.log("vamo: ",this.foto);
  };

  public criarPathFoto = (serverPath: string) => {
    if(serverPath != ''){
      return `https://localhost:44398/${serverPath}`;
    }
    return this.urlImagem;
  };

}

