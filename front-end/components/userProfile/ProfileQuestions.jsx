const ProfileQuestions = ({ question }) => {
  console.log(question);
  return (
    <section>
      {question &&
        question.map((e) => {
          return <div key={e._id}>{e.title}</div>;
        })}
    </section>
  );
};
export default ProfileQuestions;
