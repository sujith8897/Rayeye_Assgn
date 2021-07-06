import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import Date from 'src/app/models/dates';
declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dates: Date[] = [];
  dict = new Map<string, number>();

  constructor(
    private webservice: WebService
  ) { }

  ngOnInit(): void {
    this.webservice.get()
      .subscribe((employe) => {

        this.dates = employe;
        for (var date of this.dates) {
          var a = new Date(date.date) + "";
          a = a.slice(4, 15);
          this.dict.set(a, date.count);

        }
        this.change();

      });

  }

  change() {
    const comp = this;

    $(function () {


      // datepicker
      $('#datepicker').datepicker({
        beforeShowDay: function (date: any) {
          var b = date + "";
          b = b.slice(4, 15);

          var count: number = +(comp.dict.get(b) + "");
          if (count >= 1 && count <= 10) {
            return [true, "lightGreen", '0-1'];
          } else if (count > 10) {
            return [true, "darkGreen", 'more than 10'];
          }
          else {
            return [true, 'yellow', '']
          }
        }
      });
    });
  }

}
