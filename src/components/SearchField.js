import { Search } from "@vkontakte/vkui";
import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchField = ({ onShowResult }) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onShowResult(debouncedSearch);
  }, [debouncedSearch, onShowResult]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Search
      className={"mx-auto search-input"}
      value={search}
      onChange={updateSearch}
      placeholder="Hubs search"
    />
  );
};

export default SearchField;
