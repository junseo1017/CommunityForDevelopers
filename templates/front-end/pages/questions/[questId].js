import AppLayout from "../../components/AppLayout";
import QuestionDetail from "../../components/Questions/QuestionDetail/QuestionDetail";
import { useRouter } from "next/router";

const QuestionDetailPage = () => {
  const router = useRouter();
  const { questId } = router.query;

  return (
    <AppLayout>
      <QuestionDetail questId={questId} />
    </AppLayout>
  );
};

export default QuestionDetailPage;
