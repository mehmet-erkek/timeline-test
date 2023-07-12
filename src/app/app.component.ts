
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
  addStart?: Date
  addEnd  ?: Date
  updateInput: string = ""
  updateStart?: Date
  updateEnd  ?: Date

  addDialog: boolean = false
  addItemObj !: any;
  addCallback !: any;

  updDialog: boolean = false;
  updItemObj !: any;
  updCallback !: any;

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.getTimelineData();
    this.getTimelineGroups();
    this.getOptions();
  }

  ngOnInit() {
    this.timeline = new Timeline(this.timelineContainer.nativeElement, this.data, this.groups, this.options);
    console.log(this.data)
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

    console.log(this.data)
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
        this.addCallback = callback
        console.log("onAdd Item :", item, "onAdd Callback", callback)
        item.content = this.addInput
        this.addStart = item.start
        this.addItemObj = item
        // callback(item);



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
        this.updateStart = item.start
        this.updateEnd = item.end
        this.updDialog = true

        this.updItemObj = item
        this.updCallback = callback
        console.log("onUpdate Item :", item, "onUpdate Callback", callback)
        item.content = this.updateInput

       // callback(item);

      },
      onRemove: (item: any, callback: any) => {

        console.log("onRemove Item :", item, "onRemove Callback", callback)
        callback(item);
      }
    };

  }

  addClick() {
    
    this.addItemObj.content = this.addInput
    this.addItemObj.start = this.addStart
    this.addItemObj.end = this.addEnd
    this.addCallback(this.addItemObj)
    console.log('Ha burdayım!!', this.addItemObj)
    this.addDialog = false
  }

  updClick() {
    
    this.updItemObj.content = this.updateInput
    this.updItemObj.start = this.updateStart
    this.updItemObj.end = this.updateEnd
    this.updCallback(this.updItemObj)
    console.log('Ha burdayım!!', this.updItemObj)
    this.addDialog = false
  }
}

