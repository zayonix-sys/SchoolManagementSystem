export interface SectionData {
  sectionId: number;
  sectionName: string;
  capacity: number; 
  classId?: number; 
  className?: string;
  createdAt?: Date; 
  createdBy?: number;
  updatedBy?: number;
  updatedAt?: Date; 
  isActive?: boolean;
}