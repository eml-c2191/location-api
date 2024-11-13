export class LocationModel {
    id: number;
    name: string;
    number: string;
    building: string;
    area: number;
    parentId?: number;
    children?: LocationModel[];
}