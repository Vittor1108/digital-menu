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
  private files: Array<any>;
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

  public getInfoImage = (): void => {
    console.log(this.inputFile.nativeElement.files);
  };
}
