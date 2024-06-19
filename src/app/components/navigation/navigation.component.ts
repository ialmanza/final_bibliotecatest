import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [DashboardComponent]
})
export class NavigationComponent {

}
