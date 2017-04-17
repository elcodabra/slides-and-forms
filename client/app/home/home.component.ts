import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects = [];
  isLoading = true;

  project = {};
  isEditing = false;

  addProjectForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private http: Http,
              private router: Router,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProjects();

    this.addProjectForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getProjects() {
    this.dataService.getProjects().subscribe(
      data => this.projects = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProject() {
    this.dataService.addProject(this.addProjectForm.value).subscribe(
      res => {
        const newProject = res.json();
        this.projects.push(newProject);
        this.addProjectForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(project) {
    this.router.navigate(['/edit', project._id]);
    // this.isEditing = true;
    // this.project = project;
  }

  cancelEditing() {
    this.isEditing = false;
    this.project = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the projects to reset the editing
    this.getProjects();
  }

  editProject(project) {
    this.dataService.editProject(project).subscribe(
      res => {
        this.isEditing = false;
        this.project = project;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteProject(project) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteProject(project).subscribe(
        res => {
          const pos = this.projects.map(elem => { return elem._id; }).indexOf(project._id);
          this.projects.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
