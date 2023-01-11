import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGetAllCategories } from 'src/app/interfaces/ICategories-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ICategorySelect } from 'src/app/interfaces/IProduct-interface';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public filesThumbProduct: Array<string> = [];
  public form: FormGroup;
  public placeHolderInputFile: string = 'Seleciona uma foto';
  public dropdownSettings: IDropdownSettings = {};
  public allCategories: IGetAllCategories[] = [];
  private listNameFiles: Array<string> = [];
  private files: Array<File> = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Categoria...',
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
    const categories = this.form.value.category.map(
      (category: ICategorySelect) => category.id
    );
    this.form.value.category = categories;
    this.productService.createProduct(this.form.value);
  };

  private getAllCategories = (): void => {
    this.categoriesService.getAllCategoires().subscribe({
      next: (res) => {
        this.allCategories = res;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  public addImage = (): void => {
    document.querySelector<HTMLElement>('input[type=file]')!.click();
  };

  public getInfoImage = (event: any): void => {
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
