import AppLayout from "../../components/AppLayout";
// import QuestionDetail from "../../components/Questions/QuestionDetail/QuestionDetail";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";

const QuestionDetail = dynamic(
  () => {
    return import("../../components/Questions/QuestionDetail/QuestionDetail");
  },
  { ssr: false },
);

const QuestionDetailPage = ({ qna }) => {
  return (
    <AppLayout>
      <QuestionDetail qna={qna} />
    </AppLayout>
  );
};

export default QuestionDetailPage;

export async function getServerSideProps({ query }) {
  console.log("context", query);
  const qnaId = query.qnaId;

  const response = await axios.get(`/api/qnas/${qnaId}`);
  console.log("response: ", response.data);
  const qna = response.data;

  return {
    props: {
      qna,
    },
  };
}
