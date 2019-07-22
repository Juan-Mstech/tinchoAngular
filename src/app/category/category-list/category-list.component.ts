import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'color', 'actions'];

  categories: Category[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories = this.route.snapshot.data.categories;
  }

  addAction = () => this.router.navigate(['new'], { relativeTo: this.route });
  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });

  onDelete = (id) => this.categoryService.delete(id).subscribe(this.getAllCategories);

  getAllCategories = () => this.categoryService.getAll().subscribe((res) => this.categories = res);
}
