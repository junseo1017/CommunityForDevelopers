const ProfileAnswers = ({ answer }) => {
  return (
    <section>
      {answer &&
        answer.map((e) => {
          return <div>{e.title}</div>;
        })}
    </section>
  );
};
export default ProfileAnswers;
