import styles from "@/styles/UserList.module.css";

import React from "react";
import { FC } from "react";
import UserCard from "./UserCard";
import { User } from "../types";

interface UserListProps {
  users: User[];
}
//+
const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className={styles["users-grid"]}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
