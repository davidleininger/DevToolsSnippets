// Document Outline

{
  console.clear();

  console.log(`Document outline:`);

  const headings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );
  let totalHeadings = 0;

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    let inAriaHidden = false;
    let parent = heading.parentElement;
    let level;

    if (heading.getAttribute("role") === "heading") {
      level = heading.hasAttribute("aria-level")
        ? parseInt(heading.getAttribute("aria-level"), 10)
        : 2;
    } else {
      level = parseInt(heading.nodeName.replace("H", ""), 10);
    }

    while (parent && !inAriaHidden) {
      const isCSSHidden = window.getComputedStyle(parent).display === "none";
      const isAriaHidden = parent.getAttribute("aria-hidden");
      if (isAriaHidden === "true" || isCSSHidden) {
        inAriaHidden = true;
        break;
      }
      parent = parent.parentElement;
    }

    if (inAriaHidden) {
      continue;
    }

    totalHeadings += 1;

    const consoleMessage = `%c<${heading.nodeName}> ${heading.textContent
      .replace(/\s\s+/g, " ")
      .trim()} ${heading.getAttribute("role") === "heading"
      ? `(aria-level = ${level})`
      : ""}`;
    const consoleStyle = `padding-left: ${level * 30}px; font-size: ${27 -
      level * 3}px`;

    console.log(consoleMessage, consoleStyle);
  }

  console.log("---------");
  console.log("# of headings: ", totalHeadings);
  console.log('Finished running “Doc Outline"');
}
