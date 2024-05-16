import { describe, expect, it } from "vitest";
import { act, render } from "@testing-library/react";
import { Article } from "./Article";

describe("Article", () => {
  it("uses correct image src", () => {
    const { container } = render(
      <Article
        data={{ cover: "/foo", title: "test-title", authors: "test-authors" }}
      />,
    );

    const image = container.querySelector("img")!;
    expect(image.src).toBe("https://cdn.pixabay.com/photo/foo");
  });

  it("changes to zoom mode", () => {
    // when - initially rendered
    const { container } = render(
      <Article
        data={{ cover: "/foo", title: "test-title", authors: "test-authors" }}
      />,
    );

    // then
    expect(document.querySelector("input")).toBe(null);
    expect(
      (container.children[0] as HTMLDivElement).style.getPropertyValue(
        "background-color",
      ),
    ).toBe("");

    // when
    act(() => container.querySelector("img")!.click());

    // then
    expect(document.querySelector("input")).toBeTruthy();
    expect(
      (container.children[0] as HTMLDivElement).style.getPropertyValue(
        "background-color",
      ),
    ).toBe("rgb(176, 39, 134)");
  });
});
