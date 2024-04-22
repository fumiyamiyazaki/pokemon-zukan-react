"use client";
import { SetStateAction, useState } from "react";

const UnitTestSamplePage = () => {
  const [input, setInput] = useState("");
  const outputValue = () => {
    if (input) {
      alert(input);
    }
  };
  const updateValue = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <h1>React Testing Library Lesson</h1>
      {/* レンダリングテスト用 */}
      <input type="text" />
      <button>Click1</button>
      <button>Click2</button>
      <p>Udemy</p>
      <span data-testid="copyright">@React</span>

      {/* ユーザーイベントテスト用 */}
      <div>
        <input
          id="title"
          type="text"
          placeholder="Enter"
          value={input}
          onChange={(e) => updateValue(e)}
        />
        <button onClick={outputValue}>アラート</button>
      </div>
    </div>
  );
};

export default UnitTestSamplePage;
