import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { IGetAllCategories } from 'src/app/interfaces/ICategories-interface';
import { PhotoProductService } from 'src/app/service/photo-product/photo-product.service';
import { RawMaterialService } from 'src/app/service/raw-material/raw-material.service';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss'],
})
export class RawMaterialComponent implements OnInit {
  @Output() public titleSucess: string = 'Matéria Adicionado';
  @Output() public messageSucess: string = 'Matéria Adicionado com sucesso!';
  @Output() public messageError: string =
    'Não foi possível adicionar a matéria. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  @Output() public titleAtention: string = 'Atenção!';
  @Output() public messageAtention: string =
    'A matéria foi criada mas, a imagem da matéria não foi adicionada. Verifique a imagem na edição de matéria';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public eventSubjectAtention: Subject<void> = new Subject<void>();
  public filesThumbProduct: Array<string> = [];
  public form: FormGroup;
  public placeHolderInputFile: string = 'Seleciona uma foto';
  public dropdownSettings: IDropdownSettings = {};
  public allCategories: IGetAllCategories[] = [];
  private listNameFiles: Array<string> = [];
  private files: Array<File> = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productPhotoService: PhotoProductService,
    private readonly rawMaterialService: RawMaterialService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      qtd: ['', [Validators.required]],
      measure: ['', [Validators.required]],
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Medida...',
    };
  }

  public changeImage = (image: number): void => {
    const thumbImages = document.querySelectorAll<HTMLElement>('.thumb img');
    const images = document.querySelectorAll<HTMLElement>('.slider > ul li');
    images.forEach((e, index) => {
      if (index === image) {
        images[image].classList.remove('removeImage');
        return;
      }
      e.classList.add('removeImage');
    });

    thumbImages.forEach((e, index) => {
      if (index === image) {
        thumbImages[image].classList.add('imageSelected');
        return;
      }
      e.classList.remove('imageSelected');
    });
  };

  public onSubmit = (): void => {
    this.form.value.qtd = this.convertQtd(
      this.form.value.qtd,
      this.form.value.measure[0].id
    );
    this.rawMaterialService.create(this.form.value).subscribe({
      next: (res) => {
        this.form.reset();
        this.eventSubjectSucess.next();
        window.scroll(0, 0);
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = err.error.message;
        window.scroll(0, 0);
      },
    });
  };

  private convertQtd = (qtd: number, measure: number): number => {
    let number;
    switch (measure) {
      case 1:
        number = qtd * 1000;
        break;
      case 2:
        number = qtd;
        break;
      case 3:
        number = qtd / 1000;
        break;
    }
    return number ? number : 0;
  };

  private createProductImage = (idProduct: number): void => {
    this.productPhotoService.createImage(idProduct, this.files).subscribe({
      next: (res) => {
        window.scroll(0, 0);
        this.eventSubjectSucess.next();
        this.form.reset();
        this.removeFiles();
      },

      error: (err) => {
        window.scroll(0, 0);
        this.eventSubjectAtention.next();
      },
    });
  };

  public addImage = (): void => {
    document.querySelector<HTMLElement>('input[type=file]')!.click();
  };

  public getInfoImage = (event: Event): void => {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filesThumbProduct.push(reader.result as string);
      this.listNameFiles.push(file.name);
      this.placeHolderInputFile = this.listNameFiles.join(', ');
      this.files.push(file);
    };
    reader.readAsDataURL(file);
  };

  public removeFiles = (): void => {
    this.filesThumbProduct = [];
    this.listNameFiles = [];
    this.files = [];
    this.placeHolderInputFile = 'Selecione uma foto';
    this.form.value.photo = '';
    const inputFile =
      document.querySelector<HTMLInputElement>('input[type=file]');
    inputFile!.value = '';
  };
}
