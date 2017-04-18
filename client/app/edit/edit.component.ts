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
  private project: { name: string, content: string } = { name: '', content: '' };

  constructor(private route: ActivatedRoute,
              public toast: ToastComponent,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => params['project_id'] ? this.dataService.getProject(params['project_id']) : Promise.reject("new object") )
      .subscribe(
        data => { this.project = data; this.project.content = JSON.stringify(data.content); },
        error => console.log("project error:", error),
      );
  }

  editProject(project) {
    project.content = JSON.parse(project.content);
    this.dataService.editProject(project).subscribe(
      res => {
        project.content = JSON.stringify(project.content);
        this.project = project;
        this.toast.setMessage('Project edited successfully.', 'success');
      },
      error => {
        console.log(error)
        this.toast.setMessage('error', 'error')
      }
    );
  }

}
