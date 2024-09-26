import {
  firstCategories,
  secondCategories,
  thirdCategories,
} from "../../constants/categories";
import FilterView from "./FilterView";

// Tous les themes

export const FirstRoute = ({ route }) => (
  <FilterView data={firstCategories} title={route.title} />
);

// Restons simple

export const SecondRoute = ({ route }) => (
  <FilterView data={secondCategories} title={route.title} />
);

// On les adore

export const ThirdRoute = ({ route }) => (
  <FilterView data={firstCategories} title={route.title} />
);

// Ca se complique

export const FourthRoute = ({ route }) => (
  <FilterView data={thirdCategories} title={route.title} />
);
