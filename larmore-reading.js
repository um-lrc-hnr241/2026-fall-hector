(() => {
  const navigation = document.querySelector(".larmore-page-nav");
  if (!navigation) return;

  const links = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) {
    if (links[0]) links[0].setAttribute("aria-current", "location");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (!visible.length) return;
    const activeId = visible[0].target.id;
    links.forEach((link) => {
      if (link.hash === `#${activeId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-12% 0px -70% 0px",
    threshold: 0
  });

  sections.forEach((section) => observer.observe(section));
})();
