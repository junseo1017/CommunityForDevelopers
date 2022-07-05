import { useRouter } from "next/router";
import { Col, Row } from "antd";
import ProfileNav from "../../components/userProfile/profileNav";
import AppLayout from "../../components/AppLayout";
const Profile = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <ProfileNav />
    </AppLayout>
  );
};
export default Profile;
