import { environment } from './../../environments/environment';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @Input() urlImagem: string='';
  public imagemSelecionada!: File;
  progress: number | undefined;
  imagemSelect: any;
  message: string | undefined;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log(this.urlImagem);
  }

  carregarImagem(file: FileList) {
    this.imagemSelect = file.item(0);
    this.imagemSelecionada = this.imagemSelect;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlImagem = event.target.result;
    };
    reader.readAsDataURL(this.imagemSelecionada);
  }

  public uploadImagem = (files: any) => {
    console.log(this.urlImagem);
    this.carregarImagem(files);
    if (files.length === 0) {
      return;
    }
    let ImagemParaUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', ImagemParaUpload, ImagemParaUpload.name);
    console.log(ImagemParaUpload);
    this.http
      .post('https://localhost:44398/api/Upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((data) => {
        console.log('AAAAA: ',data)
        if (data.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * data.loaded));
        else if (data.type === HttpEventType.Response) {
          this.message = 'Imagem carregada';
          this.onUploadFinished.emit(data.body);
        }
      });
  };

  public criarPathImg = (serverPath: any) => {
    console.log(serverPath);
    var valor = "/assets/img/default.png";

    if(serverPath == valor || serverPath.length > 1000){
      return serverPath;
    }
    else if(serverPath != ''){
      return `https://localhost:44398/${serverPath}`;

    }
  };
}
