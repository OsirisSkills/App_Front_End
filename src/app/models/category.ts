import {FormControl, FormGroup, Validators} from "@angular/forms";


export class Category {
  id: number;
  version: string;
  name: string;
  description: string;

  constructor(id: number = 0, version: string = '', name: string = '', description: string = '') {
    this.id = id;
    this.version = version;
    this.name = name;
    this.description = description;
  }

  static isCategory(obj: any): obj is Category {
    return (
      Object.keys(obj).every(key => key in obj) &&
      typeof obj.id === 'number' &&
      typeof obj.name === 'string' &&
      typeof obj.version === 'string' &&
      typeof obj.description === 'string'
    );
  }

  static createCategoryForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      version: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
  }
}

export function createDefaultCategory(): Category {
  return {
    id: 0,
    name: '',
    version: '',
    description: ''
  };
}
