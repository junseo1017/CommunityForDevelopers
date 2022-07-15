import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import CodeBox from "@bomdi/codebox";

const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    },
  },
  simpleImage: SimpleImage,
  table: Table,
  marker: Marker,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  warning: Warning,
  codeBox: {
    class: CodeBox,
    config: {
      themeURL:
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
      //themeName: "atom-one-dark", // Optional
      useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
    },
  },
  raw: Raw,
  header: {
    class: Header,
    shortcut: "CMD+SHIFT+H",
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
};

export default EDITOR_JS_TOOLS;
