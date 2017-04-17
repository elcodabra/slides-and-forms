import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../services/data.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private project: { name: string, content: string } = { name: '', content: '' };

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => params['project_id'] ? this.dataService.getProject(params['project_id']) : Promise.reject("new object") )
      .subscribe(
        data => { this.project = data; this.project.content = JSON.stringify(data.content); },
        error => console.log("project error:", error),
      );
  }

}
