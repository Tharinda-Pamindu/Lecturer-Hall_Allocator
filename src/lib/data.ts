import { type Faculty, type Hall } from '@/lib/types';

export const initialFaculty: Faculty[] = [
  {
    name: 'Dr. Alan Turing',
    department: 'Computer Science',
    preferredHalls: ['Hall A', 'Hall B'],
    preferredTimeSlots: ['9:00 AM - 10:30 AM', '1:00 PM - 2:30 PM'],
    maxClasses: 2,
  },
  {
    name: 'Dr. Grace Hopper',
    department: 'Computer Science',
    preferredHalls: ['Hall C'],
    preferredTimeSlots: ['10:30 AM - 12:00 PM'],
    maxClasses: 1,
  },
  {
    name: 'Dr. Marie Curie',
    department: 'Physics',
    preferredHalls: ['Hall D', 'Hall E'],
    preferredTimeSlots: ['9:00 AM - 10:30 AM', '2:30 PM - 4:00 PM'],
    maxClasses: 2,
  },
];

export const initialHalls: Hall[] = [
  {
    name: 'Hall A',
    capacity: 100,
    availableTimes: ['9:00 AM - 10:30 AM', '10:30 AM - 12:00 PM', '1:00 PM - 2:30 PM', '2:30 PM - 4:00 PM'],
    equipment: ['Projector', 'Whiteboard'],
  },
  {
    name: 'Hall B',
    capacity: 50,
    availableTimes: ['9:00 AM - 10:30 AM', '1:00 PM - 2:30 PM'],
    equipment: ['Projector', 'Whiteboard', 'Computers'],
  },
  {
    name: 'Hall C',
    capacity: 120,
    availableTimes: ['10:30 AM - 12:00 PM', '2:30 PM - 4:00 PM'],
    equipment: ['Projector', 'Large Screen'],
  },
  {
    name: 'Hall D',
    capacity: 80,
    availableTimes: ['9:00 AM - 10:30 AM', '10:30 AM - 12:00 PM'],
    equipment: ['Projector', 'Physics Lab Equipment'],
  },
  {
    name: 'Hall E',
    capacity: 60,
    availableTimes: ['1:00 PM - 2:30 PM', '2:30 PM - 4:00 PM'],
    equipment: ['Whiteboard'],
  },
];
