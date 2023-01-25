import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { IScreen } from 'src/app/interfaces/IScreens-interface';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ScreensService } from 'src/app/service/screens/screens.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  @Output() public titleSucess: string = 'Funcionário Adicionado';
  @Output() public messageSucess: string =
    'Funcionário Adicionado com sucesso!';
  @Output() public messageError: string =
    'Não foi possível adicionar o funcionário. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public filesThumbProduct: Array<string> = [];
  public placeHolderInputFile: string = 'Seleciona uma foto';
  public form: FormGroup;
  public dropdownSettings: IDropdownSettings = {};
  public screens: IScreen[] = [];

  private listNameFiles: Array<string> = [];
  private files: Array<File> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly screensService: ScreensService,
    private readonly employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      screens: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'surname',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Telas...',
    };

    this.getAllScreens();
  }

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

  public addImage = (): void => {
    document.querySelector<HTMLElement>('input[type=file]')!.click();
  };

  public onSubmit = (): void => {
    const screens = this.form.value.screens.map((e: IScreen) => e.id);
    this.form.value.screeens = screens;
    this.employeeService.createEmployee(this.form.value).subscribe({
      next: (res) => {
        if (this.files) {
          this.registerPhoto(res.id!);
          return;
        }
        window.scroll(0, 0);
        this.eventSubjectSucess.next();
      },

      error: (err) => {
        this.messageError = err.error.message;
        this.eventSubjectError.next();
        window.scroll(0, 0);
      },
    });
  };

  private getAllScreens = (): void => {
    this.screensService.findAllScreens().subscribe({
      next: (res) => {
        this.screens = res;
      },
    });
  };

  private registerPhoto = (idEmployee: number): void => {
    this.employeeService.registerPhoto(idEmployee, this.files).subscribe({
      next: (res) => {
        this.form.reset();
        this.files = [];
        this.filesThumbProduct = [];
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
}
