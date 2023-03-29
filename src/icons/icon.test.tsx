import { describe, expect, it } from "vitest";
import { IconSearch, IconSpinner } from "./icon";

describe("Icon", () => {
  it("renders with additional className", () => {
    const iconAdd = IconSearch({})!;
    expect(iconAdd.type).toBe("svg");
    expect(iconAdd.props.className).toBe("icon");

    const iconBarCode = IconSpinner({ className: "spinner" })!;
    expect(iconBarCode.type).toBe("svg");
    expect(iconBarCode.props.className).toBe("spinner icon");
  });
});
