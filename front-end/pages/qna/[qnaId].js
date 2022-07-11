import AppLayout from "../../components/AppLayout";
import QuestionDetail from "../../components/Questions/QuestionDetail/QuestionDetail";
import { useRouter } from "next/router";

const QuestionDetailPage = ({ qna }) => {
  return (
    <AppLayout>
      <QuestionDetail qna={qna} />
    </AppLayout>
  );
};

export default QuestionDetailPage;

export async function getServerSideProps({ params }) {
  console.log("context", params);

  try {
    const response = await axios.get(`/api/qnas/${qnaId}`);
    console.log("response: ", response.data);
    const qna = response.data;

    return {
      props: {
        qna,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
