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
import { IScreen } from 'src/app/interfaces/IScreens-interface';
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
  @Output() public titleSucess: string = 'Atualizado';
  @Output() public messageSucess: string =
    'Dados do funcionário Atualizado com sucesso!';
  @Output() public messageError: string =
    'Não foi possível atualizar os dados funcionário. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  private files: Array<File | IPhotocategory> = [];
  public form: FormGroup;
  public filesThumb: Array<string> = [];
  public allScreens: IScreen[] = [];
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
      screeens: ['', [Validators.required]],
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
    this.getAllScreens();
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

  public onSubmit = (): void => {
    const screens = this.form.value.screeens.map((e: IScreen) => e.id);
    this.form.value.screeens = screens;
    this.employeeService.update(this.employeeId, this.form.value).subscribe({
      next: (res) => {
        if (this.files.length) {
          this.createImage(res.id!);
          return;
        }

        this.eventSubjectSucess.next();
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = err.error.message;
      },
    });
  };

  public createImage = (id: number) => {
    this.employeeService.registerPhoto(id, this.files).subscribe({
      next: (res) => {
        this.eventSubjectSucess.next();
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = err.error.message;
      },
    });
  };

  public removeFiles = (): void => {
    if ('id' in this.files[0]) {
      const id = this.files[0].id;
      this.employeeService.deletePhoto(id!).subscribe({
        next: (res) => {
          this.files = [];
          this.filesThumb = [];
        },

        error: (err) => {
          window.scroll(0, 0);
          this.eventSubjectError.next();
          this.messageError = 'Não foi possível excluir a foto do usuário.';
        },
      });
    }
  };

  private getEmployee = (): void => {
    this.activeRoute.params.subscribe(
      (params) => (this.employeeId = params['id'])
    );

    this.employeeService.findById(Number(this.employeeId)).subscribe({
      next: (res) => {
        this.setDataForm(res);
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError =
          'Não foi possível carregar as informações do usuário.';
        window.scroll(0, 0);
      },
    });
  };

  private setDataForm = (data: IEmploye): void => {
    this.form.setValue({
      name: data.name,
      screeens: data.screeens,
      email: data.email,
      password: data.password,
    });

    if (data.EmployeePhoto?.length) {
      this.filesThumb.push(data.EmployeePhoto[0].url);
      this.files.push(data.EmployeePhoto[0]);
    }
  };

  private getAllScreens = (): void => {
    this.screenService.findAllScreens().subscribe({
      next: (res) => {
        this.allScreens = res;
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = 'A pagina não carregou corretamente.';
      },
    });
  };
}
