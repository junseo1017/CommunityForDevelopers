const ProfileAnswers = ({ answer }) => {
  console.log(answer[0].createdAt);
  return (
    <section>
      {answer &&
        answer.map((e) => {
          return <div key={e._id}>{e.title}</div>;
        })}
    </section>
  );
};
export default ProfileAnswers;
