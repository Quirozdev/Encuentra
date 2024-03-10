import React from "react";
import { View, TouchableOpacity } from "react-native";
import SearchIcon from "../../../assets/images/search.svg"
const SearchButton = () => {
    return (
        <TouchableOpacity>
            <SearchIcon/>
        </TouchableOpacity>
    );
}

export default SearchButton;