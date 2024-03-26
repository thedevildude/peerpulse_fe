import { useAuthProvider } from "@/providers/authProvider";
import UnverifiedEmailAlert from "./UnverifiedEmailAlert";
import { CreatePost } from "./CreatePost";

const Home = () => {
  const { user } = useAuthProvider();
  return (
    <div>
      {user && !user.isEmailVerified && <UnverifiedEmailAlert />}
      <div className="grid h-screen grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 hidden bg-gray-200 md:block">
          Left Sidebar
        </div>
        <div className="col-span-2">
          <CreatePost />
        </div>
        <div className="col-span-1 hidden bg-gray-200 md:block">
          Right Sidebar
        </div>
      </div>
    </div>
  );
};

export default Home;
