import React, {
  ChangeEvent,
  CSSProperties,
  Reducer,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { ArticleData } from "../../services/Webservice";

const zoomStyles: CSSProperties = {
  position: "absolute",
  width: "100%",
  backgroundColor: "#b02786",
  height: "100vh",
  left: 0,
  top: 0,
};

type ArticleState = { zoom: boolean; color: string };
type ArticleAction =
  | { type: "CLICK" }
  | { type: "COLOR_CHANGE"; color: string };

const initialState: ArticleState = { zoom: false, color: "#b02786" };

const articleReducer = (
  state: ArticleState,
  action: ArticleAction,
): ArticleState => {
  switch (action.type) {
    case "CLICK":
      return { ...state, zoom: !state.zoom };
    case "COLOR_CHANGE":
      return { ...state, color: action.color };
    default:
      return state;
  }
};

type ArticleProps = { data: ArticleData };

export const Article: React.FC<ArticleProps> = ({ data }) => {
  const [{ zoom, color }, dispatch] = useReducer<
    Reducer<ArticleState, ArticleAction>
  >(articleReducer, initialState);

  const onClick = useCallback(() => dispatch({ type: "CLICK" }), []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "COLOR_CHANGE", color: e.target.value }),
    [],
  );

  const outerStyle = useMemo<CSSProperties | undefined>(
    () => (zoom ? zoomStyles : undefined),
    [zoom],
  );

  return (
    <div
      style={outerStyle ? { ...outerStyle, backgroundColor: color } : undefined}
    >
      <img
        onClick={onClick}
        src={`https://cdn.pixabay.com/photo${data.cover}`}
        alt="cover"
        style={{ width: "100%" }}
      />
      <div>Title: {data.title}</div>
      <div>Authors: {data.authors}</div>
      {zoom && <input value={color} onChange={onChange} />}
    </div>
  );
};
