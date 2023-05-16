import styles from "@/styles/UserCard.module.css";

import React from "react";
import Link from "next/link";
import { User } from "../types";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`}>
      <div className={styles.card}>
        <img src={user.image} alt={user.firstName} />
        <h2>
          {user.firstName} {user.lastName}
        </h2>
      </div>
    </Link>
  );
};

export default UserCard;
