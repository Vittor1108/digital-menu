import { Component, OnInit } from '@angular/core';
import { IGetAllCategories } from 'src/app/interfaces/ICategories-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  public allCategories: IGetAllCategories[];
  constructor(private readonly categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories = (): void => {
    this.categoriesService.getAllCategoires().subscribe({
      next: (res) => {
        this.allCategories = res;
        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };
}
