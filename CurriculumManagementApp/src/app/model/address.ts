import { Teacher } from "./teacher";

export class Address {
    public id?: number;
    public addressLine?: string;
    public city?: string;
    public district?: string;
    public state?: string;
    public country?: string;
    public pinCode?: number;
    public teacher?: Teacher;
}
