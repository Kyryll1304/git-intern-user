import styles from "@/styles/users.module.css";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect, FC } from "react";
import UserList from "../../components/UserList";
import SearchBar from "../../components/SearchBar";
import { User } from "../../types";
import { getUsers } from "../../utils/userUtils";
import { getPaginationData } from "../../utils/pagination";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? Number(context.query.page) : 1;
  const users = await getUsers(page);
  return { props: { users, page } };
};

type UsersPageProps = {
  //+
  users: User[];
  page: number;
};

const UsersPage: FC<UsersPageProps> = ({ users, page }) => {
  //+
  const totalPages = 10;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);
  const { paginationStart, paginationEnd } = getPaginationData(
    currentPage,
    totalPages
  );

  const handlePaginationClick = (newPage: number) => {
    //Оновлює стан currentPage для відображення активної сторінки,потім виконую router.push().
    setCurrentPage(newPage);
    router.push(`/users?page=${newPage}`);
  };
  //+
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Wake up,user...</h1>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
      <UserList users={users} />
      <div className={styles.pagination}>
        {currentPage >= 1 && (
          <button
            className={styles.paginationButton}
            onClick={() => handlePaginationClick(currentPage - 1)}
            disabled={currentPage === 1} //+
          >
            -
          </button>
        )}
        {paginationStart > 1 && (
          <>
            <Link href={`/users?page=1`}>
              <button
                onClick={() => handlePaginationClick(1)}
                className={`${styles.pageButton} ${
                  currentPage === 1 ? styles.activePage : ""
                }`}
              >
                1
              </button>
            </Link>
            <button className={styles.ellipsisButton} disabled>
              ...
            </button>
          </>
        )}
        {Array.from(
          { length: paginationEnd - paginationStart + 1 },
          (_, i) => i + paginationStart
        ).map((pageNum) => (
          <Link key={pageNum} href={`/users?page=${pageNum}`}>
            <button
              onClick={() => handlePaginationClick(pageNum)}
              className={`${styles.pageButton} ${
                currentPage === pageNum ? styles.activePage : ""
              }`}
            >
              {pageNum}
            </button>
          </Link>
        ))}
        {paginationEnd < totalPages && (
          <>
            <button className={styles.ellipsisButton} disabled>
              ...
            </button>
            <Link href={`/users?page=${totalPages}`}>
              <button
                onClick={() => handlePaginationClick(totalPages)}
                className={`${styles.pageButton} ${
                  currentPage === totalPages ? styles.activePage : ""
                }`}
              >
                {totalPages}
              </button>
            </Link>
          </>
        )}
        {currentPage <= totalPages && (
          <button
            className={styles.paginationButton}
            onClick={() => {
              if (currentPage < totalPages) {
                handlePaginationClick(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages} //+
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}; //+

export default UsersPage;
