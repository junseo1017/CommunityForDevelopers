/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Input } from "antd";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { myInfoCardContainer } from "./styles/MyInfoStyles";

const ProfileMyInfo = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Card css={myInfoCardContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>{"이메일"}</label>
        <input readOnly={router.query.id} {...register("email")} />
        <label>{"비밀번호"}</label>
        <input {...register("password")} />

        <input type="submit" />
      </form>
    </Card>
  );
};
export default ProfileMyInfo;
