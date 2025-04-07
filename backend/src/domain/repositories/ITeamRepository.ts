export interface ITeamRepository {
    _id: string,
    name: string,
    teamLeadId: string,
    members: string[],
    createdAt: Date,
}