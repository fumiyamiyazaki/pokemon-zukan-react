import { toggleTheme } from "@/app/lib/features/test/testSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  return (
    <div>
      <p>Current Theme: {currentTheme}</p>
      <br />
      <button onClick={() => dispatch(toggleTheme())}>
        Update Theme Color
      </button>
    </div>
  );
};

export default ThemeToggle;
