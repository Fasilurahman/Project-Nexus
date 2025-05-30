import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from '../components/Design/Sidebar';
import UserModal from '../components/Design/UserModal';
import { fetchUsers, blockUser, searchUsers } from "../services/UserService";
import { User } from "../types"



const StatusBadge = ({ isBlocked }: { isBlocked: boolean }) => {
  const status = isBlocked ? "Inactive" : "Active";
  const colorClasses = status === "Active"
    ? "bg-green-500/10 text-green-500"
    : "bg-red-500/10 text-red-500";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
      {status}
    </span>
  );
};

function UsersPage() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
  
      if (Array.isArray(response.users)) {
        const totalPages = Math.ceil(response.users.length / 5); 
        setUsersData(response.users);
        setTotalPages(totalPages);
      } else {
        setUsersData([]); 
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
    }
  };
  
  const filteredUsers = Array.isArray(usersData) ? usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const paginatedUsers = filteredUsers.slice((page - 1) * 5, page * 5);


  const handleBlockUser = async (userId: string) => {
    console.log('Blocking user...');
    
    try {
      const { user } = await blockUser(userId);
      setUsersData((prev) =>
        prev.map((userData) =>
          userData.id === userId ? { ...userData, isBlocked: user.isBlocked } : userData
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const data = await searchUsers(query); // ✅ Use the service function
      setUsersData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    handleSearch(searchQuery)
  },[searchQuery])

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [page]);

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#1A1F37] text-white pl-12 pr-4 py-2.5 rounded-xl w-[280px] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1F37] rounded-xl overflow-hidden shadow-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Name</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Phone</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Location</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Company</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Status</th>
                  <th className="py-4 px-6 text-right text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    onClick={() => handleUserClick(user)}
                    className="border-b border-gray-700/50 hover:bg-gray-800/20 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{user.phone}</td>
                    <td className="py-4 px-6 text-gray-300">{user.location}</td>
                    <td className="py-4 px-6 text-gray-300">{user.company}</td>
                    <td className="py-4 px-6">
                      <StatusBadge isBlocked={user.isBlocked} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlockUser(user.id);
                        }}
                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                      >
                        <UserX size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        />
      </div>
    </div>
  );
}

export default UsersPage;
