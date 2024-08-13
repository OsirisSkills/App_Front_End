
export class StatsAPI {
  memberStats: MemberStats;
  projectStats: ProjectStats;
  categoryStats: CategoryStats;
  projectFileStats: ProjectFileStats;

  constructor() {
    this.memberStats = new MemberStats();
    this.projectStats = new ProjectStats();
    this.categoryStats = new CategoryStats();
    this.projectFileStats = new ProjectFileStats();
  }
}

export class MemberStats {
  memberByAvailability: Record<string, number>;
  memberByLocation: Record<string, number>;
  memberByRole: Record<string, number>;
  memberCount: number;
  memberBySex: Record<string, number>;

  constructor() {
    this.memberByAvailability = {};
    this.memberByLocation = {};
    this.memberByRole = {};
    this.memberCount = 0;
    this.memberBySex = {};
  }
}

export class ProjectStats {
  membersByProject: Record<string, number>;
  statusCounts: Record<string, number>;
  averageProjectByMembersFiltered: number;
  averageProjectByMembers: number;
  countProject: number;
  categoryCounts: Record<string, number>;
  averageDuration: number;

  constructor() {
    this.membersByProject = {};
    this.statusCounts = {};
    this.averageProjectByMembersFiltered = 0;
    this.averageProjectByMembers = 0;
    this.countProject = 0;
    this.categoryCounts = {};
    this.averageDuration = 0;
  }
}

export class CategoryStats {
  categoryNames: Record<string, string>;
  categoryCount: number;

  constructor() {
    this.categoryNames = {};
    this.categoryCount = 0;
  }
}

export class ProjectFileStats {
  projectFileAverageSize: number;
  projectFileTotalSize: number;
  projectFileCount: number;
  projectFileSizeByProject: Record<string, number>;
  projectFileCountByProject: Record<string, number>;

  constructor() {
    this.projectFileAverageSize = 0;
    this.projectFileTotalSize = 0;
    this.projectFileCount = 0;
    this.projectFileSizeByProject = {};
    this.projectFileCountByProject = {};
  }
}
