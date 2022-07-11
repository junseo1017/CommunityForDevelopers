/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AppLayout from "../../components/AppLayout";
import dynamic from "next/dynamic";

const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, {
  ssr: false,
});
// const { CodeBoxOutput } = dynamic(async () => (await import("editorjs-react-renderer")).default, {
//   ssr: false,
// });

const Portfolio = (props) => {
  const { data, error } = props;
  if (error) {
    console.log(error);
    return null;
  }

  console.log(data.content);
  //const data = {...data.content, }
  return (
    <AppLayout>
      <h1>{data.title}</h1>

      <div style={{ marginBottom: "3rem" }}>{data.description}</div>

      <div style={{ maxWidth: "800px", margin: "0 auto", height: "100%" }}>
        <Output data={data.content} />
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  //make an ajax call to get your portfolio 서버에서 데이터 받아오기
  return {
    props: {
      data: {
        //return your portfolio data saved through editor.js //데이터는 받아올떄 Json.parse해야하지않을까
        description: "def",
        image: "tempURL",
        skills: ["React", "Next js", "Redux"],
        title: "abcd",
        content: {
          time: 1657550080666,
          blocks: [
            { id: "sheNwCUP5A", type: "header", data: { text: "Editor.js", level: 2 } },
            {
              id: "ghWhkL-seZ",
              type: "codeBox",
              data: {
                code: '<span class="hljs-meta"><span class="hljs-meta">&lt;!DOCTYPE </span><span class="hljs-meta-keyword"><span class="hljs-meta"><span class="hljs-meta-keyword">html</span></span></span><span class="hljs-meta">&gt;</span></span>\n<span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>\n<span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>\n\n<span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h2</span></span></span><span class="hljs-tag">&gt;</span></span>JavaScript Variables<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">h2</span></span></span><span class="hljs-tag">&gt;</span></span>\n\n<span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag"> </span><span class="hljs-attr"><span class="hljs-tag"><span class="hljs-attr">id</span></span></span><span class="hljs-tag">=</span><span class="hljs-string"><span class="hljs-tag"><span class="hljs-string">"demo"</span></span></span><span class="hljs-tag">&gt;</span></span><span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">p</span></span></span><span class="hljs-tag">&gt;</span></span>\n\n<span class="hljs-tag"><span class="hljs-tag">&lt;</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">script</span></span></span><span class="hljs-tag">&gt;</span></span><span class="javascript"><span class="javascript">\n</span><span class="hljs-comment"><span class="javascript"><span class="hljs-comment">// Create and display a variable:</span></span></span><span class="javascript">\n</span><span class="hljs-keyword"><span class="javascript"><span class="hljs-keyword">let</span></span></span><span class="javascript"> car = </span><span class="hljs-string"><span class="javascript"><span class="hljs-string">"Fiat"</span></span></span><span class="javascript">;\n</span><span class="hljs-built_in"><span class="javascript"><span class="hljs-built_in">document</span></span></span><span class="javascript">.getElementById(</span><span class="hljs-string"><span class="javascript"><span class="hljs-string">"demo"</span></span></span><span class="javascript">).innerHTML = car;\n</span></span><span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">script</span></span></span><span class="hljs-tag">&gt;</span></span>\n\n<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">body</span></span></span><span class="hljs-tag">&gt;</span></span>\n<span class="hljs-tag"><span class="hljs-tag">&lt;/</span><span class="hljs-name"><span class="hljs-tag"><span class="hljs-name">html</span></span></span><span class="hljs-tag">&gt;</span></span>\n<div><br></div>',
                language: "Auto-detect",
                theme:
                  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css",
              },
            },
            { id: "fvZGuFXHmK", type: "header", data: { text: "Key features", level: 3 } },
            {
              id: "xnPuiC9Z8M",
              type: "list",
              data: {
                style: "unordered",
                items: [
                  "It is a block-styled editor",
                  "It returns clean data output in JSON",
                  "Designed to be extendable and pluggable with a simple API",
                ],
              },
            },
            {
              id: "-MhwnSs3Dw",
              type: "header",
              data: { text: "What does it mean «block-styled editor»", level: 3 },
            },
            {
              id: "Ptb9oEioJn",
              type: "paragraph",
              data: {
                text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
              },
            },
            {
              id: "-J7nt-Ksnw",
              type: "paragraph",
              data: {
                text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
              },
            },
            {
              id: "SzwhuyoFq6",
              type: "header",
              data: { text: "What does it mean clean data output", level: 3 },
            },
            {
              id: "x_p-xddPzV",
              type: "paragraph",
              data: {
                text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
              },
            },
            {
              id: "6W5e6lkub-",
              type: "paragraph",
              data: {
                text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
              },
            },
            {
              id: "eD2kuEfvgm",
              type: "paragraph",
              data: {
                text: "Clean data is useful to sanitize, validate and process on the backend.",
              },
            },
            { id: "N8bOHTfUCN", type: "delimiter", data: {} },
            {
              id: "IpKh1dMyC6",
              type: "paragraph",
              data: {
                text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
              },
            },
            {
              id: "FF1iyF3VwN",
              type: "image",
              data: {
                file: { url: "https://codex.so/public/app/img/external/codex2x.png" },
                caption: "",
                withBorder: false,
                stretched: false,
                withBackground: false,
              },
            },
          ],
          version: "2.25.0",
        },
      },
    },
  };
}

export default Portfolio;
