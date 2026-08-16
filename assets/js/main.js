document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // Academic profile header
  // -------------------------------------------------------------
  document.title = "Ruijie Yin";

  const chineseName = document.querySelector(".cn-name");
  chineseName?.remove();

  const intro = document.querySelector(".bio");
  intro?.remove();

  const role = document.querySelector(".role");
  if (role) {
    role.innerHTML = `
      <span>M.Sc. Student in Computer Control &amp; Automation, Nanyang Technological University</span>
      <span>Advisor: Prof. Rong Su</span>
      <span>B.Eng. in Automation, Sichuan University</span>
    `;
    role.style.display = "grid";
    role.style.gap = "3px";
    role.style.lineHeight = "1.4";
    role.style.marginBottom = "16px";
  }

  const portrait = document.querySelector(".portrait-wrap img");
  if (portrait) {
    portrait.src = "assets/images/profile-current.jpg";
    portrait.alt = "Portrait of Ruijie Yin";
  }

  document.querySelectorAll(".edu-item").forEach((item) => {
    const heading = item.querySelector("h3");
    if (heading?.textContent?.trim() === "Nanyang Technological University" && !item.querySelector(".advisor-line")) {
      const advisor = document.createElement("p");
      advisor.className = "advisor-line";
      advisor.textContent = "Advisor: Prof. Rong Su";
      const degree = item.querySelector("p");
      if (degree) degree.insertAdjacentElement("afterend", advisor);
      else item.appendChild(advisor);
    }
  });

  // Keep the opening section compact and visually balanced with the portrait.
  const heroStyle = document.createElement("style");
  heroStyle.textContent = `
    .hero { padding: 40px 0 30px; }
    .hero-grid {
      grid-template-columns: minmax(0, 1fr) 250px;
      gap: 46px;
      align-items: center;
    }
    .hero-copy h1 {
      font-size: clamp(2.7rem, 5vw, 4rem);
      line-height: .96;
    }
    .role { font-size: .96rem; }
    .hero-rule { width: 36px; margin: 13px 0; }
    .profile-links { margin-top: 15px; }
    .portrait-wrap {
      width: 250px;
      justify-self: end;
    }
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: minmax(0, 1fr) 210px; gap: 34px; }
      .portrait-wrap { width: 210px; }
    }
    @media (max-width: 720px) {
      .hero { padding: 32px 0 26px; }
      .hero-grid { grid-template-columns: 1fr; }
      .portrait-wrap { width: 180px; justify-self: start; }
    }
  `;
  document.head.appendChild(heroStyle);

  // -------------------------------------------------------------
  // Segmented tabs
  // -------------------------------------------------------------
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const groupName = group.dataset.tabGroup;
    const buttons = group.querySelectorAll("[data-tab]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
        document.querySelectorAll(`[data-tab-panel="${groupName}"]`).forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.tab === target);
        });
      });
    });
  });

  // -------------------------------------------------------------
  // Always-visible custom video controls
  // -------------------------------------------------------------
  const controlStyle = document.createElement("style");
  controlStyle.textContent = `
    .custom-video-controls {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      min-height: 42px;
      padding: 7px 10px;
      background: linear-gradient(180deg, rgba(7,10,13,.35), rgba(7,10,13,.94));
      color: #eef3f8;
      font: 600 12px/1.2 Inter, ui-sans-serif, system-ui, sans-serif;
    }
    .custom-video-controls button {
      appearance: none;
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 5px;
      background: rgba(14,18,23,.82);
      color: #eef3f8;
      min-width: 58px;
      padding: 6px 9px;
      cursor: pointer;
      font: inherit;
    }
    .custom-video-controls button:hover {
      border-color: #66a9ff;
      color: #66a9ff;
    }
    .custom-video-controls input[type="range"] {
      width: 100%;
      min-width: 0;
      accent-color: #66a9ff;
      cursor: pointer;
    }
    .custom-video-time {
      min-width: 86px;
      text-align: right;
      color: #c7ced7;
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 560px) {
      .custom-video-controls {
        grid-template-columns: auto minmax(0, 1fr);
      }
      .custom-video-time { display: none; }
    }
  `;
  document.head.appendChild(controlStyle);

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  document.querySelectorAll(".video-shell video").forEach((video) => {
    const shell = video.closest(".video-shell");
    if (!shell) return;

    video.controls = false;
    video.removeAttribute("controls");
    video.preload = "metadata";

    const controls = document.createElement("div");
    controls.className = "custom-video-controls";
    controls.innerHTML = `
      <button type="button" class="video-play-toggle">Pause</button>
      <input class="video-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="Video progress" />
      <span class="custom-video-time">0:00 / 0:00</span>
    `;
    shell.appendChild(controls);

    const playButton = controls.querySelector(".video-play-toggle");
    const seek = controls.querySelector(".video-seek");
    const time = controls.querySelector(".custom-video-time");
    let seeking = false;

    const updateButton = () => {
      playButton.textContent = video.paused ? "Play" : "Pause";
    };

    const updateTime = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (!seeking && duration > 0) {
        seek.value = String(Math.round((video.currentTime / duration) * 1000));
      }
      time.textContent = `${formatTime(video.currentTime)} / ${formatTime(duration)}`;
    };

    playButton.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });

    seek.addEventListener("pointerdown", () => { seeking = true; });
    seek.addEventListener("pointerup", () => { seeking = false; });
    seek.addEventListener("input", () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = (Number(seek.value) / 1000) * video.duration;
      updateTime();
    });

    video.addEventListener("play", updateButton);
    video.addEventListener("pause", updateButton);
    video.addEventListener("loadedmetadata", updateTime);
    video.addEventListener("durationchange", updateTime);
    video.addEventListener("timeupdate", updateTime);

    const showFallback = () => shell.classList.add("video-missing");
    const showVideo = () => shell.classList.remove("video-missing");
    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("error", showFallback);
    if (video.error) showFallback();

    updateButton();
    updateTime();
  });

  // -------------------------------------------------------------
  // Copy BibTeX
  // -------------------------------------------------------------
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.copyTarget;
      const target = document.getElementById(targetId);
      if (!target) return;

      const text = target.innerText.trim();
      const original = button.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });

  // -------------------------------------------------------------
  // Pause off-screen videos only; do not force replay when they
  // come back into view, so the visitor keeps control.
  // -------------------------------------------------------------
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!entry.isIntersecting && !video.paused) video.pause();
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll("video").forEach((video) => observer.observe(video));
  }
});
