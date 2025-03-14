export interface EventType {
    eventTypeId: number;
    name: string;
}

export interface Event {
    eventId: number;
    description: string;
    eventType: EventType;
}

export interface Person {
    identificationType: string;
    personType: string;
    firstName: string;
    lastName: string;
    identification: string;
    email: string;
}

export interface Movility {
    id: number;
    orii: boolean;
    direction: string; 
    gender: string;
    cta: number;
    entryDate: string; 
    exitDate: string;
    originProgram: string;
    destinationProgram: string;
    city: string;
    country: string;
    teacher: string;
    faculty: string;
    funding: number;
    fundingSource: string;
    destination: string;
    origin: string;
    agreement: string | null;
    event: Event;
    person: Person;
}
