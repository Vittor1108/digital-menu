import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { IPhotocategory } from 'src/app/interfaces/IUpload-photo.interface';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ScreensService } from 'src/app/service/screens/screens.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
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
  private employeeId: number;
  public dropdownSettings: IDropdownSettings = {};

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly activeRoute: ActivatedRoute,
    private readonly screenService: ScreensService
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

    this.getEmployee();
  }

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

  public addImage = (): void => {
    const inputFile =
      document.querySelector<HTMLInputElement>('input[type=file]');
    inputFile?.click();
  };

  public removeFiles = (): void => {};

  public onSubmit = (): void => {};

  private getEmployee = () => {
    this.activeRoute.params.subscribe(
      (params) => (this.employeeId = params['id'])
    );

    this.employeeService.findById(Number(this.employeeId)).subscribe({
      next: (res) => {
        this.setDataForm(res);
        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  private setDataForm = (data: IEmploye): void => {
    this.form.setValue({
      name: data.name,
      screens: [1],
      email: data.email,
      password: data.password,
    });
  };

  private getAllScreens = (): void => {
    this.screenService.findAllScreens().subscribe({
      next: (res) => {},

      error: (err) => {},
    });
  };
}
