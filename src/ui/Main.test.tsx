import { beforeEach, describe, expect, it } from "vitest";
import React from "react";
import { act, render } from "@testing-library/react";
import { Spy } from "spy4js";
import { Mock } from "../services/mocks";
import { Webservice } from "../services/Webservice";
import { Main } from "./Main";
import { StoreProvider, StoreState } from "./Store";

const Mock$Webservice = Spy.mock(Webservice, "getArticles");

describe("<Main />", () => {
  beforeEach(() => {
    Mock$Webservice.getArticles.resolves(Mock.articles);
  });

  it("displays a spinner while loading the articles", async () => {
    // given / when
    const { container } = render(
      <StoreProvider>
        <Main />
      </StoreProvider>
    );

    // then
    Mock$Webservice.getArticles.wasCalled(1);
    expect(container.querySelector("main")!.classList.contains("loading")).toBe(
      true
    );

    // when
    await act(nextTick);

    // then
    Mock$Webservice.getArticles.wasNotCalled();
    expect(container.querySelector("main")!.classList.contains("loading")).toBe(
      false
    );
    expect(container.querySelectorAll(".article-list > div").length).toBe(
      Mock.articles.length
    );

    // when
    await act(() => {
      StoreState.set({ filter: "Morde" });
    });

    // then
    expect(container.querySelectorAll(".article-list > div").length).toBe(1);
  });
});
