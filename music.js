(() => {
  const audioSection = document.querySelector(".theme-audio-section");
  if (audioSection) {
    const button = audioSection.querySelector(".theme-audio-toggle");
    const playerPanel = audioSection.querySelector(".theme-audio-player");

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        button.setAttribute("aria-expanded", "false");
        playerPanel.replaceChildren();
        playerPanel.hidden = true;
        return;
      }

      const player = document.createElement("iframe");
      player.title = "Spotify player: Westworld Main Title Theme by Ramin Djawadi";
      player.src = "https://open.spotify.com/embed/track/2sw8teIvVMRZKKYD5p795f";
      player.width = "100%";
      player.height = "152";
      player.loading = "lazy";
      player.allow = "clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      player.referrerPolicy = "strict-origin-when-cross-origin";
      playerPanel.replaceChildren(player);
      playerPanel.hidden = false;
      button.setAttribute("aria-expanded", "true");
    });
    return;
  }

  const widget = document.createElement("div");
  widget.className = "music-widget";

  const panel = document.createElement("div");
  panel.className = "music-panel";
  panel.id = "music-panel";
  panel.hidden = true;
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-label", "Westworld theme song player");

  const button = document.createElement("button");
  button.className = "music-toggle";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", panel.id);

  const notes = document.createElement("span");
  notes.setAttribute("aria-hidden", "true");
  notes.textContent = "♫";
  const label = document.createElement("span");
  label.textContent = "Westworld Theme Song";
  button.append(notes, label);
  widget.append(panel, button);
  document.body.append(widget);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      button.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      panel.replaceChildren();
      panel.hidden = true;
      return;
    }

    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;

    const player = document.createElement("iframe");
    player.title = "Spotify player: Westworld Main Title Theme by Ramin Djawadi";
    player.src = "https://open.spotify.com/embed/track/2sw8teIvVMRZKKYD5p795f";
    player.width = "100%";
    player.height = "152";
    player.loading = "lazy";
    player.allow = "clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    player.referrerPolicy = "strict-origin-when-cross-origin";
    panel.replaceChildren(player);
    requestAnimationFrame(() => panel.classList.add("is-open"));
  });
})();
