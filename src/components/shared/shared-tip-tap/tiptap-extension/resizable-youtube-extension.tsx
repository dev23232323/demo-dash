// Note: This code is responsible for making the youtube embed resizable
//* Don't change anything unless you know what you are doing

import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import Youtube from "@tiptap/extension-youtube";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

type ResizableYouTubeNodeAttributes = {
  src: string;
  width: string;
  height: string;
};

type ResizableYouTubeNodeViewProps = {
  node: {
    attrs: ResizableYouTubeNodeAttributes;
  };
  updateAttributes: (attrs: Partial<ResizableYouTubeNodeAttributes>) => void;
  deleteNode: () => void; // Added this line
};

const useEvent = <T extends (...args: any[]) => any>(handler: T): T => {
  const handlerRef = useRef<T | null>(null);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (handlerRef.current === null) {
      throw new Error("Handler is not assigned");
    }
    return handlerRef.current(...args);
  }, []) as T;
};

const MIN_WIDTH = 200;
const MIN_HEIGHT = 100;
const BORDER_COLOR = "#0096fd";

const ResizableYouTubeTemplate = ({
  node,
  updateAttributes,
  deleteNode,
}: ResizableYouTubeNodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [resizingStyle, setResizingStyle] = useState<
    Pick<CSSProperties, "width" | "height"> | undefined
  >();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node | null)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMouseDown = useEvent(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!iframeRef.current) return;
      event.preventDefault();

      const direction = event.currentTarget.dataset.direction || "--";
      const initialXPosition = event.clientX;
      const initialYPosition = event.clientY;
      const currentWidth = parseInt(iframeRef.current.width);
      const currentHeight = parseInt(iframeRef.current.height);
      let newWidth = currentWidth;
      let newHeight = currentHeight;
      const transformX = direction[1] === "w" ? -1 : 1;
      const transformY = direction[0] === "n" ? -1 : 1;
      const src = iframeRef.current.src;

      const removeListeners = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", removeListeners);
        updateAttributes({
          width: `${newWidth}px`,
          height: `${newHeight}px`,
          src,
        });
        setResizingStyle(undefined);
      };

      const mouseMoveHandler = (event: MouseEvent) => {
        // console.log(newWidth);
        // console.log(newHeight);

        newWidth = Math.max(
          currentWidth + transformX * (event.clientX - initialXPosition),
          MIN_WIDTH
        );

        newHeight = Math.max(
          currentHeight + transformY * (event.clientY - initialYPosition),
          MIN_HEIGHT
        );

        setResizingStyle({
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        });

        if (!event.buttons) removeListeners();
      };

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", removeListeners);
    }
  );

  const dragCornerButton = (direction: string) => (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      data-direction={direction}
      style={{
        position: "absolute",
        height: "10px",
        width: "10px",
        backgroundColor: BORDER_COLOR,
        ...{ n: { top: 0 }, s: { bottom: 0 } }[direction[0]],
        ...{ w: { left: 0 }, e: { right: 0 } }[direction[1]],
        cursor: `${direction}-resize`,
      }}
    ></div>
  );

  return (
    <NodeViewWrapper
      ref={containerRef}
      as="div"
      contentEditable={false}
      onClick={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        lineHeight: "0px",
        padding: "10px",
      }}
    >
      {editing && (
        <>
          {/* Don't use a simple border as it pushes other content around. */}
          {[
            { left: 0, top: 0, height: "100%", width: "1px" },
            { right: 0, top: 0, height: "100%", width: "1px" },
            { top: 0, left: 0, width: "100%", height: "1px" },
            { bottom: 0, left: 0, width: "100%", height: "1px" },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                backgroundColor: BORDER_COLOR,
                ...style,
              }}
            ></div>
          ))}
          <div
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
            }}
          ></div>
          {dragCornerButton("nw")}
          {dragCornerButton("ne")}
          {dragCornerButton("sw")}
          {dragCornerButton("se")}
          <button
            onClick={() => deleteNode()}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </>
      )}
      <iframe
        {...node.attrs}
        ref={iframeRef}
        style={{
          ...resizingStyle,
          cursor: "default",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </NodeViewWrapper>
  );
};

const ResizableYouTubeExtension = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: { default: "" },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableYouTubeTemplate);
  },
}).configure({ inline: true });

export default ResizableYouTubeExtension;
