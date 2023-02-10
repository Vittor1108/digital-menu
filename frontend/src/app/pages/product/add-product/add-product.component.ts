import { Component, OnInit, Output } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IDataGetCategories,
  IGetAllCategories,
} from 'src/app/interfaces/ICategories-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ICategorySelect } from 'src/app/interfaces/IProduct-interface';
import { ProductService } from 'src/app/service/product/product.service';
import { PhotoProductService } from 'src/app/service/photo-product/photo-product.service';
import { Subject } from 'rxjs';
import { LocatorService } from 'src/app/service/locator/locator.service';
import { IRawMaterial } from 'src/app/interfaces/IRawMaterial-interface';
import { RawMaterialService } from 'src/app/service/raw-material/raw-material.service';
import { IRegisterRawMaterialProduct } from 'src/app/interfaces/IRawMaterial-interface';
@Component({
  selector: 'app-add-product',
  templateUrl: '../shared/add-product.component.html',
  styleUrls: ['../shared/add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Output() public titleSucess: string = 'Produto Adicionado';
  @Output() public messageSucess: string = 'Produto Adicionado com sucesso!';
  @Output() public messageError: string =
    'Não foi possível adicionar o produto. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  @Output() public titleAtention: string = 'Atenção!';
  @Output() public messageAtention: string =
    'O produto foi criada mas, a imagem do produto não foi adicionada. Verifique a imagem na edição de categoria';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public eventSubjectAtention: Subject<void> = new Subject<void>();
  public filesThumbProduct: Array<string> = [];
  public form: FormGroup;
  public placeHolderInputFile: string = 'Seleciona uma foto';
  public listMeasure = [
    { id: 1, name: 'quilo(s)' },
    { id: 2, name: 'grama(s)' },
    { id: 3, name: 'miligrama(s)' },
  ];
  public allRawMaterials: IRawMaterial[] = [];
  public calcProfit: boolean = false;
  public qtdRawMaterial: number = 0;
  public dropdownSettings: IDropdownSettings = {};
  public allCategories: IGetAllCategories[] = [];
  public dataGet: IDataGetCategories = {
    take: '',
    skip: '',
    text: '',
  };
  private listNameFiles: Array<string> = [];
  private files: Array<File> = [];
  private avargePriceProduct: number = 0;
  protected readonly categoriesService: CategoriesService;
  protected readonly productService: ProductService;
  protected readonly productPhotoService: PhotoProductService;
  protected readonly rawMaterialService: RawMaterialService;
  constructor(private readonly formBuilder: FormBuilder) {
    this.categoriesService = LocatorService.injector.get(CategoriesService);
    this.productService = LocatorService.injector.get(ProductService);
    this.productPhotoService = LocatorService.injector.get(PhotoProductService);
    this.rawMaterialService = LocatorService.injector.get(RawMaterialService);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rawMaterial_id: this.formBuilder.array([]),
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Categoria...',
    };

    this.getAllRawMaterials();
  }

  get getRawMaterial(): FormArray {
    return this.form.get('rawMaterial_id') as FormArray;
  }

  public addRawMaterial = (): void => {
    const newControl: FormGroup = this.formBuilder.group({
      rawMaterial: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      measure: ['', [Validators.required]],
    });

    this.getRawMaterial.push(newControl);
  };

  public changeProfit = (): void => {
    this.calcProfit = !this.calcProfit;
    if (!this.calcProfit) {
      const formControls = <FormArray>this.form.controls['rawMaterial_id'];
      formControls.controls = [];
      this.form.value.rawMaterial_id = [];
      this.form.value.avargePrice = null;
      return;
    }
    this.addRawMaterial();
  };

  public removeRawMaterial = (index: number): void => {
    const formControls = <FormArray>this.form.controls['rawMaterial_id'];
    formControls.removeAt(index);
  };

  public getFormGroup = (index: number): FormGroup => {
    return this.getRawMaterial.controls[index] as FormGroup;
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

  public onSubmit = (): void => {
    const categories = this.form.value.category.map(
      (category: ICategorySelect) => category.id
    );

    this.form.value.category = categories;

    if (this.calcProfit) {
      const rawMaterialsId = this.form.value.rawMaterial_id.map(
        (e: IRegisterRawMaterialProduct) => e.rawMaterial[0].id
      );
      this.getAvargePriceProduct();
      this.form.value.rawMaterial_id = rawMaterialsId;
      return;
    }

    this.createProduct();
  };

  private createProduct = (): void => {
    this.productService.createProduct(this.form.value).subscribe({
      next: (res) => {
        this.createProductImage(res.id);
      },

      error: (err) => {
        window.scroll(0, 0);
        this.eventSubjectError.next();
        this.messageError = err.error.message;
      },
    });
  };

  private getAvargePriceProduct = (): void => {
    this.reformArray(this.form.value.rawMaterial_id).forEach((e) => {
      this.rawMaterialService.getRawMaterialById(e.rawMaterialId).subscribe({
        next: (res) => {
          const averagePrice = (e.quantity! * res.averagePriceGg) / 100;
          this.avargePriceProduct += averagePrice;
          this.form.value.avargePrice = this.avargePriceProduct;
          res.quantityGg -= e.quantity!;
          // this.createProduct();
        },

        error: (err) => {
          window.scroll(0, 0);
          this.eventSubjectError.next();
          this.messageError = err.error.message;
        },
      });
    });
  };

  private reformArray = (rawMaterials: IRegisterRawMaterialProduct[]) => {
    const reformArray = rawMaterials.map((e) => {
      let quantityGg;
      switch (e.measure[0].id) {
        case 1:
          quantityGg = e.quantity * 1000;
          break;
        case 2:
          quantityGg = e.quantity;
          break;
        case 3:
          quantityGg = e.quantity / 1000;
          break;
      }
      return {
        quantity: quantityGg,
        rawMaterialId: e.rawMaterial[0].id,
      };
    });
    return reformArray;
  };

  private createProductImage = (idProduct: number): void => {
    this.productPhotoService.createImage(idProduct, this.files).subscribe({
      next: (res) => {
        window.scroll(0, 0);
        this.eventSubjectSucess.next();
        this.form.reset();
        this.removeFiles();

        if (this.calcProfit) {
          this.changeProfit();
        }
      },

      error: (err) => {
        window.scroll(0, 0);
        this.eventSubjectAtention.next();
      },
    });
  };

  private getAllRawMaterials = (): void => {
    this.rawMaterialService.getAllRawMaterial(this.dataGet).subscribe({
      next: (res) => {
        this.allRawMaterials = res.rawMaterial;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  private getAllCategories = (): void => {
    const dataGet: IDataGetCategories = {
      skip: '',
      take: '',
      text: '',
    };
    this.categoriesService.getAllCategoires(dataGet).subscribe({
      next: (res) => {
        this.allCategories = res.categories;
      },

      error: (err) => {
        window.scroll(0, 0);
        this.eventSubjectError.next();
        this.titleError = 'Atenção!';
        this.messageError =
          'Não foi possível carregar as categorias registradas. Tente novamente!';
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

  public checkValueRwUsed = (index: number): boolean => {
    const controlForm = this.form.controls['rawMaterial_id'].value[index];
    if (
      !controlForm.rawMaterial ||
      !controlForm.quantity ||
      !controlForm.measure
    ) {
      return true;
    }
    return false;
  };

  public teste = (index: number) => {
    const rwSelected =
      this.form.controls['rawMaterial_id'].value[index].rawMaterial[0].id;
    this.allRawMaterials = this.allRawMaterials.filter(
      (e) => e.id !== rwSelected
    );
  };
}
