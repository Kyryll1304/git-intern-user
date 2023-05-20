import styles from "@/styles/SearchBar.module.css";
import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { User } from "../types";
import { searchUsers } from "../utils/userUtils";
import Link from "next/link";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const SearchBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    //+
    if (debouncedSearchTerm) {
      const search = async () => {
        let users: User[] = await searchUsers(debouncedSearchTerm);
        users = users.filter(
          (user) =>
            user.firstName
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            user.lastName
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
        );
        setSearchResults(users);
      };
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 500);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchResults([]);
    }, 100);
  };

  //+
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchIcon}>
        <FaSearch />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Search users..."
        className={styles.input}
      />
      {searchResults.length > 0 && ( //+
        <div className={styles.searchResults}>
          {searchResults.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className={styles.searchResultItem}>
                <span className={styles.text}>
                  {user.firstName} {user.lastName}
                </span>
                <span className={styles.arrowIcon}>
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
