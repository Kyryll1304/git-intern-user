import styles from "@/styles/SearchBar.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { User } from "../types";
import { searchUsers } from "../lib/api";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const router = useRouter();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      const users: User[] = await searchUsers(value);
      setSearchResults(users);
    } else {
      setSearchResults([]);
    }
  };

  const handleItemClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchIcon}>
        <FaSearch />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search users..."
        className={styles.input}
      />
      {searchResults.length > 0 && (
        <ul className={styles.searchResults}>
          {searchResults.map((user) => (
            <li
              key={user.id}
              onClick={() => handleItemClick(user.id)}
              className={styles.searchResultItem}
            >
              <span className={styles.text}>
                {user.firstName} {user.lastName}
              </span>
              <span className={styles.arrowIcon}>
                <FaArrowRight />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
