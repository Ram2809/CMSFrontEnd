import { Class } from "./class";
import { Teacher } from "./teacher";
import { Topic } from "./topic";

export class Discussion {
    public questionNo?: number;
    public question?: string;
    public answer?: string;
    public date?: Date;
    public topic?: Topic;
    public teacher?: Teacher;
    public classDetail?:Class;
}
