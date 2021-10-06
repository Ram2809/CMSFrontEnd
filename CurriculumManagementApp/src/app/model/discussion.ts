import { Class } from "./class";
import { Teacher } from "./teacher";
import { Unit } from "src/app/model/unit";


export class Discussion {
    public questionNo?: number;
    public question?: string;
    public answer?: string;
    public date?: Date;
    public unit?: Unit;
    public teacher?: Teacher;
    public classDetail?: Class;
}
