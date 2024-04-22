import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UnitTestSamplePage from "../../unittest-sample/page";

afterEach(() => cleanup());

describe("レンダリングテスト", () => {
  it("要素が正常に表示されていることを確認", () => {
    // htmlの構造を取得
    render(<UnitTestSamplePage />);
    // screen.debug();
    // https://github.com/A11yance/aria-query#elements-to-roles
    // screen.debug(screen.getByRole("heading"));

    // https://jestjs.io/docs/en/expect
    // 要素が存在するかのテスト

    expect(screen.getByRole("heading")).toBeTruthy();

    expect(screen.getAllByRole("textbox")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();

    // textの内容が存在するかのテスト
    // screen.debug(screen.getByText("Udemy"));
    // 指定したテキストが存在することをテスト
    expect(screen.getByText("Udemy")).toBeTruthy();
    // 指定したテキストが存在しないことをテスト
    expect(screen.queryByText("Udemyyyy")).toBeNull();

    // 指定したidが存在することをテスト
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});

describe("ユーザーイベントテスト", () => {
  it("入力フォーム確認", () => {
    render(<UnitTestSamplePage />);

    const inputElement = screen.getByPlaceholderText(
      "Enter"
    ) as HTMLInputElement;
    // ユーザーが入力フォームに"Test Input"と入力する動作をテスト
    fireEvent.change(inputElement, { target: { value: "Test Input" } });
    // console.log(inputValue);
    // 入力フォームの値が"Test Input"になっているかをチェック
    expect(inputElement.value).toBe("Test Input");
  });
});
