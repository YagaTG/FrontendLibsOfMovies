import { useState } from "react";
import { ISearch } from "./ISearch";
import Button from "../Button/Button";
import "./style.scss";

export const Search = ({ handleData, placeholder, searchFunc }: ISearch) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = async () => {
    if (searchText.trim()) {
      console.log("Поиск по", searchText);
      const data = await searchFunc(searchText);
      handleData(data, searchText);
      
    }
  };

  return (
    <div className="search__container">
      <input
        className="search__input"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchText(e.currentTarget.value);
        }}
      ></input>
      <Button text="Найти" onClick={handleSearch}></Button>
    </div>
  );
};
