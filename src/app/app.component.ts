
import { Component, OnInit, ViewChild } from "@angular/core";
import { ElementRef } from '@angular/core';
import { Timeline } from 'vis-timeline';
import { DataSet } from "vis-data";
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

  @ViewChild('timeline', { static: true }) timelineContainer!: ElementRef;

  constructor() {
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
      onAdd(item: any, callback: any) {
        
        console.log("itemneymiş",item,"callbackneymis",callback)
      },
    };

  }

}

function prettyPrompt(title: any, text: any, inputValue: any, callback: any) {
  swal(
    {
      title: title,
      text: text,
      type: "input",
      showCancelButton: true,
      inputValue: inputValue,
    },
    callback
  );
}

function swal(arg0: { title: any; text: any; type: string; showCancelButton: boolean; inputValue: any; }, callback: any) {
  throw new Error("Function not implemented.");
}

