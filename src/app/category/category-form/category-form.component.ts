import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  isEditing: boolean = false;
  categoryForm: FormGroup;

  category: Category = new Category();

  get name() { return this.categoryForm.get('name'); }
  get color() { return this.categoryForm.get('color'); }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.category = this.route.snapshot.data.category;
      this.name.patchValue(this.category.name);
      this.color.patchValue(this.category.color);
    }
  }

  goToList = () => this.isEditing
    ? this.router.navigate(['../../'], { relativeTo: this.route })
    : this.router.navigate(['../'], { relativeTo: this.route })

    modelCreate = () => this.fb.group({
      name: ['', Validators.required],
      color: ['#FFFFFF']
    })
  
  onSubmit = () => {
    if (!this.categoryForm.valid) { return; }
    const categoryModified = new Category();
    categoryModified.color = this.color.value;
    categoryModified.name = this.name.value;

    this.isEditing
    ? this.categoryService.update(categoryModified)
      .subscribe(this.goToList)
    : this.categoryService.add(categoryModified)
      .subscribe(this.goToList);
  }



}
