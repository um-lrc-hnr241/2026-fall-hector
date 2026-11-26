(() => {
  const interfacePanel = document.getElementById("consciousness-interface");
  if (!interfacePanel) return;

  const nodes = Array.from(interfacePanel.querySelectorAll(".build-node"));
  const indicators = Array.from(document.querySelectorAll("[data-indicator]"));
  const progress = document.getElementById("build-progress");
  const progressLabel = document.getElementById("progress-label");
  const dossierHeading = document.getElementById("dossier-heading");
  const dossierTitle = document.getElementById("dossier-title");
  const dossierPreview = document.getElementById("dossier-preview");
  const openLink = document.getElementById("open-build-link");
  const explored = new Set();
  let currentBuild = 1;

  function selectBuild(number) {
    const node = nodes.find((item) => Number(item.dataset.build) === number);
    if (!node) return;

    currentBuild = number;
    explored.add(number);
    nodes.forEach((item) => {
      const selected = item === node;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    indicators.forEach((indicator) => {
      if (Number(indicator.dataset.indicator) === number) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    dossierHeading.textContent = `BUILD ${number}`;
    dossierTitle.textContent = node.dataset.title;
    dossierPreview.textContent = node.dataset.preview;
    openLink.href = `build-${number}.html`;
    progress.value = explored.size;
    progressLabel.textContent = `${explored.size} / 8 EXPLORED`;
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => selectBuild(Number(node.dataset.build)));
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => selectBuild(Number(indicator.dataset.indicator)));
  });

  document.getElementById("previous-build").addEventListener("click", () => {
    selectBuild(currentBuild === 1 ? 8 : currentBuild - 1);
  });

  document.getElementById("next-build").addEventListener("click", () => {
    selectBuild(currentBuild === 8 ? 1 : currentBuild + 1);
  });

  document.getElementById("trace-toggle").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const enabled = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(enabled));
    interfacePanel.classList.toggle("is-tracing", enabled);
  });
})();
