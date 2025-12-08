// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  // Optional fields that might not be in Django model yet
  rating?: number;
  fullDescription?: string;
  client?: string;
  year?: string;
  team?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
}

export const projectsApi = {
  // Fetch all projects
  getAllProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Fetch single project by ID
  getProjectById: async (id: string | number): Promise<Project> => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },
};
