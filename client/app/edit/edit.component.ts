import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../services/data.service";
import { ToastComponent } from "../shared/toast/toast.component";
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private slide_id: number = 0;
  project: { name: string, content: Array<any> } = { name: '', content: [{}] };

  constructor(private route: ActivatedRoute,
              public toast: ToastComponent,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => params['project_id'] ? this.dataService.getProject(params['project_id']) : Promise.reject("new object") )
      .subscribe(
        data => { this.project = data; this.project.content = data.content.map((item) => { item.form = JSON.stringify(item.form); return item; }) },
        error => console.log("project error:", error),
      );
  }

  editProject(project) {
    /* TODO: remove JSON.parse and JSON.stringify */
    project.content = project.content.map((item) => { item.form = JSON.parse(item.form); return item; });
    this.dataService.editProject(project).subscribe(
      res => {
        project.content = project.content.map((item) => { item.form = JSON.stringify(item.form); return item; });
        this.project = project;
        this.toast.setMessage('Project edited successfully.', 'success');
      },
      error => {
        console.log(error)
        this.toast.setMessage('error', 'error')
      }
    );
  }

  addSlide() {
    this.project.content.push({ num: this.slide_id + 1 })
  }

  nextSlide() {
    this.slide_id += 1
  }

  previousSlide() {
    this.slide_id -= 1
  }

}
