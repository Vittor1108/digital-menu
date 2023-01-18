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
import { IPhotocategory } from 'src/app/interfaces/IUpload-photo.interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { PhotoCategoryService } from 'src/app/service/photo-category/photo-category.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.scss'],
})
export class EditCategoryPageComponent implements OnInit {
  @ViewChild('inputFile') private inputFile: ElementRef;
  @Output() public titleSucess: string = 'Categoria Atualizada';
  @Output() public messageSucess: string = 'Categoria Atualizada com sucesso!';
  @Output() public messageError: string =
    'Não foi possível atualizar a categoria. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  private files: Array<File | IPhotocategory> = [];
  public form: FormGroup;
  public filesThumb: Array<string> = [];
  public placeHolderInputFile: string = 'Selecione uma Foto';
  private listNameFiles: Array<string> = [];
  private categoryId: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoriesService,
    private readonly activeRoute: ActivatedRoute,
    private readonly categoryImageService: PhotoCategoryService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getCategoryId();
  }

  public onSubmit = (): void => {
    window.scroll(0, 0);
    this.categoryService
      .updatedCategory(this.categoryId, this.form.value)
      .subscribe({
        next: (res) => {
          this.eventSubjectSucess.next();
          this.createImageCategory(res.id);
        },
        error: (err) => {
          this.eventSubjectError.next();
          this.messageError = err.error.message;
        },
      });
  };

  private createImageCategory = (idCategory: number) => {
    this.categoryImageService
      .createImageCategory(this.files, idCategory)
      .subscribe({
        next: () => {
          window.scroll(0, 0);
          this.eventSubjectSucess.next();
        },

        err: () => {
          window.scroll(0, 0);
          this.eventSubjectError.next();
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
    this.deleteFiles();
    this.filesThumb = [];
    this.listNameFiles = [];
    this.files = [];
    this.placeHolderInputFile = 'Selecione uma foto';
    this.form.value.photo = '';
    document.querySelector<HTMLInputElement>('input[type=file]')!.value = '';
  };

  private deleteFiles = (): void => {
    this.files.forEach((file: any) => {
      if (!file.id) return;
      this.categoryImageService.deleteImage(file.id).subscribe({
        error: (err) => {
          this.eventSubjectError.next();
          this.messageError = 'Não foi possível excluir as imagens.';
          window.scroll(0, 0);
        },
      });
    });
  };

  private getCategoryId = (): void => {
    this.activeRoute.params.subscribe(
      (params) => (this.categoryId = params['id'])
    );
    this.categoryService.getCategoryId(this.categoryId).subscribe({
      next: (res) => {
        this.setFormControlValue(res.name, res.description, res.PhotoCategory);
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = 'Erro ao carregar ao categoria. Tente novamente!';
      },
    });
  };

  private setFormControlValue = (
    name: string,
    description: string,
    photos: IPhotocategory[]
  ): void => {
    const photosName = photos.map((photo) => {
      this.filesThumb.push(photo.url);
      this.files.push(photo);
      return photo.originalname;
    });

    this.listNameFiles.push(photosName.join(', '));
    this.filesThumb.length === 0
      ? 'Seleciona uma imagem'
      : (this.placeHolderInputFile = this.listNameFiles.join(', '));

    this.form.setValue({
      name: name,
      description: description,
    });
  };

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

}
