import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private readonly formBuilder: FormBuilder) {
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
    console.log(this.form.value);
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
      console.log(this.files);
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
