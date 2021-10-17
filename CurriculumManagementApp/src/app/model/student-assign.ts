import { Class } from "./class";
import { Student } from "./student";

export class StudentAssign {
    public id?:number;
    public academicYear?:string;
    public studentAddedOn?:Date;
    public studentLeftOn?:Date;
    public student?:Student;
    public classDetail?:Class;
}
