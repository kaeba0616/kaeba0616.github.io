// 시메지 스타일 마스코트 — 팔과 눈동자가 마우스를 따라갑니다.
(function () {
  const svg = document.getElementById('mascotSvg');
  const arm = document.getElementById('arm');
  const pupils = document.querySelectorAll('.pupil');
  const bubble = document.getElementById('mascotBubble');
  if (!svg || !arm) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;

  // SVG 좌표계 기준 어깨/눈 위치 (index.html의 도형 좌표와 일치해야 함)
  const SHOULDER = { x: 92, y: 152 };
  const EYES = [{ x: 116, y: 86 }, { x: 150, y: 86 }];
  const VIEW = { w: 220, h: 200 };

  let targetAngle = 25; // 기본 자세: 살짝 위로 (양수 회전 = 팔이 위로)
  let currentAngle = targetAngle;
  let mouse = null;

  function svgPointToScreen(pt) {
    const r = svg.getBoundingClientRect();
    return {
      x: r.left + (pt.x / VIEW.w) * r.width,
      y: r.top + (pt.y / VIEW.h) * r.height,
    };
  }

  // 팔의 기본 방향은 왼쪽(180°). 커서 방향과의 차이만큼 회전.
  function angleToCursor(originPt) {
    const o = svgPointToScreen(originPt);
    const deg = Math.atan2(mouse.y - o.y, mouse.x - o.x) * 180 / Math.PI;
    // 회전각을 [-120°, 240°) 범위로 정규화: 커서가 오른쪽에 있을 때
    // 아래(-180°)가 아니라 위(+180°)로 돌아가도록.
    let rot = deg - 180;
    while (rot >= 240) rot -= 360;
    while (rot < -120) rot += 360;
    return rot;
  }

  // 팔이 몸통/바닥을 뚫지 않도록 회전 범위 제한 (아래쪽 -35° ~ 위쪽 155°)
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  window.addEventListener('pointermove', (e) => {
    mouse = { x: e.clientX, y: e.clientY };
    targetAngle = clamp(angleToCursor(SHOULDER), -35, 155);
  }, { passive: true });

  function movePupils() {
    if (!mouse) return;
    pupils.forEach((p, i) => {
      const eye = EYES[i];
      const o = svgPointToScreen(eye);
      const a = Math.atan2(mouse.y - o.y, mouse.x - o.x);
      p.setAttribute('cx', eye.x + Math.cos(a) * 2.6);
      p.setAttribute('cy', eye.y + Math.sin(a) * 2.6);
    });
  }

  let waveT = 0;
  function tick() {
    if (noHover || !mouse) {
      // 터치 기기 또는 커서 진입 전: 천천히 손 흔들기
      waveT += 0.03;
      targetAngle = 60 + Math.sin(waveT) * 25;
    }
    currentAngle += (targetAngle - currentAngle) * (reduceMotion ? 1 : 0.14);
    arm.setAttribute('transform', `rotate(${currentAngle.toFixed(2)} ${SHOULDER.x} ${SHOULDER.y})`);
    movePupils();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // 말풍선 인사
  const messages = [
    '마우스를 움직여 보세요! 👀',
    '프로젝트 구경하고 가세요!',
    '반가워요! 👋',
  ];
  let msgIdx = 0;

  function showBubble(text, ms) {
    if (!bubble) return;
    bubble.textContent = text;
    bubble.classList.add('show');
    setTimeout(() => bubble.classList.remove('show'), ms);
  }

  setTimeout(() => showBubble(messages[0], 3500), 1200);

  // 마스코트 클릭 시 랜덤 인사 (pointer-events는 svg에만 허용)
  svg.style.pointerEvents = 'auto';
  svg.style.cursor = 'pointer';
  svg.addEventListener('click', () => {
    msgIdx = (msgIdx + 1) % messages.length;
    showBubble(messages[msgIdx], 2200);
  });
})();
