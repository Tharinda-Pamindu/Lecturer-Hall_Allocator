import { type GenerateScheduleInput, type GenerateScheduleOutput } from '@/ai/flows/generate-schedule';

export type Faculty = GenerateScheduleInput['facultyPreferences'][0];
export type Hall = GenerateScheduleInput['hallAvailabilities'][0];
export type ScheduleEntry = GenerateScheduleOutput['schedule'][0];
export type Schedule = GenerateScheduleOutput;
