import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ToastrModule } from 'ngx-toastr';
import { LockerModule } from 'angular-safeguard';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgxAnalyticsModule } from 'ngx-analytics';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { ClipboardModule } from 'ngx-clipboard';
import 'd3';
import 'rickshaw';
import { RickshawModule } from 'ng2-rickshaw';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaterangepickerModule } from 'angular-2-daterangepicker';
import { ChecklistModule } from 'angular-checklist';

import { GlobalVariables } from './global-variables';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { TokenInterceptor } from './service/token.interceptor';
import { AuthGuardService } from './service/auth-guard.service';
import { HeaderComponent } from './components/includes/header/header.component';
import { SidebarComponent } from './components/includes/sidebar/sidebar.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { ProjectComponent } from './components/project/project.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { AccountManageComponent } from './components/account-manage/account-manage.component';
import { OpenDirective } from './directives/open.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecentComponent } from './components/recent/recent.component';
import { UsersComponent } from './components/users/users.component';
import { NewComponent } from './components/new/new.component';
import { FrequentComponent } from './components/frequent/frequent.component';
import { OrganizationNotificationComponent } from './components/organization-notification/organization-notification.component';
import { OrganizationService } from './service/organization.service';
import { FilterService } from './service/filter.service';
import { RickshawComponent } from './components/rickshaw/rickshaw.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ProjectNewComponent } from './components/project/project-new/project-new.component';
import { OrganizationListComponent } from './components/organization/organization-list/organization-list.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { OrganizationEditComponent } from './components/organization/organization-edit/organization-edit.component';
import { CustomDateRangeDialogComponent } from './dialogs/custom-date-range-dialog/custom-date-range-dialog.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StacksComponent } from './components/stacks/stacks.component';
import { EventsComponent } from './components/events/events.component';
import { TimeagoComponent } from './components/timeago/timeago.component';
import { RelativeTimeComponent } from './components/relative-time/relative-time.component';
import { ActiveDirective } from './directives/active.directive';
import { StackComponent } from './components/stack/stack.component';
import { AddReferenceDialogComponent } from './dialogs/add-reference-dialog/add-reference-dialog.component';
import { ChangePlanDialogComponent } from './dialogs/change-plan-dialog/change-plan-dialog.component';
import { ObjNgForPipe } from './pipes/obj-ng-for.pipe';
import { EventComponent } from './components/event/event.component';
import { EventTabsComponent } from './components/event/tabs/event-tabs/event-tabs.component';
import { DurationComponent } from './components/duration/duration.component';
import { StackTraceComponent } from './components/stack-trace/stack-trace.component';
import { SimpleStackTraceComponent } from './components/simple-stack-trace/simple-stack-trace.component';
import { ExtendedDataItemComponent } from './components/event/extended-data-item/extended-data-item.component';
import { HasPropPipe } from './pipes/has-prop.pipe';
import { ProjectsComponent } from './components/projects/projects.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { UserComponent } from './components/user/user.component';
import { AddConfigurationDialogComponent } from './dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { AddWebHookDialogComponent } from './dialogs/add-web-hook-dialog/add-web-hook-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { AddOrganizationDialogComponent } from './dialogs/add-organization-dialog/add-organization-dialog.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionComponent } from './components/session/session.component';
import { RateLimitComponent } from './components/rate-limit/rate-limit.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

export const AuthConfig = {
    defaultHeaders: {'Content-Type': 'application/json'},
    providers: {
        google: { clientId: '' },
        facebook: { clientId: '' }
    },
    tokenName: 'token',
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        SignupComponent,
        HeaderComponent,
        SidebarComponent,
        SearchFilterComponent,
        ProjectFilterComponent,
        DateFilterComponent,
        ProjectComponent,
        OrganizationComponent,
        AccountManageComponent,
        OpenDirective,
        DashboardComponent,
        RecentComponent,
        UsersComponent,
        NewComponent,
        FrequentComponent,
        OrganizationNotificationComponent,
        RickshawComponent,
        StacksComponent,
        EventsComponent,
        ConfirmDialogComponent,
        ProjectListComponent,
        ProjectNewComponent,
        OrganizationListComponent,
        ProjectEditComponent,
        OrganizationEditComponent,
        CustomDateRangeDialogComponent,
        SummaryComponent,
        TimeagoComponent,
        RelativeTimeComponent,
        ActiveDirective,
        StackComponent,
        AddReferenceDialogComponent,
        ChangePlanDialogComponent,
        ObjNgForPipe,
        EventComponent,
        EventTabsComponent,
        DurationComponent,
        StackTraceComponent,
        SimpleStackTraceComponent,
        ExtendedDataItemComponent,
        HasPropPipe,
        ProjectsComponent,
        InvoicesComponent,
        UserComponent,
        AddConfigurationDialogComponent,
        AddWebHookDialogComponent,
        AddUserDialogComponent,
        AddOrganizationDialogComponent,
        PaymentComponent,
        SessionsComponent,
        SessionComponent,
        RateLimitComponent,
        ResetPasswordComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        LockerModule,
        RickshawModule,
        ModalDialogModule.forRoot(),
        NgbModule.forRoot(),
        DaterangepickerModule,
        ChecklistModule,
        Ng2UiAuthModule.forRoot(AuthConfig),
        HotkeyModule.forRoot(),
        NgxAnalyticsModule.forRoot([NgxAnalyticsGoogleAnalytics]),
        ClipboardModule,
    ],
    providers: [
        GlobalVariables,
        AuthGuardService,
        OrganizationService,
        FilterService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ConfirmDialogComponent, CustomDateRangeDialogComponent, AddReferenceDialogComponent, AddOrganizationDialogComponent]
})

export class AppModule {
}
