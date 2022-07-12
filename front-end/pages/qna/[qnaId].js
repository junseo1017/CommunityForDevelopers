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

const QuestionDetailPage = ({ qna, answers }) => {
  console.log(answers);

  return (
    <AppLayout>
      <QuestionDetail qna={qna} answers={answers} />
    </AppLayout>
  );
};

export default QuestionDetailPage;

export async function getServerSideProps({ query }) {
  try {
    console.log("context", query);
    const qnaId = query.qnaId;

    const response = await axios.get(`/api/qnas/${qnaId}`);
    console.log("response: ", response.data);
    const qna = response.data;

    const answer_response = await axios.get("/api/qnas");
    const answers = answer_response.data.filter((answer) => answer.parentQnaId === qnaId);
    console.log("answer: ", answers);

    return {
      props: {
        qna,
        answers,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
