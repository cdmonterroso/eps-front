export interface EstudianteAsignadoInterface {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    department: string;
    firstaccess: number;
    lastaccess: number;
    lastcourseaccess: number;
    profileimageurlsmall: string;
    profileimageurl: string;
    customfields: CustomField[];
    roles: UserRole[];
    enrolledcourses: EnrolledCourse[];
    estado: string;
  }
  
  export interface CustomField {
    type: string;
    value: string;
    name: string;
    shortname: string;
  }
  
  export interface UserRole {
    roleid: number;
    name: string;
    shortname: string;
    sortorder: number;
  }
  
  export interface EnrolledCourse {
    id: number;
    fullname: string;
    shortname: string;
  }
  
  