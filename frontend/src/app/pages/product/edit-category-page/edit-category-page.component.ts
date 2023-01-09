import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.scss'],
})
export class EditCategoryPageComponent
  extends AddProductComponent
  implements OnInit
{
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
  private categoryId: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoriesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    });

    this.getCategoryId();
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
    this.categoryService.createImageCategory(this.files, idCategory).subscribe({
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

  private getCategoryId = (): void => {
    this.activeRoute.params.subscribe(
      (params) => (this.categoryId = params['id'])
    );
    this.categoryService.getCategoryId(this.categoryId).subscribe({
      next: (res) => {
        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };
}
