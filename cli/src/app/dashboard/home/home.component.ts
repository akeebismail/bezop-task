import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";
import {APIResponse} from "../../interfaces/response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    active =  0;
    trashed = 0;
    total = 0;

    constructor(private fileService: FileService) { }

    ngOnInit() {
      this.fileService.getFilesCount()
          .subscribe((res: APIResponse) => {
              this.active = res.data.active;
              this.trashed = res.data.trash;
              this.total = this.active + this.trashed;
          }, (err) => {

          })
    }

}
