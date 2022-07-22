import AppLayout from "../../components/AppLayout";
// import QuestionDetail from "../../components/Questions/QuestionDetail/QuestionDetail";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import wrapper from "../../store";
import { myinfo } from "../../actions/user";

const QuestionDetail = dynamic(
  () => {
    return import("../../components/Questions/QuestionDetail/QuestionDetail");
  },
  { ssr: false },
);

const QuestionDetailPage = ({ qna }) => {
  console.log("[id] qna", qna);
  return (
    <AppLayout>
      <QuestionDetail qna={qna} />
    </AppLayout>
  );
};

export default QuestionDetailPage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await store.dispatch(myinfo());

  try {
    // URL query 가져오기
    const _id = query._id;

    const response = await axios.get(`/api/qnas/${_id}`);
    const qna = response.data;

    return {
      props: {
        qna,
      },
    };
  } catch (error) {
    console.log(error);
  }
});
