import { Class } from "./class";
import { Subject } from "./subject";
import { TeacherAssign } from "./teacher-assign";

export class SubjectAssign {
    public id?: number;
    public classDetail?: Class;
    public subject?: Subject;
    public teacherAssign?: TeacherAssign;
}
