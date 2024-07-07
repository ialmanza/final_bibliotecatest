import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavigationComponent],
    providers: [HttpClient],
})
export class AppComponent {
  title = 'final_bibliotecatest';
}
