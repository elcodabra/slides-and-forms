import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../services/data.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private project_id: number;
  private slide_id: number;
  private project;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.project_id = params['project_id']
        this.slide_id = +params['slide_id']
        return this.dataService.getProject(params['project_id'])
      })
      .subscribe(
        data => this.project = data,
        error => console.log("project error:", error),
      );
  }

}
