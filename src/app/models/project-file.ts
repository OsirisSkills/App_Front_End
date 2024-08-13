

export class ProjectFile {
  id: number;
  version: number;
  filename: string;
  extension: string;
  path: string;
  fileType: string;
  size: number;
  projectId: number[];

  constructor(id: number=0, version: number = -1, filename: string = '', extension: string = '', path: string = '', fileType: string = '', size: number = 0, projectId: number[] = []){
    this.id = id;
    this.version = version;
    this.filename = filename;
    this.extension = extension;
    this.path = path;
    this.fileType = fileType;
    this.size = size;
    this.projectId = projectId;
  }

  static isProjectFile(obj: any): obj is ProjectFile {
    return obj && obj.id && obj.version && obj.filename && obj.extension && obj.path && obj.fileType && obj.size && obj.projectId;
  }

  /***
   * Return the size of the file in the best unit that is human-readable
   * @param size
   * @return {string}
   */
  static autoSelectSizeUnit(size: number): string {

    let units = ['o', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];
    let unit_selector = Math.floor(Math.log(size) / Math.log(1024));
    let sizeSelector = size / Math.pow(1024, unit_selector)

    return sizeSelector.toFixed(2) + units[unit_selector];

  }

  static sizeInKo(size: number): number {
    return size / 1024;
  }

  static sizeInMo(size: number): number {
    return size / 1048576;
  }

  static sizeInGo(size: number): number {
    return size / 1073741824;
  }
}
