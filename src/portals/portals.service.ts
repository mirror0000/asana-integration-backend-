import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortalsService {
  constructor(
    ) {}

  async addTimeLogForTasks(req) {
    const { taskId } = req.params;
    const { duration, status, description } = req.body;

    console.log('add time log', duration, status, description);
    const base_url = 'https://app.asana.com/api/1.0';
    const token = req.headers['authorization'];
    const time_url = `${base_url}/tasks/${taskId}/time_tracking_entries`;
    const section_url = `${base_url}/sections/${status}/addTask`
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
      const response = await fetch(time_url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const res = await fetch(section_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          data: {
            task: taskId
          }
        })
      });
      const json_status = await res.json();
      const json_time = await response.json();
      return {json_time, json_status};
    }
    catch (error) {
      console.error(error);
      return null;
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

  async getAllSections(req: any) {
    const { projectId } = req.params;
    console.log('get all sections projectId', projectId);
    const url = `https://app.asana.com/api/1.0/projects/${projectId}/sections`;
    const headers = {
      Authorization: `Bearer ${req.query.access_token}` 
    };

    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log('get all sections data', data);
    return data;
  }

  async getAllTasks(req: any) {
    if (!req.query.ids) {
      return;
    }
    const data : any = [];
    const headers = {
      Authorization: `Bearer ${req.query.access_token}`
    }
    const fields = 'name,completed,due_on,actual_time_minutes';
    for (let item of req.query.ids) {
        const url = `https://app.asana.com/api/1.0/sections/${item.id}/tasks?opt_fields=${fields}`
        const params = {
          opt_fields: fields
        }
        const response = await fetch(url, {
          headers: headers,
        });
        const json = await response.json();
        const temp = {
          list_name: item.name,
          card: json.data
        }
        data.push(temp);
    }
    return data;
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
