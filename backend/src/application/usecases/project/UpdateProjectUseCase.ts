import { Project } from "../../../domain/entities/Project";
import { ProjectRepository } from "../../../infrastructure/database/repositories/ProjectRepository";
import { MESSAGES } from "../../../shared/constants/ResponseMessages";
import { TeamRepository } from "../../../infrastructure/database/repositories/TeamRepository"
export class UpdateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private teamRepository: TeamRepository
  ) {}

  async execute(
    id: string,
    updateData: Partial<{
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
      status: "pending" | "in-progress" | "completed" | "on-hold";
      priority?: "low" | "medium" | "high" | "critical"; 
      category?: string;  
      teamMembers?: string[];
      image?: string;
      documents?: string[];
    }>
  ) {
    console.log('1')
    const existingProject = await this.projectRepository.findById(id);
    
    if (!existingProject) {
      throw new Error(MESSAGES.PROJECT.PROJECT_NOT_FOUND);
    }
    console.log('2')
    
    if (
      updateData.startDate &&
      updateData.endDate &&
      updateData.endDate <= updateData.startDate
    ) {
      throw new Error(MESSAGES.DATE.END_DATE_BEFORE_START_DATE);
    }
    
    const updatedProject = await this.projectRepository.update(id, updateData);
    
    console.log('3')
    if (updateData.teamMembers && existingProject.teamId) {
      await this.teamRepository.updateTeamMembers(existingProject.teamId, updateData.teamMembers);
    }
    console.log('4')

    return updatedProject;

  }
}

  