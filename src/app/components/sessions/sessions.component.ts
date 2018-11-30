import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../../service/link.service';
import { FilterService } from '../../service/filter.service';
import { PaginationService } from '../../service/pagination.service';
import { NotificationService } from '../../service/notification.service';
import { FilterStoreService } from '../../service/filter-store.service';
import { WordTranslateService } from '../../service/word-translate.service';
import * as moment from 'moment';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.component.html'
})

export class SessionsComponent implements OnChanges {
    @HostBinding('class.app-component') appComponent = true;
    @Input() settings;
    @Input() eventType;
    @Input() filterTime;
    @Input() projectFilter;
    next: string;
    previous: string;
    pageSummary: string;
    currentOptions = {};
    loading = true;
    showType: any;
    events: any[] = [];
    constructor(
        private router: Router,
        private filterService: FilterService,
        private linkService: LinkService,
        private paginationService: PaginationService,
        private notificationService: NotificationService,
        private filterStoreService: FilterStoreService,
        private wordTranslateService: WordTranslateService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.showType = this.settings['summary'] ? this.settings['showType'] : !this.filterService.getEventType();
        this.get();
    }

    canRefresh(data) {
        if (!!data && data['type'] === 'PersistentEvent') {
            // We are already listening to the stack changed event... This prevents a double refresh.
            if (!data['deleted']) {
                return false;
            }

            // Refresh if the event id is set (non bulk) and the deleted event matches one of the events.
            if (!!data['id'] && !!this.events) {
                return this.events.filter(function (e) { return e.id === data.id; }).length > 0;
            }

            return this.filterService.includedInProjectOrOrganizationFilter({ organizationId: data['organization_id'], projectId: data['project_id'] });
        }

        if (!!data && data['type'] === 'Stack') {
            return this.filterService.includedInProjectOrOrganizationFilter({ organizationId: data['organization_id'], projectId: data['project_id'] });
        }

        if (!!data && data['type'] === 'Organization' || data['type'] === 'Project') {
            return this.filterService.includedInProjectOrOrganizationFilter({organizationId: data['id'], projectId: data['id']});
        }

        return !data;
    }

    async get(options?, isRefresh?) {
        if (isRefresh && !this.canRefresh(isRefresh)) {
            return;
        }
        const onSuccess = (response, link) => {
            this.events = JSON.parse(JSON.stringify(response));
            for (let i = 0; i < this.events.length; i ++) {
                this.events[i].duration = this.getDuration(this.events[i]);
            }
            const links = this.linkService.getLinksQueryParameters(link);
            this.previous = links['previous'];
            this.next = links['next'];

            this.pageSummary = this.paginationService.getCurrentPageSummary(response, this.currentOptions['page'], this.currentOptions['limit']);

            if (this.events.length === 0 && this.currentOptions['page'] && this.currentOptions['page'] > 1) {
                return this.get();
            }

            return this.events;
        };

        this.loading = true;
        this.events = [];
        this.currentOptions = options || this.settings.options;

        try {
            const res = await this.settings.get(this.currentOptions).toPromise();
            onSuccess(res.body, res.headers.get('link'));
            this.loading = false;
            return this.events;
        } catch (err) {
            this.loading = false;
            this.notificationService.error('', await this.wordTranslateService.translate('Error Occurred!'));
            return err;
        }
    }

    getDuration(ev) {
        // TODO: this binding expression can be optimized.
        if (ev.data.SessionEnd) {
            return ev.data.Value || 0;
        }

        return moment().diff(ev.date, 'seconds');
    }

    open(id, event) {
        const openInNewTab = (event.ctrlKey || event.metaKey || event.which === 2);
        if (openInNewTab) {
            window.open(`/event/${id}`, '_blank');
        } else {
            this.router.navigate([`/event/${id}`]);
        }

        event.preventDefault();
    }

    nextPage() {
        return this.get(this.next);
    }

    previousPage() {
        return this.get(this.previous);
    }

    hasFilter() {
        return this.filterService.hasFilter();
    }
}