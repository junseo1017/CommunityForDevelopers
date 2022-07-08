/** @jsxImportSource @emotion/react */
////////////////수정 나중에 참고 X
import { css, jsx } from "@emotion/react";
import Output from "editorjs-react-renderer";
import AppLayout from "../../components/AppLayout";

const Portfolio = (props) => {
  const { data, error } = props;
  if (error) {
    console.log(error);
    return null;
  }

  return (
    <AppLayout>
      <h1>{data.title}</h1>

      <div style={{ marginBottom: "3rem" }}>{data.description}</div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Output data={data.portfolioData} />
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;

  //make an ajax call to get your blog 서버에서 데이터 받아오기

  return {
    props: {
      data: {
        //return your blog data saved through editor.js //데이터
      },
    },
  };
}

export default Portfolio;
