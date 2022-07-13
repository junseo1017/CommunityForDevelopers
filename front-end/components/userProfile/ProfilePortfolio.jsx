/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { myInfoCardContainer } from "./styles/MyInfoStyles";
import { loadMyPortfolios } from "../../actions/portfolio";
import { useDispatch, useSelector } from "react-redux";
const ProfilePortfolio = () => {
  const { userPortfolios } = useSelector((state) => state.portfolio);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const onClick = async () => {
    dispatch(loadMyPortfolios(id));
    console.log(userPortfolios);
  };

  return (
    <Card css={myInfoCardContainer}>
      <button onClick={onClick}>hihihihi</button>
    </Card>
  );
};
export default ProfilePortfolio;
