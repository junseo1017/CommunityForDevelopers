const ProfileQuestions = ({ question }) => {
  return (
    <section>
      {question &&
        question.map((e) => {
          return <div>{e.title}</div>;
        })}
    </section>
  );
};
export default ProfileQuestions;
