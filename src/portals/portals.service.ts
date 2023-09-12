import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { getDataCenterUrl } from 'src/utils';
import { CreateTaskTimeLog } from './dto/create-task-timelog.dto';
import { cloud } from '../conf';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortalsService {
  constructor(
    private readonly httpService: HttpService,
    // private readonly configService: ConfigService
    ) {}

  async addTimeLogForTasks(req) {
    const { taskId } = req.params;
    const { duration, billable, description } = req.body;
    const baseUrl = 'https://app.asana.com/api/1.0';
    const token = req.headers['authorization'];
      const url = `${baseUrl}/tasks/${taskId}/time_tracking_entries`;
      console.log('token', token);
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const data = {
        data: {
          duration_minutes: duration
        },
      };
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          return null;
          throw new Error('Failed to add time to task');
        }
        return await response.json();
      }
      catch (error) {
        console.error(error);
        return null;
        throw new Error('Failed to add time to task');
      }
  }

  async getAllWorkspaces(req: any) {
    const url = 'https://app.asana.com/api/1.0/workspaces';
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${req.query.access_token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('all workspaces', data);
    return data;
  }

  async getAllTasksOfLists(req: any) {
    const baseUrl = 'https://app.asana.com/api/1.0';

    const { projectId } = req.params;

    const url = `${baseUrl}/tasks?project=${projectId}`;
    const headers = {
      Authorization: `Bearer ${req.query.access_token}`,
    };
    const response = await fetch(url, { headers });
    const json = await response.json();
    return json.data;
  }

  async getAllProjects(req: any) {
    const data: any = [];
    console.log('all projects ids', req.query.ids);
    if (req.query.ids)
    for (let item of req.query.ids) {
      const tempUrl = 'https://app.asana.com/api/1.0';
      const url = `${tempUrl}/projects?workspace=${item}`;
      const headers = {
        Authorization: `Bearer ${req.query.access_token}`,
      };
      const response = await fetch(url, { headers });
      const json = await response.json();
      const temp = {
        org_id: item,
        projects: json.data
      }
      data.push(temp);
    }

    return data;
  }
}
