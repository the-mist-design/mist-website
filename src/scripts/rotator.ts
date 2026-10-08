/**
 * Auto-rotating slides with a progress indicator.
 *
 * Markup:
 *   [data-rotator data-interval="3000"]
 *     [data-slide] …            one per state (gets .is-active)
 *     [data-progress]           optional bar, width grows 0 → 100%
 *     [data-goto] …             optional buttons, one per slide (gets .is-active)
 *       [data-stroke]           optional SVG shape inside a goto, stroke draws 0 → 100%
 *
 * Timing pauses while the tab is hidden; after the last slide it starts again.
 */
export function initRotators(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-rotator]').forEach((root) => {
    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
    const gotos = Array.from(root.querySelectorAll<HTMLElement>('[data-goto]'));
    const bar = root.querySelector<HTMLElement>('[data-progress]');
    const interval = Number(root.dataset.interval) || 3000;
    if (slides.length < 2) return;

    let index = 0;
    let elapsed = 0;
    let last = performance.now();

    const show = (i: number) => {
      index = i;
      elapsed = 0;
      slides.forEach((s, k) => {
        const active = k === i;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', String(!active));
      });
      gotos.forEach((g, k) => {
        g.classList.toggle('is-active', k === i);
        g.setAttribute('aria-pressed', String(k === i));
      });
    };

    const render = (p: number) => {
      if (bar) bar.style.width = `calc(2px + (100% - 2px) * ${p})`;
      gotos.forEach((g, k) => {
        const stroke = g.querySelector<SVGGeometryElement>('[data-stroke]');
        if (stroke) stroke.style.strokeDashoffset = String(k === index ? 100 * (1 - p) : 100);
      });
    };

    gotos.forEach((g, k) => g.addEventListener('click', () => show(k)));

    const tick = (now: number) => {
      let dt = now - last;
      last = now;
      if (dt > 250 || document.hidden) dt = 0; // tab was hidden or throttled: don't jump ahead
      elapsed += dt;
      if (elapsed >= interval) show((index + 1) % slides.length);
      render(Math.min(elapsed / interval, 1));
      requestAnimationFrame(tick);
    };

    show(0);
    requestAnimationFrame(tick);
  });
}
