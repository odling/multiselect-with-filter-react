import { ThemeProvider } from "styled-components";
import themes from "./theming";
import MultiSelect from "./components";
import GlobalStyles from "./GlobalStyles";
import * as Layout from "./App.styles";
import { useCallback, useMemo, useState } from "react";
import {
  charactersApi,
  useGetCharactersQuery,
} from "./redux/features/charactersApi";
import { IMultiSelectProps } from "./components/MultiSelect/MultiSelect.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Themes } from "./theming/styled";
import { setTheme } from "./redux/features/themeSlice";
import debounce from "lodash/debounce";

function App() {
  const [filterText, setFilterText] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    IMultiSelectProps["items"]
  >([]);

  const dispatch = useDispatch();
  const handleInputChange = useMemo(
    () =>
      debounce(
        (value: string) => {
          setFilterText(value);
          setCurrentPage(1);
          dispatch(charactersApi.util.resetApiState());
        },
        200,
        { trailing: true }
      ),
    [dispatch]
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { currentData: charactersData, isFetching } = useGetCharactersQuery({
    name: filterText,
    page: currentPage,
  });

  const items: IMultiSelectProps["items"] = useMemo(
    () =>
      charactersData && charactersData.results.length > 0
        ? charactersData.results.map((data) => ({
            id: String(data.id),
            title: data.name,
            description: `${data.episode.length} Episodes`,
            imageSrc: data.image,
          }))
        : [],
    [charactersData]
  );

  const totalPages = charactersData?.info.pages ?? 0;

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [totalPages, setCurrentPage, currentPage]);

  const currentTheme = useSelector<RootState, keyof Themes>(
    (state) => state.theme.currentTheme
  );

  const handleSwitchTheme = useCallback(() => {
    if (currentTheme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  }, [currentTheme, dispatch]);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyles />
      <Layout.Header>
        <Layout.ThemeButton
          onClick={handleSwitchTheme}
          aria-label="Switch theme"
        >
          {currentTheme === "light" ? (
            <Layout.DarkIcon />
          ) : (
            <Layout.LightIcon />
          )}
        </Layout.ThemeButton>
      </Layout.Header>
      <Layout.Main>
        <Layout.Panel>
          <MultiSelect
            name="multiSelect"
            items={items}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            onInputChange={handleInputChange}
            label="Pick characters"
            placeholder="Search for a character"
            isLoading={isFetching}
            onEndScroll={handleNextPage}
          />
        </Layout.Panel>
      </Layout.Main>
    </ThemeProvider>
  );
}

export default App;
