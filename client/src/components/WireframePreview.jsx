export default function WireframePreview({ layout }) {
  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];

  return (
    <div
      style={{
        width: "420px",
        height: "700px",
        position: "relative",
        background: artboard.data?.backgroundColor || "#fff",
        border: "2px solid #ccc",
        overflow: "hidden",
      }}
    >
      {artboard.children.map((id) => {
        const node = layout.nodes[id];

        // TEXT NODE
        if (node.type === "text") {
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                color:
                  node.style?.visual?.color?.value || "#000",
                fontSize:
                  (node.style?.visual?.fontSize || 20) / 4,
                fontWeight:
                  node.style?.visual?.fontWeight || 400,
                fontStyle:
                  node.style?.visual?.fontStyle || "normal",
                fontFamily:
                  node.style?.visual?.fontFamily || "Arial",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
              }}
            >
              {node.data?.content}
            </div>
          );
        }

        // IMAGE NODE
        if (node.type === "image") {
          return (
            <img
              key={id}
              src={node.data?.sourceUrl}
              alt={node.name}
              style={{
                position: "absolute",
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                objectFit: node.data?.fit || "cover",
                borderRadius:
                  node.style?.visual?.borderRadius || 0,
              }}
            />
          );
        }

        // SHAPE NODE
        if (node.type === "shape") {
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                background:
                  node.style?.visual?.fill?.value || "#ccc",
                border:
                  `${node.style?.visual?.strokeWidth || 0}px solid ${
                    node.style?.visual?.stroke?.value || "#000"
                  }`,
                borderRadius:
                  node.data?.shapeType === "circle"
                    ? "50%"
                    : "0%",
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}