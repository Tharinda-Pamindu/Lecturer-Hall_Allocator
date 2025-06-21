'use server';

/**
 * @fileOverview Generates a schedule based on faculty preferences and hall availabilities.
 *
 * - generateSchedule - A function that generates a schedule.
 * - GenerateScheduleInput - The input type for the generateSchedule function.
 * - GenerateScheduleOutput - The return type for the generateSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FacultyPreferenceSchema = z.object({
  name: z.string().describe('Name of the faculty member'),
  department: z.string().describe('Department of the faculty member'),
  preferredHalls: z.array(z.string()).describe('List of preferred hall names'),
  preferredTimeSlots: z.array(z.string()).describe('List of preferred time slots'),
  maxClasses: z.number().describe('Maximum number of classes the faculty can teach'),
});

const HallAvailabilitySchema = z.object({
  name: z.string().describe('Name of the hall'),
  capacity: z.number().describe('Capacity of the hall'),
  availableTimes: z.array(z.string()).describe('List of available time slots'),
  equipment: z.array(z.string()).describe('List of available equipment'),
});

const GenerateScheduleInputSchema = z.object({
  facultyPreferences: z.array(FacultyPreferenceSchema).describe('List of faculty preferences'),
  hallAvailabilities: z.array(HallAvailabilitySchema).describe('List of hall availabilities'),
  constraints: z
    .string()
    .optional()
    .describe('Additional constraints for scheduling, such as maximum classes per faculty or preferred time slots for different types of classes.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;

const ScheduleEntrySchema = z.object({
  facultyName: z.string().describe('Name of the faculty member assigned to the class'),
  hallName: z.string().describe('Name of the hall where the class is assigned'),
  timeSlot: z.string().describe('Time slot for the class'),
  courseName: z.string().describe('Name of the course being taught'),
});

const GenerateScheduleOutputSchema = z.object({
  schedule: z.array(ScheduleEntrySchema).describe('Generated schedule'),
  summary: z.string().describe('A summary of the generated schedule and any conflicts or unassigned faculty.'),
});
export type GenerateScheduleOutput = z.infer<typeof GenerateScheduleOutputSchema>;

export async function generateSchedule(input: GenerateScheduleInput): Promise<GenerateScheduleOutput> {
  return generateScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSchedulePrompt',
  input: {schema: GenerateScheduleInputSchema},
  output: {schema: GenerateScheduleOutputSchema},
  prompt: `You are a world-class university schedule optimizer. Given faculty preferences and hall availabilities, generate an optimal schedule that satisfies as many preferences as possible while adhering to all constraints.

Faculty Preferences:
{{#each facultyPreferences}}
  - Name: {{this.name}}, Department: {{this.department}}, Preferred Halls: {{this.preferredHalls}}, Preferred Time Slots: {{this.preferredTimeSlots}}, Max Classes: {{this.maxClasses}}
{{/each}}

Hall Availabilities:
{{#each hallAvailabilities}}
  - Name: {{this.name}}, Capacity: {{this.capacity}}, Available Times: {{this.availableTimes}}, Equipment: {{this.equipment}}
{{/each}}

Constraints: {{{constraints}}}

Generate a schedule and provide a summary of the generated schedule, including any conflicts or unassigned faculty. Ensure no faculty member is assigned more classes than their specified maximum.

Output the schedule in JSON format. Ensure that every course offered by the university is assigned to a faculty member and a hall.
Consider the equipment needed for the course when allocating halls to courses. If there are multiple halls that could work, prefer faculty's preferred halls and preferred time slots.
`,
});

const generateScheduleFlow = ai.defineFlow(
  {
    name: 'generateScheduleFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
