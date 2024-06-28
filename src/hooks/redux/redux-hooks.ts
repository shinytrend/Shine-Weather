import { useDispatch } from "react-redux";
import type { AppDispatch } from "src/main";

export const useAppDispatch = () => useDispatch<AppDispatch>();
