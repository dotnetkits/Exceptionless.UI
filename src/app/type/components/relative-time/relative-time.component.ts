import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-relative-time',
    templateUrl: './relative-time.component.html',
    styleUrls: ['./relative-time.component.less']
})
export class RelativeTimeComponent implements OnInit {
    @Input() date;
    @Input() to;
    text: any = '';

    constructor() {
    }

    ngOnInit() {
        this.setRelativeTimeText();
    }

    setRelativeTimeText() {
        let to = moment(this.to);
        let date = moment(this.date);

        let isValid = !!this.to && to.isValid() && to.year() > 1 && !!this.date && date.isValid() && date.year() > 1;

        this.text = isValid ? date.to(to, true) : 'never';
    };
}
