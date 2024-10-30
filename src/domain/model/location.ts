export class LocationModel {
    id: number;
    name: string;
    level: string;
    area: number;
    parentId?: number;
    children?: LocationModel[];
}