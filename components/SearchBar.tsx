import styles from "@/styles/SearchBar.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { User } from "../types";
import { searchUsers } from "../utils/userUtils";
import Link from "next/link";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const router = useRouter();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 1) {
      //+
      let users: User[] = await searchUsers(value);
      users = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(users);
    } else {
      setSearchResults([]);
    }
  };

  const handleBlur = () => {
    // Затримка потрібна щоб закривати пошукову строку якщо юзер бажає
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
      {searchResults.length > 0 && (
        <ul className={styles.searchResults}>
          {searchResults.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <li className={styles.searchResultItem}>
                <span className={styles.text}>
                  {user.firstName} {user.lastName}
                </span>
                <span className={styles.arrowIcon}>
                  <FaArrowRight />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
