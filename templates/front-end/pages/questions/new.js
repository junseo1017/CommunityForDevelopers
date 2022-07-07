import AppLayout from "../../components/AppLayout";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Questions/Editor.js"), {
  ssr: false,
});

const AddQuestionEditor = () => {
  return (
    <AppLayout>
      <Editor title="질문하기" />
    </AppLayout>
  );
};

export default AddQuestionEditor;
