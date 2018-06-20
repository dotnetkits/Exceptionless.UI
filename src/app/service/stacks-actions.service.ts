import { Injectable } from '@angular/core';
import { FilterService } from "./filter.service";
import { SearchService } from "./search.service";
import { StackService } from "./stack.service";
import { NotificationService } from "./notification.service";
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class StacksActionsService {

    constructor(
        private filterService: FilterService,
        private searchService: SearchService,
        private notificationService: NotificationService,
        private stackService: StackService,
    ) {
    }

    executeAction(ids, action, onSuccess, onFailure) {
        return new Promise((resolve, reject) => {
            this.searchService.validate(this.filterService.getFilter()).then(
                (res) => {
                    onSuccess();

                    resolve(
                        _.chunk(ids, 10).reduce(function (previous, item) {
                            return previous.then(action(item.join(',')));
                        },)
                    );
                },
                (err) => {
                    onFailure();

                    reject(err);
                }
            );
        });
    };

    deleteAction: object = {
        name: 'Delete',
        run: (ids) => {
            let onSuccess = () => {
                this.notificationService.info('Successfully queued the stacks for deletion.','Success');
            };

            let onFailure = () => {
                this.notificationService.error('An error occurred while deleting the stacks.', 'Failed');
            };

            let runFunction = () => {
                this.executeAction(ids, this.stackService.remove(), onSuccess(), onFailure());
            };

            /*this.modalDialogService.openDialog(this.viewRef, {
                title: 'Delete',
                childComponent: ConfirmDialogComponent,
                actionButtons: [
                    { text: 'Cancel', buttonClass: 'btn btn-default', onAction: () => true },
                    { text: 'DELETE STACKS', buttonClass: 'btn btn-primary btn-dialog-confirm btn-danger', onAction: () => runFunction() }
                ]
            });*/
        }
    };

    markFixedAction: object = {
        name: 'Mark Fixed',
        run: (ids) => {
            /*implement later Frank Lin*/

            let onSuccess = () => {
                this.notificationService.info('Successfully queued the stacks to be marked as fixed.','Success');
            };

            let onFailure = () => {
                this.notificationService.error('An error occurred while marking stacks as fixed.', 'Failed');
            };

            let runFunction = () => {
                this.executeAction(ids, (ids) => {return this.stackService.markFixed(ids, '');}, onSuccess(), onFailure());
            };

            /*this.modalDialogService.openDialog(this.viewRef, {
                title: 'Delete',
                childComponent: ConfirmDialogComponent,
                actionButtons: [
                    { text: 'Cancel', buttonClass: 'btn btn-default', onAction: () => true },
                    { text: 'DELETE STACKS', buttonClass: 'btn btn-primary btn-dialog-confirm btn-danger', onAction: () => runFunction() }
                ]
            });*/
        }
    };

    markNotFixedAction: object = {
        name: 'Mark Not Fixed',
        run: (ids) => {
            let onSuccess = () => {
                this.notificationService.info('Successfully queued the stacks to be marked as not hidden.','Success');
            };

            let onFailure = () => {
                this.notificationService.error('An error occurred while marking stacks as not hidden.', 'Failed');
            };

            return this.executeAction(ids, this.stackService.markNotFixed(), onSuccess(), onFailure());
        }
    };

    markHiddenAction: object = {
        name: 'Mark Hidden',
        run: (ids) => {
            let onSuccess = () => {
                this.notificationService.info('Successfully queued the stacks to be marked as not hidden.','Success');
            };

            let onFailure = () => {
                this.notificationService.error('An error occurred while marking stacks as not hidden.', 'Failed');
            };

            return this.executeAction(ids, this.stackService.markHidden(), onSuccess(), onFailure());
        }
    };

    markNotHiddenAction: object = {
        name: 'Mark Not Hidden',
        run: (ids) => {
            let onSuccess = () => {
                this.notificationService.info('Successfully queued the stacks to be marked as not hidden.','Success');
            };

            let onFailure = () => {
                this.notificationService.error('An error occurred while marking stacks as not hidden.', 'Failed');
            };

            return this.executeAction(ids, this.stackService.markNotHidden(), onSuccess(), onFailure());
        }
    };

    getActions() {
        return [this.markFixedAction, this.markNotFixedAction, this.markHiddenAction, this.markNotHiddenAction, this.deleteAction];
    }
}