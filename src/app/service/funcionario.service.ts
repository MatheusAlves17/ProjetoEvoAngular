import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  url = `${environment.url}/api/Departamento`;

  constructor(private http: HttpClient) { }
  
  getFuncionarios():Observable<Funcionario[]>{
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<Funcionario[]>("https://localhost:44398/api/Funcionarios",{
      headers:HttpHeader,
  });
   
  }

  getFuncionario(id: number):Observable<Funcionario>{
    return this.http.get<Funcionario>(`${environment.url}/${id}`);
  }

  postFuncionario(funcionario: Funcionario){
    return this.http.post("https://localhost:44398/api/Funcionarios",funcionario);
  }
  public putFuncionario(id: number, funcionario: Funcionario):Observable<Funcionario>{
    return this.http.put<Funcionario>("https://localhost:44398/api/Funcionarios/"+id, funcionario);
  }

  public deleteFuncionario(id: number){
    return this.http.delete("https://localhost:44398/api/Funcionarios/"+id);
  }
}
