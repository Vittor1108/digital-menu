import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { Subject } from 'rxjs';
import { PhotoCategoryService } from 'src/app/service/photo-category/photo-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends AddProductComponent {
  @ViewChild('inputFile') private inputFile: ElementRef;
  @Output() public titleSucess: string = 'Categoria Adicionada';
  @Output() public messageSucess: string = 'Categoria Adicionada com sucesso!';
  @Output() public messageError: string =
    'Não foi possível adicionar a categoria. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  @Output() public titleAtention: string = 'Atenção!';
  @Output() public messageAtention: string =
    'A categoria foi criada mas, a imagem da categoria não foi adicionada. Verifique a imagem na edição de categoria';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public eventSubjectAtention: Subject<void> = new Subject<void>();
  private files: Array<File> = [];
  public form: FormGroup;
  public filesThumb: Array<string> = [];
  public placeHolderInputFile: string = 'Selecione uma Foto';
  private listNameFiles: Array<string> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoriesService,
    private readonly categoryImageService: PhotoCategoryService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    });
  }

  public onSubmit = (): void => {
    window.scroll(0, 0);
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (res) => {
        this.createImageCategory(res.id);
      },

      error: (err) => {
        this.messageError = err.error.message;
        this.eventSubjectError.next();
      },
    });
  };

  private createImageCategory = (idCategory: number) => {
    this.categoryImageService.createImageCategory(this.files, idCategory).subscribe({
      next: (res: any) => {
        this.eventSubjectSucess.next();
        this.form.reset();
        this.removeFiles();
      },

      err: (err: any) => {
        this.eventSubjectAtention.next();
      },
    });
  };

  public addImage = (): void => {
    const inputFile =
      document.querySelector<HTMLInputElement>('input[type=file]');
    inputFile?.click();
  };

  public getInfoImage = (event: any): void => {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filesThumb.push(reader.result as string);
      this.listNameFiles.push(file.name);
      this.placeHolderInputFile = this.listNameFiles.join(', ');
      this.files.push(file);
    };
    reader.readAsDataURL(file);
  };

  public removeFiles = (): void => {
    this.filesThumb = [];
    this.listNameFiles = [];
    this.files = [];
    this.placeHolderInputFile = 'Selecione uma foto';
    this.form.value.photo = '';
    const inputFile =
      document.querySelector<HTMLInputElement>('input[type=file]');
    inputFile!.value = '';
  };

}
