import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, ViewEncapsulation, NgZone
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  encapsulation: ViewEncapsulation.None
})
export class Login implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('netCanvas')  netCanvas!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('typeLine1')  typeLine1!:  ElementRef<HTMLSpanElement>;
  @ViewChild('typeLine2')  typeLine2!:  ElementRef<HTMLSpanElement>;
  @ViewChild('typeLine3')  typeLine3!:  ElementRef<HTMLSpanElement>;
  @ViewChild('typeCursor') typeCursor!: ElementRef<HTMLSpanElement>;

  form!: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;
  showSuccess = false;
  successRole = '';

  private ctx!: CanvasRenderingContext2D;
  private nodes: any[] = [];
  private animFrame: any;
  private typeTimers: any[] = [];
  private resizeObserver: any;
  private frameCount = 0;
  private animPaused = false;

  demoAccounts = [
    { label: 'Admin',       email: 'admin@marketplace.com', password: 'admin123' },
    { label: 'Enterprise',  email: 'slim@entreprise.tn',    password: 'demo123' },
    { label: 'Transporter', email: 'karim@transport.tn',    password: 'demo123' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    document.body.className = 'theme-auth';
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    const user = this.authService.currentUser;
    if (user) this.router.navigate(['/' + user.role]);
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.startTypewriter();
  }

  /* ── PARTICLE NETWORK ── */
  private initCanvas(): void {
    const canvas = this.netCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.buildNodes();
    this.animate();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.buildNodes();
    });
    this.resizeObserver.observe(canvas.parentElement!);
  }

  private resizeCanvas(): void {
    const el = this.netCanvas.nativeElement;
    el.width  = el.parentElement!.offsetWidth;
    el.height = el.parentElement!.offsetHeight;
  }

  private buildNodes(): void {
    const { width: W, height: H } = this.netCanvas.nativeElement;
    /* Hard cap at 35 — above this the O(n²) connection loop gets expensive */
    const count = Math.min(35, Math.floor(W * H / 14000));
    this.nodes = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .28,
      vy: (Math.random() - .5) * .28,
      r:  Math.random() * 1.6 + .7,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  private animate(): void {
    /* Pause the heavy canvas work while the auth request is in flight
       so the main thread is free for Angular change detection */
    if (this.animPaused) {
      this.animFrame = requestAnimationFrame(() => this.animate());
      return;
    }

    this.frameCount++;
    const canvas = this.netCanvas.nativeElement;
    const { width: W, height: H } = canvas;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);

    /* Move nodes + draw dots */
    for (const n of this.nodes) {
      n.x += n.vx; n.y += n.vy; n.pulse += .016;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      const alpha = .18 + Math.sin(n.pulse) * .08;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,230,118,${alpha.toFixed(2)})`;
      ctx.fill();
    }

    /* Draw connections only every 2nd frame — halves cost, imperceptible visually */
    if (this.frameCount % 2 === 0) {
      /* Batch ALL line segments into a single path per opacity bucket
         instead of calling ctx.stroke() once per pair */
      const buckets: Record<string, { path: Path2D }> = {};

      for (let i = 0; i < this.nodes.length; i++) {
        const a = this.nodes[i];
        for (let j = i + 1; j < this.nodes.length; j++) {
          const b = this.nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) { /* 120² — skip Math.hypot entirely */
            const opacity = ((1 - Math.sqrt(d2) / 120) * .12).toFixed(2);
            if (!buckets[opacity]) buckets[opacity] = { path: new Path2D() };
            buckets[opacity].path.moveTo(a.x, a.y);
            buckets[opacity].path.lineTo(b.x, b.y);
          }
        }
      }

      ctx.lineWidth = .6;
      for (const [opacity, { path }] of Object.entries(buckets)) {
        ctx.strokeStyle = `rgba(0,230,118,${opacity})`;
        ctx.stroke(path);
      }
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  /* ── TYPEWRITER — runs OUTSIDE Angular zone, writes directly to DOM ── */
  private startTypewriter(): void {
    /* ngZone.runOutsideAngular means zero change detection per character */
    this.zone.runOutsideAngular(() => {
      const lines: [ElementRef<HTMLSpanElement>, string, number][] = [
        [this.typeLine1, 'Industrial', 48],
        [this.typeLine2, 'Circular',   48],
        [this.typeLine3, 'Economy',    55],
      ];

      let lineIdx = 0;
      let charIdx = 0;
      let startDelay: any;

      const tick = () => {
        if (lineIdx >= lines.length) {
          /* show cursor — one tiny re-entry into zone */
          this.zone.run(() => {
            if (this.typeCursor?.nativeElement) {
              this.typeCursor.nativeElement.style.opacity = '1';
            }
          });
          return;
        }

        const [elRef, text, speed] = lines[lineIdx];
        elRef.nativeElement.textContent = text.slice(0, charIdx + 1);
        charIdx++;

        if (charIdx >= text.length) {
          lineIdx++;
          charIdx = 0;
          const t = setTimeout(tick, lineIdx < lines.length ? 90 : 0);
          this.typeTimers.push(t);
        } else {
          const t = setTimeout(tick, speed);
          this.typeTimers.push(t);
        }
      };

      startDelay = setTimeout(tick, 600);
      this.typeTimers.push(startDelay);
    });
  }

  /* ── FORM ── */
  fillDemo(account: { email: string; password: string }): void {
    this.form.patchValue({ email: account.email, password: account.password });
    this.errorMessage = '';
  }

  get emailInvalid(): boolean {
    const c = this.form.get('email');
    return !!(c?.invalid && c?.touched);
  }

  get passwordInvalid(): boolean {
    const c = this.form.get('password');
    return !!(c?.invalid && c?.touched);
  }

  /* Fully kills the RAF loop — called on success before navigation */
  private stopCanvas(): void {
    cancelAnimationFrame(this.animFrame);
    this.animFrame = null;
    /* blank the canvas so nothing lingers during route transition */
    if (this.ctx) {
      const c = this.netCanvas?.nativeElement;
      if (c) this.ctx.clearRect(0, 0, c.width, c.height);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMessage = '';
    /* Pause canvas while request is in flight */
    this.animPaused = true;
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        if (res.success) {
          const user = this.authService.currentUser!;
          const roleLabel: Record<string, string> = {
            admin:       'Administrator Portal',
            enterprise:  'Enterprise Portal',
            transporter: 'Transporter Portal',
          };
          this.successRole = 'Redirecting to ' + (roleLabel[user.role] || 'Portal') + '...';
          this.showSuccess = true;
          /* KILL the canvas RAF loop completely before navigating
             so it doesn't compete with the incoming route's bootstrap */
          this.stopCanvas();
          this.typeTimers.forEach(clearTimeout);
          /* Short delay only to show the success state, then go */
          setTimeout(() => this.router.navigate(['/' + user.role]), 800);
        } else {
          this.errorMessage = 'Incorrect email or password.';
          this.loading = false;
          this.animPaused = false;
        }
      },
      error: (err) => {
        this.errorMessage = err?.status === 401
          ? 'Incorrect email or password.'
          : 'Server error. Please try again.';
        this.loading = false;
        this.animPaused = false;
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
    this.typeTimers.forEach(clearTimeout);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }
}
