import { Body, Controller, Get, Post, Req, Param, UseGuards } from '@nestjs/common';
import { PortalsService } from './portals.service';
import { JwtAuthGuard } from 'src/auths/guard/jwt.auth.guard';
import { CreateTimeLog } from './dto/create-timelog.dto';
import { CreateTaskTimeLog } from './dto/create-task-timelog.dto';

@Controller('portals')
// @UseGuards(JwtAuthGuard)
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Get('workspaces/all')
  async getAllWorkspaces(@Req() req) {
    const workspaces: any = await this.portalsService.getAllWorkspaces(req);
    console.log('workspaces', workspaces);
    return workspaces.data;
  }

  @Get('projects')
  async getAllListsOfWorkspace(@Req() req) {
    const projects: any = await this.portalsService.getAllProjects(req);
    console.log('projects', projects);
    return projects;
  }

  @Get(':projectId/tasks')
  async getAllTasksOfLists(@Req() req) {
    try {
      const tasks: any = await this.portalsService.getAllTasksOfLists(req);
      // const issues = tasks?.map(item => ({ 
      //   id: item.id,
      //   name: item.fields.summary, 
      //   key: item.key, 
      //   status: item.fields.status.name, 
      //   createdPerson: item.fields.creator.displayName, 
      //   priority: item.fields.priority.id 
      // }));
      console.log('tasks', tasks);
      return tasks;
    }
    catch(error) {
      console.log('list issue error', error);
      return error;
    }
  }

  @Post(':taskId/log')
  async addTimeLogForTasks(@Req() req) {
    console.log('taskId', req.params.taskId);
    const log: any = await this.portalsService.addTimeLogForTasks(req);
    console.log(log);
    return log;
  }

}
