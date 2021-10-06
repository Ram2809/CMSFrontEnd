import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UnitStatus } from 'src/app/model/unit-status';
import { UnitStatusService } from 'src/app/services/unit-status.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-update-topic-status',
  templateUrl: './update-topic-status.component.html',
  styleUrls: ['./update-topic-status.component.css']
})
export class UpdateTopicStatusComponent implements OnInit {
  public unitStatus: UnitStatus = new UnitStatus();
  constructor(public dialogRef: MatDialogRef<UpdateTopicStatusComponent>,
    private unitStatusService: UnitStatusService) { }

  ngOnInit(): void {
    let topicStatusDetail: string = String(localStorage.getItem('topicStatus'));
    this.unitStatus = JSON.parse(topicStatusDetail);
    console.log(this.unitStatus);
  }
  updateStatus() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.unitStatusService.updateUnitStatus(Number(this.unitStatus.id), this.unitStatus).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
