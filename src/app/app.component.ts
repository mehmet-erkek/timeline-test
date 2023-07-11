
import { Component, OnInit, ViewChild } from "@angular/core";
import { ElementRef } from '@angular/core';
import { Timeline } from 'vis-timeline';
import { DataSet } from "vis-data";
import { ConfirmEventType, ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  timeline?: Timeline;
  options!: {};
  data: any;
  groups: any;
  addInput: string = ""
  updateInput: string = ""

  addDialog: boolean = false
  updDialog: boolean = false;

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.getTimelineData();
    this.getTimelineGroups();
    this.getOptions();
  }

  ngOnInit() {
    this.timeline = new Timeline(this.timelineContainer.nativeElement, this.data, this.groups, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);

  }

  getTimelineGroups() {
    // GROUPS SATIRLARI TEMSİL EDİYOR
    this.groups = new DataSet([
      { id: 1, content: '1.Grup' },
      { id: 2, content: '2.Grup' },
      { id: 3, content: '3.Grup' },
      { id: 4, content: '4.Grup' }
    ]);
  }

  getTimelineData() {
    // this.data TİMELİNE IN İÇİNİ DOLDURUR
    // 
    this.data = new DataSet();
    var count = 100;
    var order = 1;
    var truck = 1;
    var max: any = 0.02;

    // create 4 truck groups, then order inside each group
    for (var j = 0; j < 4; j++) {
      var date = new Date();
      for (var i = 0; i < count / 4; i++) {

        date.setHours(date.getHours() + 4 * Math.random());
        var start = new Date(date);

        date.setHours(date.getHours() + 2 + Math.floor(Math.random() * 4));
        var end = new Date(date);

        this.data.add({
          id: order,
          group: truck,
          editable: { updateTime: true, updateGroup: false },
          start: start,
          end: end,
          content: 'Order ' + order
        });

        order++;
      }
      truck++;
    }
  }

  getOptions() {
    this.options = {
      start: new Date(),
      end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
      editable: true,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'top',
      onAdd: (item: any, callback: any) => {

        this.addDialog = true

        this.confirmationService.confirm({
          message: 'Enter text content for new item:',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

            console.log("onMove Item :", item, "onMove Callback", callback)
            item.content = this.addInput
            callback(item);
            this.addDialog = false
          },
          reject: (type: ConfirmEventType) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                this.addDialog = false
                break;
              case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                this.addDialog = false
                break;
            }
          }
        });

      },
      onMove: (item: any, callback: any) => {
        console.log("onMove Item :", item, "onMove Callback", callback)
        callback(item);
      },
      onMoving: (item: any, callback: any) => {
        console.log("onMoving Item :", item, "onMoving Callback", callback)
        callback(item);
      },
      onUpdate: (item: any, callback: any) => {

        this.updateInput = item.content
        this.updDialog = true

        this.confirmationService.confirm({
          message: 'Enter text content for new item:',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

            console.log("onUpdate Item :", item, "onUpdate Callback", callback)
            item.content = this.updateInput
            callback(item);
            this.updDialog = false
          },
          reject: (type: ConfirmEventType) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                this.updDialog = false
                break;
              case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                this.updDialog = false
                break;
            }
          }
        });
      },
      onRemove: (item: any, callback: any) => {

        console.log("onRemove Item :", item, "onRemove Callback", callback)
        callback(item);
      }
    };

  }

}

