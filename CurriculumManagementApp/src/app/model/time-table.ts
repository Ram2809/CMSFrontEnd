import { Class } from "./class";

export class TimeTable {
    public id?:number;
    public day?:string;
    public periods?:Map<number,string>;
    public classDetail?:Class;
}
