import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUploadPhoto } from 'src/app/interfaces/IUpload-photo.interface';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends AddProductComponent {
  @ViewChild('inputFile') private inputFile: ElementRef;
  public form: FormGroup;
  public nameFiles: string;
  public filesThumb: Array<string> = [];
  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      photo: [''],
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
      console.log(this.filesThumb);
    };
    reader.readAsDataURL(file);
  };
}
