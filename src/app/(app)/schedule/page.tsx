"use client";

import { useState } from "react";
import { Wand2, BrainCircuit, Loader2 } from "lucide-react";

import { useAppContext } from "@/context/app-context";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateSchedule } from "@/ai/flows/generate-schedule";
import { Badge } from "@/components/ui/badge";

export default function SchedulePage() {
  const { faculty, halls, schedule, setSchedule } = useAppContext();
  const [constraints, setConstraints] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSchedule = async () => {
    setIsLoading(true);
    try {
      const result = await generateSchedule({
        facultyPreferences: faculty,
        hallAvailabilities: halls,
        constraints: constraints,
      });
      setSchedule(result);
      toast({
        title: "Schedule Generated!",
        description: "The AI has successfully created a new schedule.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate schedule. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <PageHeader
          title="Schedule Dashboard"
          description="Visualize and manage the generated class schedule."
        />
        {schedule ? (
          <Card>
            <CardHeader>
              <CardTitle>Generated Schedule</CardTitle>
              <CardDescription>
                Review the AI-generated class schedule below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Hall</TableHead>
                    <TableHead>Time Slot</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.schedule.map((entry, index) => (
                    <TableRow key={index} className="has-[.bg-accent]:bg-accent/20">
                      <TableCell className="font-medium">{entry.courseName}</TableCell>
                      <TableCell>{entry.facultyName}</TableCell>
                      <TableCell>{entry.hallName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="whitespace-nowrap">{entry.timeSlot}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
                <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl mb-2">No Schedule Generated</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Click the &quot;Generate Schedule&quot; button to create a new timetable using the defined faculty and hall data.
            </CardDescription>
          </Card>
        )}
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              AI Schedule Generator
            </CardTitle>
            <CardDescription>
              Define constraints and let AI create an optimal schedule.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="constraints">Additional Constraints</Label>
                <Textarea
                  id="constraints"
                  placeholder="e.g., 'Physics classes should not be on Fridays', 'Dr. Smith prefers morning classes'."
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleGenerateSchedule}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {schedule ? "Regenerate Schedule" : "Generate Schedule"}
            </Button>
          </CardFooter>
        </Card>
        {schedule?.summary && (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Generation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{schedule.summary}</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
