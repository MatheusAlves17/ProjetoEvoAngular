import { environment } from './../../environments/environment';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @Input() imagemUrl: string='';
  public fotoSelecionada!: File;
  progress: number | undefined;
  selectFoto: any;
  message: string | undefined;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log(this.imagemUrl);
  }

  carregarImagem(file: FileList) {
    this.selectFoto = file.item(0);
    this.fotoSelecionada = this.selectFoto;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagemUrl = event.target.result;
    };
    reader.readAsDataURL(this.fotoSelecionada);
  }

  public uploadImagem = (files: any) => {
    console.log(this.imagemUrl);
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
