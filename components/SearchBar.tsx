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
  const router = useRouter();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length >= 1) {
        let users: User[] = await searchUsers(searchTerm);
        users = users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(users);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleBlur = () => {
    // Затримка потрібна щоб закривати пошукову строку якщо юзер бажає
    setTimeout(() => {
      setSearchResults([]);
    }, 100);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
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
