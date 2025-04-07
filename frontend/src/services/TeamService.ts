// import api from '../api/axiosInstance';

// export const fetchTeamMembers = async (projectId: string) => {
//     try {
//       const response = await api.get(`http://localhost:5000/api/project/${projectId}`);
  
//       const project = response.data;
  
//       // Extract team lead
//       const teamLead: TeamMember = {
//         id: project.teamLeadId._id,
//         name: project.teamLeadId.name,
//         role: "Team Lead",
//         avatar: project.teamLeadId.profilePic || "https://via.placeholder.com/40",
//       };
  
//       // Extract team members (excluding the logged-in user)
//       const teamMembers: TeamMember[] = project.teamMembersDetails.map((member: any) => ({
//         id: member._id,
//         name: member.name,
//         role: member.role,
//         avatar: member.profilePic || "https://via.placeholder.com/40",
//       }));
  
//       return [teamLead, ...teamMembers];
//     } catch (error) {
//       console.error("Error fetching team members", error);
//       return [];
//     }
//   };
  