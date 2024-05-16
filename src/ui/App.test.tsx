import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Spy } from "spy4js";
import { App } from "./App";

vi.mock("./Main");
const mockReactComponents_Main = Spy.mockReactComponents(
  await import("./Main"),
  "Main",
);

vi.mock("./article/ArticleFilter");
const mockReactComponents_ArticleFilter = Spy.mockReactComponents(
  await import("./article/ArticleFilter"),
  "ArticleFilter",
);

describe("App", () => {
  beforeEach(() => {
    mockReactComponents_Main.Main.returns("Main");
    mockReactComponents_ArticleFilter.ArticleFilter.returns("ArticleFilter");
  });

  it("renders the content", () => {
    expect(render(<App />).container).toMatchInlineSnapshot(`
      <div>
        <div
          class="App"
        >
          <header>
            <img
              alt="logo"
              src="/src/assets/logo.svg"
            />
            ArticleFilter
          </header>
          Main
        </div>
      </div>
    `);
  });
});
