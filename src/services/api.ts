// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://decentdigital.pythonanywhere.com/api';

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

  // Submit contact form
  submitContact: async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(result));
      }
      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  // Execute agent task
  executeAgentTask: async (prompt: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/agent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(result));
      }
      return result;
    } catch (error) {
      console.error('Error executing agent task:', error);
      throw error;
    }
  },

  // AI Project Editor (Legacy - One Shot)
  editProject: async (zipFile: File, instructions: string) => {
    // ... existing legacy code ...
    try {
      const formData = new FormData();
      formData.append('project_zip', zipFile);
      formData.append('instructions', instructions);

      const response = await fetch(`${API_BASE_URL}/ai-edit/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process project');
      }

      const data = await response.json();

      // Convert base64 to blob
      const byteCharacters = atob(data.zip_file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });

      return {
        logs: data.logs,
        explanation: data.explanation,
        files: data.files,
        blob: blob
      };
    } catch (error) {
      console.error('Error editing project:', error);
      throw error;
    }
  },

  // --- Session Based Editor API ---

  // 1. Upload & Create Session
  uploadProjectSession: async (zipFile: File) => {
    try {
      const formData = new FormData();
      formData.append('project_zip', zipFile);

      const response = await fetch(`${API_BASE_URL}/ai-editor/upload/`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      return await response.json(); // { session_id, files }
    } catch (error) {
      console.error('Session upload error:', error);
      throw error;
    }
  },

  // 2. Chat / Update Session
  sendProjectPrompt: async (sessionId: string, prompt: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-editor/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, prompt })
      });

      if (!response.ok) throw new Error('Chat failed');
      return await response.json(); // { explanation, logs, files, updated_files }
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  },

  // 3. Download Session Link
  getSessionDownloadUrl: (sessionId: string) => {
    return `${API_BASE_URL}/ai-editor/download/${sessionId}/`;
  },

  // Novaworks General AI with Persistence
  getChatSessions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/store/chat-sessions/`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }
  },

  getChatHistory: async (sessionId: string) => {
    try {
      // We might need a specific endpoint for messages if the strict REST viewset doesn't return them in list
      // Assuming ChatSession Retrieve returns messages or we filter ChatMessages
      // For now, let's assume we fetch the session detail which includes messages
      const response = await fetch(`${API_BASE_URL}/store/chat-sessions/${sessionId}/`);
      if (!response.ok) throw new Error('Failed to fetch history');
      const data = await response.json();
      return data.messages || []; // We need to ensure serializer returns messages
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  createChatSession: async (title?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/store/chat-sessions/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "New Chat" })
      });
      if (!response.ok) throw new Error('Failed to create session');
      return await response.json();
    } catch (error) {
      console.error("Create session error", error);
      throw error;
    }
  },

  deleteChatSession: async (sessionId: string) => {
    await fetch(`${API_BASE_URL}/store/chat-sessions/${sessionId}/`, {
      method: 'DELETE'
    });
  },

  sendNovaworksChat: async (prompt: string, sessionId?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/store/novaworks-chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, session_id: sessionId })
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `AI Chat failed: ${response.statusText}`);
      }
      return await response.json(); // { response, session_id, title }
    } catch (error) {
      console.error('Novaworks AI error:', error);
      throw error;
    }
  }
};
