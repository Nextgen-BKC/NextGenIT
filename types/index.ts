export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    isEntrance?: boolean;
  }
  
  export interface Member {
    id: number;
    name: string;
    role: string;
    image: string;
    social?: {
      facebook?: string;
      linkedin?: string;
      github?: string;
    };
  }