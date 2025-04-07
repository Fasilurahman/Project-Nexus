import { TeamModel } from "../models/TeamModel";
import { Team } from "../../../domain/entities/Team";
import mongoose from "mongoose";

export class TeamRepository {
    async create(data: Omit<Team, "id" | "createdAt">): Promise<Team>{
        const CreatedTeam = await TeamModel.create(data);
        console.log(CreatedTeam,'123456789');
        
        return new Team(
            CreatedTeam.id,
            CreatedTeam.name,
            CreatedTeam.teamLeadId.toString(),
            CreatedTeam.members.map((member: { toString: () => string }) => member.toString()),
            CreatedTeam.createdAt
        )
    }

    async update(id: string, updateData: Partial<Team>): Promise<Team | null>{
        const updatedTeam = await TeamModel.findByIdAndUpdate(id, updateData, { new: true }).populate("members")
        if(!updatedTeam) return null;
        return new Team(
            updatedTeam.id,
            updatedTeam.name,
            updatedTeam.teamLeadId.toString(),
            updatedTeam.members.map((member: { toString: () => string }) => member.toString()),
            updatedTeam.createdAt
        )
    }

    async findById(id: string): Promise<Team | null> {
        console.log("Finding team with ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId format:", id);
            return null;
        }
        const team = await TeamModel.findById(id).populate('members','name email')
        if(!team){
            return null;
        }
        return new Team(
            team.id,
            team.name,
            team.teamLeadId.toString(),
            team.members.map((member: { toString: () => string }) => member.toString()),
            team.createdAt
        )
    }

    async delete(id: string): Promise<Boolean>{
        const result = await TeamModel.findByIdAndDelete(id)
        return !!result;
    }

    async updateTeamMembers(teamId: string, members: string[]): Promise<Team | null>{
        console.log('5')
        const memberObjectIds = members.map(member => new mongoose.Types.ObjectId(member));
        const updatedTeam = await TeamModel.findByIdAndUpdate(
            teamId,
            {members: memberObjectIds},
            {new : true}
        ).populate('members')
        
        console.log('6')
        console.log(updatedTeam,'updatedTeam');

        if (!updatedTeam) return null;

        return new Team (
            updatedTeam.id,
            updatedTeam.name,
            updatedTeam.teamLeadId.toString(),
            updatedTeam.members.map((member: { toString: () => string }) => member.toString()),
            updatedTeam.createdAt
        )
    }
}