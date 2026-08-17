document.addEventListener("DOMContentLoaded", () => {
  document.title = "Ruijie Yin";

  // -------------------------------------------------------------
  // Academic profile header
  // -------------------------------------------------------------
  document.querySelector(".cn-name")?.remove();
  document.querySelector(".bio")?.remove();
  document.querySelector(".hero-focus")?.remove();

  const role = document.querySelector(".role");
  if (role) {
    role.innerHTML = `
      <span><strong>Nanyang Technological University</strong> · M.Sc. in Computer Control &amp; Automation</span>
      <span>Advisor: Prof. Rong Su</span>
      <span><strong>Sichuan University</strong> · B.Eng. in Automation</span>
    `;
    role.style.display = "grid";
    role.style.gap = "10px";
    role.style.lineHeight = "1.65";
    role.style.marginBottom = "0";
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

  // CV links open the uploaded PDF in a new browser tab.
  document.querySelectorAll('a[aria-label="CV"], .footer-links a').forEach((link) => {
    if (link.getAttribute("aria-label") === "CV" || link.textContent.trim() === "CV") {
      link.href = "assets/cv/Ruijie_Yin_CV.pdf";
      link.target = "_blank";
      link.rel = "noopener";
    }
  });

  const heroStyle = document.createElement("style");
  heroStyle.textContent = `
    .hero { padding: 44px 0 38px; }
    .hero-grid {
      grid-template-columns: minmax(0, 1fr) 250px;
      gap: 54px;
      align-items: center;
    }
    .hero-copy { max-width: 850px; }
    .hero-copy h1 {
      margin: 0;
      font-size: clamp(3.2rem, 6vw, 5rem);
      line-height: .98;
      letter-spacing: -.055em;
    }
    .role {
      margin-top: 24px !important;
      color: #d0d6dd;
      font-size: 1.06rem;
    }
    .role strong { color: #f3f5f7; font-weight: 700; }
    .hero-rule { width: 60px; height: 2px; margin: 30px 0 25px; }
    .profile-links { margin-top: 0; gap: 28px; align-items: center; }
    .profile-links a { font-size: 1rem; }
    .portrait-wrap {
      width: 250px;
      justify-self: end;
      box-shadow: 0 10px 30px rgba(0,0,0,.18);
    }
    .project-media > video {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 192px;
      object-fit: cover;
      pointer-events: none;
    }
    .future-direction-card {
      padding: 18px 20px;
      border: 1px solid var(--line, #2b3036);
      border-radius: 9px;
      background: #15181c;
    }
    .future-direction-card h3 { margin: 0 0 6px; font-size: 1rem; }
    .future-direction-card p { margin: 0; color: #9aa2ac; font-size: .9rem; }
    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: minmax(0, 1fr) 214px; gap: 34px; }
      .portrait-wrap { width: 214px; }
      .role { font-size: 1rem; }
    }
    @media (max-width: 720px) {
      .hero { padding: 32px 0 28px; }
      .hero-grid { grid-template-columns: 1fr; gap: 25px; }
      .portrait-wrap { width: 182px; justify-self: start; order: -1; }
      .hero-copy h1 { font-size: 2.95rem; }
      .role { gap: 8px !important; }
      .hero-rule { margin: 24px 0 22px; }
    }
  `;
  document.head.appendChild(heroStyle);

  // -------------------------------------------------------------
  // Research project priority and method-agnostic naming
  // -------------------------------------------------------------
  const projectList = document.querySelector(".project-list");
  if (projectList) {
    const cards = Array.from(projectList.querySelectorAll(".project-card"));
    const decoupledCard = cards.find((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      return title.includes("Symmetry-Aware GNN") || title.includes("Neural Policy Optimization");
    });

    if (decoupledCard) {
      projectList.insertBefore(decoupledCard, projectList.firstElementChild);

      const title = decoupledCard.querySelector("h3");
      if (title) title.textContent = "Neural Policy Optimization for Decoupled Whole-Body Control";

      const description = decoupledCard.querySelector(".project-copy p");
      if (description) {
        description.textContent = "Neural-policy optimization combined with upper/lower-body decoupling for precise and robust humanoid whole-body control. Demonstrations include box carrying, turning behavior, and real-robot deployment.";
      }

      const tags = decoupledCard.querySelector(".project-tags");
      if (tags) {
        tags.innerHTML = `
          <span>Neural Policy Optimization</span>
          <span>Decoupled Control</span>
          <span>Whole-Body Control</span>
          <span>Sim-to-Real</span>
        `;
      }
    }

    const orderedCards = projectList.querySelectorAll(".project-card");
    if (orderedCards[0]) {
      const img = orderedCards[0].querySelector(".project-media img");
      if (img) {
        img.src = "assets/images/posters/box_transfer_sim.jpg?v=20260817-cover";
        img.alt = "Humanoid robot carrying a box in simulation";
      }
    }

    if (orderedCards[1]) {
      const media = orderedCards[1].querySelector(".project-media");
      if (media) {
        const oldImg = media.querySelector("img");
        if (oldImg) {
          const thumbVideo = document.createElement("video");
          thumbVideo.muted = true;
          thumbVideo.playsInline = true;
          thumbVideo.preload = "metadata";
          thumbVideo.poster = "assets/images/posters/skill_switch_sim.jpg";
          thumbVideo.setAttribute("aria-label", "Humanoid robot squatting during whole-body control");
          thumbVideo.src = "assets/videos/whole_body/skill-switch-simulation.mp4#t=5.2";
          thumbVideo.addEventListener("loadedmetadata", () => {
            const target = Math.min(5.2, Math.max(0, (thumbVideo.duration || 5.2) - 0.05));
            try { thumbVideo.currentTime = target; } catch (_) {}
          }, { once: true });
          thumbVideo.addEventListener("seeked", () => thumbVideo.pause(), { once: true });
          oldImg.replaceWith(thumbVideo);
        }
      }
    }
  }

  const wholeBodyDetail = document.getElementById("whole-body-detail");
  const decoupledDetail = document.getElementById("symmetry-detail");
  if (wholeBodyDetail && decoupledDetail && wholeBodyDetail.parentElement === decoupledDetail.parentElement) {
    wholeBodyDetail.parentElement.insertBefore(decoupledDetail, wholeBodyDetail);
  }

  // Project 01: decoupled whole-body control + box carrying.
  if (decoupledDetail) {
    const kicker = decoupledDetail.querySelector(".detail-kicker");
    if (kicker) kicker.textContent = "PROJECT 01";

    const heading = decoupledDetail.querySelector(".detail-heading h2");
    if (heading) heading.textContent = "Neural Policy Optimization & Upper/Lower-Body Decoupled Control";

    const summary = decoupledDetail.querySelector(".detail-heading p");
    if (summary) {
      summary.textContent = "Simulation and real-robot demonstrations of coordinated manipulation, turning behavior, and whole-body control under an upper/lower-body decoupled framework.";
    }

    const demoHeaders = decoupledDetail.querySelectorAll(".demo-header h3");
    if (demoHeaders[1]) demoHeaders[1].textContent = "Left / Right Turning During Box Carrying";

    // Add real-robot box carrying directly after the simulation box-transfer block.
    const firstDemo = decoupledDetail.querySelector(".demo-block");
    if (firstDemo && !decoupledDetail.querySelector(".box-hardware-demo")) {
      const hardwareBlock = document.createElement("div");
      hardwareBlock.className = "demo-block box-hardware-demo";
      hardwareBlock.innerHTML = `
        <div class="demo-header">
          <div><span class="demo-index">02</span><h3>Real-Robot Box Transfer</h3></div>
          <p>Real-robot deployment of the box-carrying whole-body task on Unitree G1.</p>
        </div>
        <article class="video-card feature-video">
          <div class="video-shell feature-shell">
            <video autoplay muted loop playsinline preload="metadata" poster="assets/images/posters/box-transfer-hardware.jpg">
              <source src="assets/videos/gnn_symmetry/box-transfer-hardware.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="video-label-block"><strong>Real Robot</strong><span>Whole-body box carrying and transfer</span></div>
        </article>
      `;
      firstDemo.insertAdjacentElement("afterend", hardwareBlock);

      // Re-number the existing later demonstrations after inserting hardware deployment.
      const demos = decoupledDetail.querySelectorAll(".demo-block");
      demos.forEach((demo, index) => {
        const number = demo.querySelector(".demo-index");
        if (number) number.textContent = String(index + 1).padStart(2, "0");
      });
    }
  }

  // Project 02: multi-skill control + vision-guided grasping.
  if (wholeBodyDetail) {
    const kicker = wholeBodyDetail.querySelector(".detail-kicker");
    if (kicker) kicker.textContent = "PROJECT 02";

    const summary = wholeBodyDetail.querySelector(".detail-heading p");
    if (summary) summary.textContent = "Simulation and real-robot demonstrations of multi-skill whole-body control, reaching, and vision-guided manipulation.";

    if (!wholeBodyDetail.querySelector(".vision-grasp-demo")) {
      const graspBlock = document.createElement("div");
      graspBlock.className = "demo-block vision-grasp-demo";
      graspBlock.innerHTML = `
        <div class="demo-header">
          <div><span class="demo-index">03</span><h3>Vision-Guided Bottle Grasping</h3></div>
          <p>Vision-guided target localization coupled with the single-arm reaching policy for real-robot object grasping.</p>
        </div>
        <article class="video-card feature-video">
          <div class="video-shell feature-shell">
            <video autoplay muted loop playsinline preload="metadata" poster="assets/images/posters/bottle-grasping-hardware.jpg">
              <source src="assets/videos/whole_body/bottle-grasping-hardware.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="video-label-block"><strong>Real Robot</strong><span>Vision-guided bottle grasping</span></div>
        </article>
      `;
      wholeBodyDetail.querySelector(".container")?.appendChild(graspBlock);
    }
  }

  // -------------------------------------------------------------
  // Remove outdated Ongoing Work and replace with one future direction.
  // -------------------------------------------------------------
  const oldOngoing = document.getElementById("ongoing");
  if (oldOngoing) {
    const future = document.createElement("section");
    future.className = "section";
    future.id = "future";
    future.innerHTML = `
      <div class="container">
        <div class="section-title-with-icon">
          <svg class="section-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>
          <h2>Future Direction</h2>
        </div>
        <article class="future-direction-card">
          <h3>Human–Robot Collaboration</h3>
          <p>Extending whole-body control toward interactive and cooperative tasks involving human partners.</p>
        </article>
      </div>
    `;
    oldOngoing.replaceWith(future);
  }

  // -------------------------------------------------------------
  // Always-visible custom controls for all detailed demo videos.
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
    .custom-video-controls button:hover { border-color: #66a9ff; color: #66a9ff; }
    .custom-video-controls input[type="range"] { width: 100%; min-width: 0; accent-color: #66a9ff; cursor: pointer; }
    .custom-video-time { min-width: 86px; text-align: right; color: #c7ced7; font-variant-numeric: tabular-nums; }
    @media (max-width: 560px) {
      .custom-video-controls { grid-template-columns: auto minmax(0, 1fr); }
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
    if (!shell || shell.querySelector(".custom-video-controls")) return;

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

    const updateButton = () => { playButton.textContent = video.paused ? "Play" : "Pause"; };
    const updateTime = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (!seeking && duration > 0) seek.value = String(Math.round((video.currentTime / duration) * 1000));
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
    video.addEventListener("loadeddata", () => shell.classList.remove("video-missing"));
    video.addEventListener("error", () => shell.classList.add("video-missing"));

    updateButton();
    updateTime();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!entry.isIntersecting && !video.paused) video.pause();
      });
    }, { threshold: 0.05 });
    document.querySelectorAll(".video-shell video").forEach((video) => observer.observe(video));
  }
});