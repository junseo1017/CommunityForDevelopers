import React from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";

const dummy_questions = [
  {
    qusetId: "q1",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 3,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
    date: new Date(),
    answers: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum hic laborum accusantium iure natus eum quod vero vitae alias, perferendis ad maiores, odit expedita, neque placeat. Possimus iure sequi aspernatur.",
      "Possimus numquam temporibus animi aspernatur suscipit officiis cupiditate, itaque beatae harum sunt! Libero cum ex fuga, voluptatibus sequi magni, laboriosam quae enim alias accusamus odit provident minus repellat eveniet aspernatur!",
      "In dolore distinctio fugiat necessitatibus omnis excepturi recusandae voluptate iure esse labore temporibus autem animi suscipit neque, harum sapiente laudantium porro officiis commodi. Temporibus facilis sit soluta corporis cumque nisi!",
    ],
  },
  {
    qusetId: "q2",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 92,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
    date: new Date(),
    answers: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum hic laborum accusantium iure natus eum quod vero vitae alias, perferendis ad maiores, odit expedita, neque placeat. Possimus iure sequi aspernatur.",
      "Possimus numquam temporibus animi aspernatur suscipit officiis cupiditate, itaque beatae harum sunt! Libero cum ex fuga, voluptatibus sequi magni, laboriosam quae enim alias accusamus odit provident minus repellat eveniet aspernatur!",
      "In dolore distinctio fugiat necessitatibus omnis excepturi recusandae voluptate iure esse labore temporibus autem animi suscipit neque, harum sapiente laudantium porro officiis commodi. Temporibus facilis sit soluta corporis cumque nisi!",
    ],
  },
  {
    qusetId: "q3",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 122,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
    date: new Date(),
    answers: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum hic laborum accusantium iure natus eum quod vero vitae alias, perferendis ad maiores, odit expedita, neque placeat. Possimus iure sequi aspernatur.",
      "Possimus numquam temporibus animi aspernatur suscipit officiis cupiditate, itaque beatae harum sunt! Libero cum ex fuga, voluptatibus sequi magni, laboriosam quae enim alias accusamus odit provident minus repellat eveniet aspernatur!",
      "In dolore distinctio fugiat necessitatibus omnis excepturi recusandae voluptate iure esse labore temporibus autem animi suscipit neque, harum sapiente laudantium porro officiis commodi. Temporibus facilis sit soluta corporis cumque nisi!",
    ],
  },
  {
    qusetId: "q4",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 1225,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
    date: new Date(),
    answers: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum hic laborum accusantium iure natus eum quod vero vitae alias, perferendis ad maiores, odit expedita, neque placeat. Possimus iure sequi aspernatur.",
      "Possimus numquam temporibus animi aspernatur suscipit officiis cupiditate, itaque beatae harum sunt! Libero cum ex fuga, voluptatibus sequi magni, laboriosam quae enim alias accusamus odit provident minus repellat eveniet aspernatur!",
      "In dolore distinctio fugiat necessitatibus omnis excepturi recusandae voluptate iure esse labore temporibus autem animi suscipit neque, harum sapiente laudantium porro officiis commodi. Temporibus facilis sit soluta corporis cumque nisi!",
    ],
  },
  {
    qusetId: "q5",
    title: "How to use google analytics with next.js app?",
    description:
      "I'm using styled-components with next.js so my styles need to be server-side rendered, hence how can I add google analytics to my website? I checked next.js google analytics example but as I said my _document file is different because of using styled-components.",
    recommendations: 0,
    tags: ["next.js", "styled-components", "google-analytics"],
    user: "userA",
    date: new Date(),
    answers: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum hic laborum accusantium iure natus eum quod vero vitae alias, perferendis ad maiores, odit expedita, neque placeat. Possimus iure sequi aspernatur.",
      "Possimus numquam temporibus animi aspernatur suscipit officiis cupiditate, itaque beatae harum sunt! Libero cum ex fuga, voluptatibus sequi magni, laboriosam quae enim alias accusamus odit provident minus repellat eveniet aspernatur!",
      "In dolore distinctio fugiat necessitatibus omnis excepturi recusandae voluptate iure esse labore temporibus autem animi suscipit neque, harum sapiente laudantium porro officiis commodi. Temporibus facilis sit soluta corporis cumque nisi!",
    ],
  },
];

const questions = () => {
  return (
    <AppLayout>
      <Questions questions={dummy_questions} />
    </AppLayout>
  );
};

export default questions;
