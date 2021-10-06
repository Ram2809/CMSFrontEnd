import { Class } from "./class";
import { Teacher } from "./teacher";
import { Unit } from "src/app/model/unit";

export class UnitStatus {
    public id?: number;
    public beginDate?: Date;
    public status?: string;
    public completedDate?: Date;
    public remarks?: string;
    public unit?: Unit;
    public teacher?: Teacher;
    public classDetail?: Class;
}
