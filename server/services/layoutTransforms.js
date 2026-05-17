export function resizeArtboard(layout, width, height) {
  const rootId = layout.rootNodes[0];

  layout.nodes[rootId].width = width;
  layout.nodes[rootId].height = height;

  return layout;
}

export function moveElement(layout, target, position) {
  const node = findSemanticNode(layout, target);

  if (!node) return layout;

  // TOP
  if (position === "top") {
    node.ny = 0.05;
  }

  // CENTER
  if (position === "center") {
    node.nx = 0.3;
    node.ny = 0.4;
  }

  // BOTTOM
  if (position === "bottom") {
    node.ny = 0.75;
  }

  return layout;
}

export function changeTextSize(layout, target, scale) {
  const node = findSemanticNode(layout, target);

  if (!node) return layout;

  if (node.style?.visual?.fontSize) {
    node.style.visual.fontSize =
      node.style.visual.fontSize * scale;
  }

  return layout;
}

export function resizeElement(layout, target, scale) {
  const node = findSemanticNode(layout, target);

  if (!node) return layout;

  node.nw *= scale;
  node.nh *= scale;

  node.width *= scale;
  node.height *= scale;

  return layout;
}

export function changeColor(layout, target, color) {
  const node = findSemanticNode(layout, target);

  if (!node) return layout;

  if (node.style?.visual?.color) {
    node.style.visual.color.value = color;
  }

  return layout;
}

/* ------------------------------ */
/* Semantic Matching */
/* ------------------------------ */

function findSemanticNode(layout, target) {
  const nodes = Object.values(layout.nodes);

  // HEADLINE
  if (target === "headline") {
    return nodes.find(
      (n) =>
        n.type === "text" &&
        n.data?.content?.includes("Luxury Comfort")
    );
  }

  // SUBHEADLINE
  if (target === "subheadline") {
    return nodes.find(
      (n) =>
        n.type === "text" &&
        n.data?.content?.includes("Comfort that defines")
    );
  }

  // PRODUCT
  if (target === "product") {
    return nodes.find(
      (n) =>
        n.type === "image" &&
        n.name?.includes("Product")
    );
  }

  // OFFER BADGE
  if (target === "offer_badge") {
    return nodes.find(
      (n) =>
        n.type === "shape"
    );
  }

  // OFFER TEXT
  if (target === "offer_text") {
    return nodes.find(
      (n) =>
        n.type === "text" &&
        n.data?.content?.includes("20%")
    );
  }

  return null;
}