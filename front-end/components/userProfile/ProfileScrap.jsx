/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { profileContentCardContainer } from "./styles/MyInfoStyles";

const ProfileScrap = () => {
  const router = useRouter();

  return <Card css={profileContentCardContainer}></Card>;
};
export default ProfileScrap;
