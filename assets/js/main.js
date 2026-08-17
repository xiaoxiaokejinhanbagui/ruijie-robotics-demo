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
      <span><strong>Nanyang Technological University</strong> · M.Sc. in Computer Control &amp; Automation</span>
      <span>Advisor: Prof. Rong Su</span>
      <span><strong>Sichuan University</strong> · B.Eng. in Automation</span>
    `;
    role.style.display = "grid";
    role.style.gap = "4px";
    role.style.lineHeight = "1.45";
    role.style.marginBottom = "0";

    if (!document.querySelector(".hero-focus")) {
      const focus = document.createElement("div");
      focus.className = "hero-focus";
      focus.innerHTML = `
        <span class="hero-focus-label">Research Focus</span>
        <span class="hero-focus-text">Reinforcement Learning Algorithms · Neural Policy Architecture &amp; Optimization · Whole-Body Robot Control</span>
      `;
      role.insertAdjacentElement("afterend", focus);
    }
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

  // -------------------------------------------------------------
  // Research project priority and naming
  // Put the neural-policy / decoupled-control project first while
  // keeping the public-facing description method-agnostic.
  // -------------------------------------------------------------
  const projectList = document.querySelector(".project-list");
  if (projectList) {
    const projectCards = Array.from(projectList.querySelectorAll(".project-card"));
    const decoupledCard = projectCards.find((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      return title.includes("Symmetry-Aware GNN") || title.includes("Neural Policy Optimization");
    });

    if (decoupledCard) {
      projectList.insertBefore(decoupledCard, projectList.firstElementChild);

      const title = decoupledCard.querySelector("h3");
      if (title) title.textContent = "Neural Policy Optimization for Decoupled Whole-Body Control";

      const description = decoupledCard.querySelector(".project-copy p");
      if (description) {
        description.textContent = "Neural-policy optimization combined with upper/lower-body decoupling for precise and robust humanoid whole-body control. Current demonstrations include coordinated box carrying, left/right turning, and loco-manipulation in simulation.";
      }

      const tags = decoupledCard.querySelector(".project-tags");
      if (tags) {
        tags.innerHTML = `
          <span>Neural Policy Optimization</span>
          <span>Decoupled Control</span>
          <span>Whole-Body Control</span>
          <span>Loco-Manipulation</span>
        `;
      }
    }
  }

  const wholeBodyDetail = document.getElementById("whole-body-detail");
  const decoupledDetail = document.getElementById("symmetry-detail");
  if (wholeBodyDetail && decoupledDetail && wholeBodyDetail.parentElement === decoupledDetail.parentElement) {
    wholeBodyDetail.parentElement.insertBefore(decoupledDetail, wholeBodyDetail);
  }

  if (decoupledDetail) {
    const kicker = decoupledDetail.querySelector(".detail-kicker");
    if (kicker) kicker.textContent = "PROJECT 01";

    const heading = decoupledDetail.querySelector(".detail-heading h2");
    if (heading) heading.textContent = "Neural Policy Optimization & Upper/Lower-Body Decoupled Control";

    const summary = decoupledDetail.querySelector(".detail-heading p");
    if (summary) {
      summary.textContent = "Simulation demonstrations of coordinated manipulation, turning behavior, and whole-body control under an upper/lower-body decoupled framework.";
    }

    const demoHeaders = decoupledDetail.querySelectorAll(".demo-header h3");
    if (demoHeaders[1]) demoHeaders[1].textContent = "Left / Right Turning During Box Carrying";
  }

  if (wholeBodyDetail) {
    const kicker = wholeBodyDetail.querySelector(".detail-kicker");
    if (kicker) kicker.textContent = "PROJECT 02";
  }

  // Keep the opening section compact and balanced with the portrait.
  const heroStyle = document.createElement("style");
  heroStyle.textContent = `
    .hero { padding: 34px 0 28px; }
    .hero-grid {
      grid-template-columns: minmax(0, 1fr) 238px;
      gap: 44px;
      align-items: center;
    }
    .hero-copy { max-width: 760px; }
    .hero-copy h1 {
      font-size: clamp(2.8rem, 5vw, 3.9rem);
      line-height: .98;
      letter-spacing: -.05em;
    }
    .role {
      margin-top: 13px !important;
      color: #c5cbd2;
      font-size: .94rem;
    }
    .role strong {
      color: #eef1f4;
      font-weight: 650;
    }
    .hero-focus {
      display: grid;
      gap: 4px;
      margin-top: 17px;
      padding-left: 13px;
      border-left: 2px solid #3f8fe8;
      max-width: 700px;
    }
    .hero-focus-label {
      color: #66a9ff;
      font-size: .68rem;
      font-weight: 780;
      letter-spacing: .11em;
      text-transform: uppercase;
    }
    .hero-focus-text {
      color: #aeb6c0;
      font-size: .88rem;
      line-height: 1.52;
    }
    .hero-rule {
      width: 36px;
      height: 2px;
      margin: 17px 0 15px;
    }
    .profile-links { margin-top: 0; gap: 20px; }
    .profile-links a { font-size: .91rem; }
    .portrait-wrap {
      width: 238px;
      justify-self: end;
      box-shadow: 0 10px 30px rgba(0,0,0,.18);
    }
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: minmax(0, 1fr) 205px; gap: 32px; }
      .portrait-wrap { width: 205px; }
      .hero-focus-text { font-size: .84rem; }
    }
    @media (max-width: 720px) {
      .hero { padding: 28px 0 24px; }
      .hero-grid { grid-template-columns: 1fr; gap: 24px; }
      .portrait-wrap { width: 176px; justify-self: start; order: -1; }
      .hero-copy h1 { font-size: 2.8rem; }
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

    // Force a fresh request for the restored box-transfer asset so an old
    // truncated response cannot remain in the browser/CDN cache.
    const source = video.querySelector("source");
    if (source && source.getAttribute("src")?.includes("box-transfer-simulation.mp4")) {
      source.setAttribute("src", "assets/videos/gnn_symmetry/box-transfer-simulation.mp4?v=20260817-restored");
      video.load();
    }

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
