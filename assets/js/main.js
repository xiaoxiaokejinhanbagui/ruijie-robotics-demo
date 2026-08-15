document.addEventListener("DOMContentLoaded", () => {
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

        document
          .querySelectorAll(`[data-tab-panel="${groupName}"]`)
          .forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.tab === target);
          });
      });
    });
  });

  // -------------------------------------------------------------
  // Gracefully show placeholders when video files have not been
  // added yet. Once you place a valid MP4 at the referenced path,
  // the video appears automatically.
  // -------------------------------------------------------------
  document.querySelectorAll(".video-shell video").forEach((video) => {
    const shell = video.closest(".video-shell");

    const showFallback = () => {
      shell?.classList.add("video-missing");
    };

    const showVideo = () => {
      shell?.classList.remove("video-missing");
    };

    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("error", showFallback);

    // If the browser already knows loading failed, show fallback.
    if (video.error) {
      showFallback();
    }

    // A short timeout avoids blank cards when no source exists.
    window.setTimeout(() => {
      if (video.readyState === 0) {
        showFallback();
      }
    }, 900);
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
  // Pause off-screen videos to reduce CPU/GPU usage.
  // -------------------------------------------------------------
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll("video").forEach((video) => observer.observe(video));
  }
});
