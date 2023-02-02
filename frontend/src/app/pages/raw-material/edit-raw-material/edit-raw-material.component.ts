import { Component, OnInit } from '@angular/core';
import { RawMaterialComponent } from '../raw-material.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-raw-material',
  templateUrl: '../raw-material.component.html',
  styleUrls: ['../raw-material.component.scss'],
})
export class EditRawMaterialComponent
  extends RawMaterialComponent
  implements OnInit
{
  private rawMaterialId: number;
  constructor(private readonly activeRoute: ActivatedRoute) {
    super(new FormBuilder());
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.getParamRoute();
    this.titlePage = 'Listar Matéria';
    this.getInfoRawMaterial();
  }

  private getParamRoute = (): void => {
    this.activeRoute.params.subscribe(
      (param) => (this.rawMaterialId = param['id'])
    );
  };

  private getInfoRawMaterial = (): void => {
    this.rawMaterialService.getRawMaterialById(this.rawMaterialId).subscribe({
      next: (res) => {
        this.form.setValue({
          name: res.name,
          price: res.averagePrice,
          qtd: res.quantityGg,
          measure: this.listMeasure,
        });
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  public override onSubmit = () => {
    this.rawMaterialService
      .update(this.rawMaterialId, this.form.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },

        error: (err) => {
          console.log(err);
        },
      });
  };
}
