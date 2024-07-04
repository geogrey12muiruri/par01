import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BottomNav = () => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  const { data } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className="flex flex-col items-center">
          <MdHomeFilled className="w-8 h-8 text-white" />
          <span className="text-sm text-white">Home</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center">
          <IoNotifications className="w-6 h-6 text-white" />
          <span className="text-sm text-white">Notifications</span>
        </Link>
        <Link to={`/profile/${data?.username}`} className="flex flex-col items-center">
          <FaUser className="w-6 h-6 text-white" />
          <span className="text-sm text-white">Profile</span>
        </Link>
        {data && (
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <BiLogOut className="w-6 h-6 text-white" />
            <span className="text-sm text-white">Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
