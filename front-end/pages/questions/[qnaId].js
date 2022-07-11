import AppLayout from "../../components/AppLayout";
import QuestionDetail from "../../components/Questions/QuestionDetail/QuestionDetail";
import { useRouter } from "next/router";

const QuestionDetailPage = () => {
  const router = useRouter();
  const { qnaId } = router.query;

  return (
    <AppLayout>
      <QuestionDetail qnaId={qnaId} />
    </AppLayout>
  );
};

export default QuestionDetailPage;
