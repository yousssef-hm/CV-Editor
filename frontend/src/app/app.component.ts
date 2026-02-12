import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>📝 Éditeur de CV</h1>
        <p>Créez et gérez vos CV en ligne</p>
      </header>
      
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="app-footer">
        <p>&copy; 2025 CV Editor - Edited By Hmama Youssef</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .app-header h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .app-header p {
      margin: 0.5rem 0 0 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      background: #f5f7fa;
    }

    .app-footer {
      background: #2d3748;
      color: white;
      padding: 1.5rem;
      text-align: center;
    }

    .app-footer p {
      margin: 0;
    }
  `]
})
export class AppComponent {
  title = 'CV Editor';
}