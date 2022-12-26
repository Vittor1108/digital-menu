import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends AddProductComponent {
  @ViewChild('inputFile') private inputFile: ElementRef;
  public form: FormGroup;
  public filesThumb: Array<string> = [];
  public placeHolderInputFile: string = 'Selecione uma Foto';
  private listNameFiles: Array<string> = [];
  private files: Array<File> = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoriesService
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
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.createImageCategory(res.id);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  private createImageCategory = (idCategory: number) => {
    this.categoryService.createImageCategory(this.files, idCategory);
  }

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
    this.placeHolderInputFile = 'Selecione uma foto';
    this.form.value.photo = '';
  };
}
