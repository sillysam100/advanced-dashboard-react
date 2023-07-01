export interface Register {
    _id: string;
    name: string;
    userId: string;
    controlType: 'read' | 'write';
}