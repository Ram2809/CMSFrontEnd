import { Class } from "./class";
import { Teacher } from "./teacher";
import { Topic } from "./topic";

export class TopicStatus {
    public id?: number;
    public beginDate?: Date;
    public status?: string;
    public completedDate?: Date;
    public remarks?: string;
    public topic?: Topic;
    public teacher?: Teacher;
    public classDetail?: Class;
}
