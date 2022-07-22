/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Avatar, Button, Comment, Form, TextArea, Modal, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MentionsInput, Mention } from "react-mentions";
import moment from "moment";
import axios from "axios";
import { CommentsContainer, CommentStyle } from "../styles/QuestionStyle";
import useConfirmModal from "../../../hooks/useConfirmModal";
import Router from "next/router";

const Editor = ({ comment, onChange, userList, onSubmit }) => {
  return (
    <>
      <MentionsInput
        className="mentions-input"
        value={comment}
        onChange={onChange}
        placeholder="댓글을 작성하세요."
        a11ySuggestionsListLabel={"Suggested mentions"}>
        <Mention
          className="mentions"
          markup="@__display__"
          trigger="@"
          data={userList}
          renderSuggestion={(highlightedDisplay, focused) => (
            <div className={`user ${focused ? "focused" : ""}`}>{highlightedDisplay}</div>
          )}
          style={{ backgroundColor: "rgb(24, 144, 255, 0.25)" }}
        />
      </MentionsInput>
      <Button
        type="primary"
        onClick={() => {
          onSubmit();
        }}>
        댓글 작성하기
      </Button>
    </>
  );
};

const Comments = ({ currentComments, contentId, user }) => {
  const { me } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([...currentComments]);
  console.log(comments);

  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`api/comments/${deleteId}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getCurrentComments = async () => {
      try {
        const response = await axios.get(`/api/qnas/${contentId}`);
        setComments((curr) => [...curr, response.data.comments]);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentComments();
  }, []);

  useEffect(() => {
    // 유저 전체 리스트 조회해 멘션 기능 활성화하기
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users");

        // 데이터 변환
        const users = response.data.map((user) => {
          return { id: user._id, display: user.nickname };
        });

        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const redirectHome = useCallback(() => {
    Router.push("/");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스입니다.",
      description: "로그인 하시겠습니까? 취소하면 홈으로 이동합니다.",
    }),
    [],
  );
  const [showConfirm] = useConfirmModal({
    okFunc: redirectLogin,
    cancleFunc: redirectHome,
    message: modalMessage,
  });

  const handleCreateSubmit = async () => {
    if (me === undefined) showConfirm();
    console.log("submit");
    // comment.length > 0 ? setComments([...comments, comment]) : alert("댓글을 작성하세요.");
    try {
      const response = await axios.post(`/api/comments/qna/${contentId}`, {
        content: comment,
      });
      console.log("댓글추가", response);
      // router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={CommentsContainer}>
      {comments && (
        <List
          dataSource={comments}
          header={`${comments.length}${comments.length > 1 ? "개의 댓글들" : "개의 댓글"}`}
          itemLayout="horizontal"
          renderItem={(comment) => {
            return (
              <div className="comment-container">
                <Comment
                  author={<p>{user.nickname}</p>}
                  avatar={<Avatar src={user.imgUrl} alt={user.nickname} />}
                  css={CommentStyle}
                  content={<p>{comment.content || comment}</p>}
                  datetime={<span>{moment(comment.createdAt).fromNow()}</span>}
                />
                {me._id === comment.author?._id && (
                  <div className="comment-mode">
                    <DeleteOutlined
                      onClick={() => {
                        handleDelete(comment._id);
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }}
        />
      )}
      <Comment
        avatar={<Avatar src={me?.imgUrl || "/image/profile_image_default.jpg"} alt={me.nickname} />}
        content={
          <Editor
            value={comment}
            onChange={handleChange}
            userList={userList}
            onSubmit={handleCreateSubmit}
          />
        }
      />
    </div>
  );
};

export default Comments;
