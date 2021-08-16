import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  // url = `${environment.url}/api/Departamento`;

  constructor(private http: HttpClient) { }
  
  getDepartamentos():Observable<Departamento[]>{
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<Departamento[]>("https://localhost:44398/api/Departamento",{
      headers:HttpHeader,
  });
   
  }

  getDepartamento(id: number):Observable<Departamento>{
    return this.http.get<Departamento>("https://localhost:44398/api/Departamento"+id);
  }

  public postDepartamento(departamento: Departamento):Observable<Departamento>{
    return this.http.post<Departamento>("https://localhost:44398/api/Departamento", departamento);
}

  public putDepartamento(id: number, departamento: Departamento):Observable<Departamento>{
    return this.http.put<Departamento>("https://localhost:44398/api/Departamento/"+id, departamento);
  }

  public deleteDepartamento(id: number){
    return this.http.delete("https://localhost:44398/api/Departamento/"+id);
  }
}
