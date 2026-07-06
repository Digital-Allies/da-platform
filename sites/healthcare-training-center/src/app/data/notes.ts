export interface StudyNote {
  id: string;
  roomId: string;
  roomName: string;
  roomColor: string;
  courseTitle: string;
  moduleTitle: string;
  text: string;
  createdAt: number;
}

export const NOTES_KEY = "htc-notes-v1";
export const PROFILE_KEY = "htc-profile-v1";

export interface UserProfile {
  name: string;
  title: string;
  department: string;
  email: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: "Jane Doe",
  title: "Healthcare Learner",
  department: "General Medicine",
  email: "jane.doe@healthcarecenter.org",
};
