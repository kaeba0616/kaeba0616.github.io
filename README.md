# kaeba0616.github.io

이민섭 포트폴리오 사이트. https://kaeba0616.github.io

순수 HTML/CSS/JS 정적 사이트로, `main` 브랜치에 푸시하면 GitHub Pages가 자동으로 배포합니다.

## 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 모든 콘텐츠 (히어로, 프로젝트, 경력, 연락처) |
| `style.css` | 스타일 (색상 팔레트는 상단 `:root` 변수) |
| `script.js` | 우측 하단 마스코트 (팔·눈동자가 마우스를 따라감) |

## 프로젝트 추가하는 방법

1. `index.html`을 열고 `<div class="project-grid">` 안에 아래 블록을 복사해 붙인 뒤 내용을 수정합니다. 위치 순서대로 화면에 표시됩니다.

   ```html
   <article class="project">
     <div class="project-head">
       <h3>프로젝트 이름</h3>
       <!-- 배지가 필요하면 주석 해제:
       <span class="badge">개발 중</span>
       수상 배지(금색)는:
       <span class="badge badge-award">🏆 장려상 · 공모전 이름</span>
       -->
     </div>
     <p>프로젝트 설명. <strong>강조할 부분</strong>은 strong 태그로 감쌉니다.</p>
     <ul class="stack"><li>사용기술1</li><li>사용기술2</li></ul>
     <div class="project-links">
       <a href="https://github.com/kaeba0616/저장소명" target="_blank" rel="noopener">GitHub ↗</a>
       <!-- 링크는 여러 개 넣을 수 있습니다 (시연 영상 등) -->
     </div>
   </article>
   ```

2. 크게 강조하고 싶은 대표 프로젝트는 클래스를 `project featured`로 바꾸면
   한 줄 전체를 차지하는 카드가 됩니다 (WaitZero 참고).

3. 새로운 기술 스택을 썼다면 상단 기술 목록에도 추가합니다.

   ```html
   <ul class="skills-list">
     ... <li>새기술</li>
   </ul>
   ```

4. 커밋하고 푸시하면 끝. 1~2분 안에 사이트에 반영됩니다.

   ```bash
   git add -A
   git commit -m "프로젝트 추가: 프로젝트명"
   git push
   ```

## 경력·학력 수정

`index.html`의 `<ol class="timeline">` 안에서 `<li>` 블록을 수정/추가합니다.
최신 항목이 위로 오도록 정렬되어 있습니다.

## 배포 확인

푸시 후 반영이 안 보이면:

- 저장소의 **Actions 탭**에서 `pages build and deployment` 워크플로우가 성공했는지 확인
- 브라우저 캐시 때문일 수 있으니 `Ctrl+Shift+R` (강력 새로고침)

## 주의

- `script.js`를 수정했다면 `index.html`의 `<script src="script.js?v=2">` 버전 번호를
  올려주세요 (`?v=3`, `?v=4`, ...). 방문자 브라우저 캐시를 무효화하기 위함입니다.
- 전화번호·주소·생년월일 등 민감한 개인정보는 공개 사이트이므로 올리지 않습니다.
